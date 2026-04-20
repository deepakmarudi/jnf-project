<?php

namespace App\Services\Jnf;

use App\Models\Jnf;
use App\Enums\JnfStatus;
use App\Exceptions\Api\ApiException;
use Illuminate\Support\Facades\DB;

class JnfService
{
    public function createDraft(array $payload): array
    {
        $user = auth()->user();

        $coreFields = $payload;
        unset(
            $coreFields['contacts'], 
            $coreFields['eligibility'], 
            $coreFields['salary_details'], 
            $coreFields['selection_process'], 
            $coreFields['additional_details'],
            $coreFields['declaration'],
            $coreFields['required_skills']
        );

        // Remove these manually inserted properties if they exist
        unset($coreFields['salary_packages'], $coreFields['selection_rounds'], $coreFields['programme_rows'], $coreFields['discipline_rows']);

        $jnf = Jnf::create(array_merge($coreFields, [
            'status' => JnfStatus::Draft->value,
            'company_id' => $user->company_id,
            'created_by' => $user->id,
        ]));

        $jnf->auditLogs()->create([
            'actor_type' => 'recruiter',
            'actor_id' => $user->id,
            'action' => 'created',
            'remarks' => 'Initial draft created',
        ]);

        return $this->update($jnf->id, $payload);
    }

    public function list(array $filters = []): array
    {
        $query = Jnf::where('created_by', auth()->id());

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['recruitment_season'])) {
            $query->where('recruitment_season', $filters['recruitment_season']);
        }

        return [
            'filters' => $filters,
            'jnfs' => $query->orderByDesc('updated_at')->get()->map(function($jnf) {
                $arr = $jnf->toArray();
                $arr['admin_feedback'] = $jnf->review_notes;
                return $arr;
            })->toArray(),
        ];
    }

    public function show(int $jnfId): array
    {
        $jnf = Jnf::where('created_by', auth()->id())->findOrFail($jnfId);

        $jnf->load([
            'contacts', 
            'declaration', 
            'eligibilityRule', 
            'salaryPackages.components', 
            'selectionRounds',
            'eligibleProgrammes',
            'eligibleDisciplines'
        ]);

        // Transform for Frontend compatibility
        $record = $jnf->toArray();
        
        // 1. Eligibility Bridge
        $record['eligibility'] = $record['eligibility_rule'] ?? [];
        $record['eligibility']['eligible_batch'] = $record['eligible_batch'] ?? "";
        $record['eligibility']['eligible_programme'] = $record['eligibility_rule']['eligible_programme'] ?? 'both';
        $record['eligibility']['eligible_degree_ids'] = array_map(fn($p) => (string)$p['id'], $record['eligible_programmes']);
        $record['eligibility']['eligible_branch_ids'] = array_map(fn($d) => (string)$d['id'], $record['eligible_disciplines']);
        $record['eligibility']['active_backlog_allowed_bool'] = (bool)($record['eligibility']['backlogs_allowed'] ?? false);
        $record['eligibility']['minimum_class_12_percentage'] = $record['eligibility']['minimum_class_12_percentage'] ?? "";
        $record['eligibility']['slp_requirement'] = $record['eligibility']['slp_requirement'] ?? "";
        $record['eligibility']['phd_allowed'] = (bool)($record['eligibility']['phd_allowed'] ?? false);
        $record['eligibility']['phd_department_requirement'] = $record['eligibility']['phd_department_requirement'] ?? "";
        $record['eligibility']['ma_dhss_allowed'] = (bool)($record['eligibility']['ma_dhss_allowed'] ?? false);
        
        // 2. Salary Bridge
        $record['salary_details'] = [
            'currency' => $record['salary_packages'][0]['currency'] ?? 'INR',
            'salary_mode' => $record['salary_packages'][0]['salary_structure_mode'] ?? 'same_for_all',
            'same_for_all_courses' => true,
            'salary_rows' => array_map(function($p) {
                return [
                    'id' => (string)$p['id'],
                    'programme_id' => (string)$p['programme_id'],
                    'ctc' => $p['ctc'],
                    'gross_salary' => $p['gross_salary'],
                    'base_salary' => $p['base_salary'],
                    'variable_pay' => $p['variable_pay'],
                    'joining_bonus' => $p['joining_bonus'],
                    'retention_bonus' => $p['retention_bonus'],
                    'performance_bonus' => $p['performance_bonus'],
                    'esops' => $p['esops'],
                    'stipend' => $p['stipend'],
                    'bond_amount' => $p['bond_amount'],
                    'deductions_or_notes' => $p['deductions_text'] ?? '',
                ];
            }, $record['salary_packages']),
            'benefits_and_perks' => $record['benefits_and_perks'] ?? $record['additional_job_info'] ?? '',
        ];

        // 3. Selection Bridge
        $record['selection_process'] = [
            'selection_mode' => $record['selection_mode'] ?? 'online',
            'campus_visit_required' => $record['campus_visit_required'] ?? 'no',
            'pre_placement_talk_required' => $record['pre_placement_talk_required'] ?? 'no',
            'expected_hiring_timeline' => $record['expected_hiring_timeline'] ?? '',
            'preferred_ppt_date' => $record['preferred_ppt_date'] ?? '',
            'preferred_interview_date' => $record['preferred_interview_date'] ?? '',
            'rounds' => array_map(function($r) {
                // Parse other_screening_notes back into scheduled_at and instructions
                $notes = $r['other_screening_notes'] ?? '';
                $scheduledAt = '';
                if (preg_match('/Scheduled at: (.*)/', $notes, $matches)) {
                    $scheduledAt = $matches[1];
                    $notes = str_replace($matches[0], '', $notes);
                }
                
                return array_merge($r, [
                    'id' => (string)$r['id'],
                    'panel_count' => $r['team_members_required'] ?? '',
                    'infrastructure_required' => $r['rooms_required'] ?? '',
                    'scheduled_at' => trim($scheduledAt),
                    'instructions' => trim($notes),
                    'description' => $r['description'] ?? '',
                ]);
            }, $record['selection_rounds']),
        ];

        // 4. Additional Details Bridge
        $record['additional_details'] = [
            'application_deadline' => $record['application_deadline'] ?? '',
            'required_documents' => $record['required_documents'] ?? '',
            'dress_code_or_compliance_notes' => $record['dress_code_or_compliance_notes'] ?? '',
            'travel_or_accommodation_policy' => $record['travel_or_accommodation_policy'] ?? '',
            'offer_validity_notes' => $record['offer_validity_notes'] ?? '',
            'additional_instructions_for_cdc' => $record['additional_instructions_for_cdc'] ?? '',
            'recruiter_remarks' => $record['recruiter_remarks'] ?? '',
            'brochure_path' => $record['jd_pdf_path'] ?? '', // Approximation
            'compensation_attachment_path' => '',
            'extra_document_paths' => [],
        ];
        
        $record['required_skills'] = array_column($record['skills'] ?? [], 'name');
        $record['admin_feedback'] = $jnf->review_notes;

        return ['jnf' => $record];
    }

    public function update(int $jnfId, array $payload): array
    {
        $jnf = Jnf::where('created_by', auth()->id())->findOrFail($jnfId);

        if (!in_array($jnf->status, [JnfStatus::Draft, JnfStatus::ChangesRequested], true)) {
            throw new ApiException('INVALID_ACTION', 'Only draft or unlocked JNFs can be edited.', 403);
        }

        DB::transaction(function () use ($jnf, $payload) {
            // Mapping Frontend Payload to Database Structure
            $contacts = $payload['contacts'] ?? null;
            $eligibility = $payload['eligibility'] ?? null;
            $salaryDetails = $payload['salary_details'] ?? null;
            $selectionProcess = $payload['selection_process'] ?? null;
            $declaration = $payload['declaration'] ?? null;

            // 1. Update Core
            $coreFields = $payload;

            // Map nested Additional Details top-level fields
            if (isset($payload['additional_details']) && is_array($payload['additional_details'])) {
                foreach ($payload['additional_details'] as $key => $value) {
                    if (!is_array($value)) $coreFields[$key] = $value;
                }
            }
            
            // Map nested Selection Process top-level fields to Core Jnf
            if (is_array($selectionProcess)) {
                $coreFields['selection_mode'] = $selectionProcess['selection_mode'] ?? null;
                $coreFields['campus_visit_required'] = $selectionProcess['campus_visit_required'] ?? null;
                $coreFields['pre_placement_talk_required'] = $selectionProcess['pre_placement_talk_required'] ?? null;
                $coreFields['expected_hiring_timeline'] = $selectionProcess['expected_hiring_timeline'] ?? null;
                $coreFields['preferred_ppt_date'] = $selectionProcess['preferred_ppt_date'] ?? null;
                $coreFields['preferred_interview_date'] = $selectionProcess['preferred_interview_date'] ?? null;
            }

            // Map Eligibility metadata
            if (is_array($eligibility)) {
                $coreFields['eligible_batch'] = $eligibility['eligible_batch'] ?? null;
            }

            // Map Salary metadata
            if (is_array($salaryDetails)) {
                $coreFields['benefits_and_perks'] = $salaryDetails['benefits_and_perks'] ?? null;
            }

            unset(
                $coreFields['contacts'], 
                $coreFields['eligibility'], 
                $coreFields['salary_details'], 
                $coreFields['selection_process'], 
                $coreFields['additional_details'],
                $coreFields['declaration'],
                $coreFields['required_skills'],
                $coreFields['review_notes'],
                $coreFields['admin_feedback']
            );
            \Illuminate\Support\Facades\Log::info("Arrays in coreFields: ", array_keys(array_filter($coreFields, "is_array")));
            $jnf->update($coreFields);

            // 1.1 Sync Skills
            if (isset($payload['required_skills']) && is_array($payload['required_skills'])) {
                $skillIds = [];
                foreach ($payload['required_skills'] as $skillName) {
                    $skill = \App\Models\Skill::firstOrCreate(['name' => trim($skillName)]);
                    $skillIds[] = $skill->id;
                }
                $jnf->skills()->sync($skillIds);
            }

            // 2. Sync Contacts
            if (is_array($contacts)) {
                $jnf->contacts()->delete();
                $jnf->contacts()->createMany(array_map(function($c) {
                    unset($c['id'], $c['created_at'], $c['updated_at'], $c['jnf_id']);
                    return $c;
                }, $contacts));
            }

            // 3. Sync Declaration
            if (is_array($declaration)) {
                unset($declaration['id'], $declaration['jnf_id'], $declaration['created_at'], $declaration['updated_at']);
                $jnf->declaration()->updateOrCreate(['jnf_id' => $jnf->id], $declaration);
            }

            // 4. Sync Eligibility
            if (is_array($eligibility)) {
                $degreeIds = $eligibility['eligible_degree_ids'] ?? [];
                $branchIds = $eligibility['eligible_branch_ids'] ?? [];
                
                unset(
                    $eligibility['id'],
                    $eligibility['jnf_id'],
                    $eligibility['created_at'],
                    $eligibility['updated_at'],
                    $eligibility['eligible_batch'],
                    $eligibility['eligible_degree_ids'],
                    $eligibility['eligible_branch_ids'],
                    $eligibility['active_backlog_allowed_bool']
                );
                $jnf->eligibilityRule()->updateOrCreate(['jnf_id' => $jnf->id], $eligibility);

                // Pivot Sync
                $formattedDegrees = [];
                foreach($degreeIds as $id) {
                    if (is_numeric($id)) $formattedDegrees[$id] = ['is_eligible' => true];
                }
                $jnf->eligibleProgrammes()->sync($formattedDegrees);
                
                $formattedBranches = [];
                foreach($branchIds as $id) {
                    if (is_numeric($id)) $formattedBranches[$id] = ['is_eligible' => true, 'programme_id' => 1]; // Default pid mapping
                }
                $jnf->eligibleDisciplines()->sync($formattedBranches);
            }

            // 5. Sync Salary Details
            if (is_array($salaryDetails) && isset($salaryDetails['salary_rows'])) {
                $jnf->salaryPackages()->delete();
                foreach ($salaryDetails['salary_rows'] as $row) {
                    unset($row['id'], $row['created_at'], $row['updated_at'], $row['jnf_id']);
                    // Map FE 'deductions_or_notes' back to BE 'deductions_text'
                    $row['deductions_text'] = $row['deductions_or_notes'] ?? '';
                    unset($row['deductions_or_notes']);
                    
                    $row['currency'] = $salaryDetails['currency'] ?? 'INR';
                    $row['salary_structure_mode'] = $salaryDetails['salary_mode'] ?? 'same_for_all';
                    
                    if (isset($row['programme_id']) && (!is_numeric($row['programme_id']) || $row['programme_id'] === 'all_courses')) {
                        $row['programme_id'] = null;
                    }
                    
                    foreach (['ctc', 'gross_salary', 'base_salary', 'variable_pay', 'joining_bonus', 'retention_bonus', 'performance_bonus', 'esops', 'stipend', 'bond_amount'] as $field) {
                        if (isset($row[$field]) && $row[$field] === '') {
                            $row[$field] = null;
                        }
                    }
                    
                    $jnf->salaryPackages()->create($row);
                }
            }

            // 6. Sync Selection Rounds
            if (is_array($selectionProcess) && isset($selectionProcess['rounds'])) {
                $jnf->selectionRounds()->delete();
                $roundsData = array_map(function($r) {
                    $schedule = !empty($r['scheduled_at']) ? 'Scheduled at: ' . $r['scheduled_at'] : '';
                    $instructions = $r['instructions'] ?? '';
                    $notes = trim($schedule . "\n" . $instructions);
                    
                    return [
                        'round_order' => empty($r['round_order']) ? 1 : (int)$r['round_order'],
                        'round_name' => $r['round_name'] ?? 'Interview',
                        'round_category' => $r['round_category'] ?? 'other',
                        'selection_mode' => $r['selection_mode'] ?? 'online',
                        'duration_minutes' => empty($r['duration_minutes']) ? null : (int)$r['duration_minutes'],
                        'team_members_required' => empty($r['panel_count']) ? null : (int)$r['panel_count'],
                        'rooms_required' => empty($r['infrastructure_required']) ? null : (int)$r['infrastructure_required'],
                        'other_screening_notes' => $notes ?: null,
                        'is_enabled' => $r['is_enabled'] ?? true,
                        'is_pre_offer_mandatory' => $r['is_pre_offer_mandatory'] ?? false,
                    ];
                }, $selectionProcess['rounds']);
                $jnf->selectionRounds()->createMany($roundsData);
            }

            $jnf->auditLogs()->create([
                'actor_type' => 'recruiter',
                'actor_id' => auth()->id(),
                'action' => 'autosaved',
            ]);
        });

        return $this->show($jnf->id);
    }

    public function deleteDraft(int $jnfId): void
    {
        $jnf = Jnf::where('created_by', auth()->id())->findOrFail($jnfId);
        if ($jnf->status !== JnfStatus::Draft) {
            throw new ApiException('INVALID_ACTION', 'Only draft JNFs can be deleted.', 403);
        }
        $jnf->delete();
    }

    public function submit(int $jnfId): array
    {
        $jnf = Jnf::where('created_by', auth()->id())->findOrFail($jnfId);

        if (!in_array($jnf->status, [JnfStatus::Draft, JnfStatus::ChangesRequested], true)) {
            throw new ApiException('INVALID_ACTION', 'Only draft or unlocked JNFs can be submitted.', 403);
        }

        $jnf->update([
            'status' => JnfStatus::Submitted->value,
            'submitted_at' => now(),
        ]);

        $jnf->auditLogs()->create([
            'actor_type' => 'recruiter',
            'actor_id' => auth()->id(),
            'action' => 'submitted',
        ]);

        return $this->show($jnf->id);
    }
}
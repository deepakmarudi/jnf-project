<?php

namespace App\Services\Jnf;

use App\Models\Jnf;
use App\Enums\JnfStatus;
use App\Exceptions\Api\ApiException;

class JnfService
{
    public function createDraft(array $payload): array
    {
        $user = auth()->user();

        $jnf = Jnf::create(array_merge($payload, [
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

        return ['jnf' => $jnf->fresh()->toArray()];
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
            'jnfs' => $query->orderByDesc('updated_at')->get()->toArray(),
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

        return ['jnf' => $jnf->toArray()];
    }

    public function update(int $jnfId, array $payload): array
    {
        $jnf = Jnf::where('created_by', auth()->id())->findOrFail($jnfId);

        // 🚨 Prevent editing after submission
        if (!in_array($jnf->status, [JnfStatus::Draft, JnfStatus::ChangesRequested], true)) {
            throw new ApiException(
                'INVALID_ACTION',
                'Only draft or unlocked JNFs can be edited.',
                403
            );
        }

        \Illuminate\Support\Facades\DB::transaction(function () use ($jnf, $payload) {
            // Unpack relations
            $contacts = $payload['contacts'] ?? null;
            $eligibility = $payload['eligibility'] ?? null;
            $programmeRows = $payload['programme_rows'] ?? null;
            $disciplineRows = $payload['discipline_rows'] ?? null;
            $salaryPackages = $payload['salary_packages'] ?? null;
            $selectionRounds = $payload['selection_rounds'] ?? null;
            $declaration = $payload['declaration'] ?? null;

            // Remove relations from core payload to prevent mass-assignment crashes
            unset(
                $payload['contacts'], 
                $payload['eligibility'], 
                $payload['programme_rows'],
                $payload['discipline_rows'],
                $payload['salary_packages'], 
                $payload['selection_rounds'], 
                $payload['declaration']
            );
            
            // 1. Update Core
            $jnf->update($payload);

            // 2. Sync Contacts (wipes and recreates for pure form synchronization)
            if (is_array($contacts)) {
                $jnf->contacts()->delete();
                $jnf->contacts()->createMany($contacts);
            }

            // 3. Sync Declaration
            if (is_array($declaration)) {
                $jnf->declaration()->updateOrCreate(['jnf_id' => $jnf->id], $declaration);
            }

            // 4. Sync Eligibility
            if (is_array($eligibility)) {
                // Strip pivot relation placeholder arrays sent by frontend to prevent Mass Assignment crashes on Model
                unset($eligibility['programme_rows'], $eligibility['discipline_rows']);
                $jnf->eligibilityRule()->updateOrCreate(['jnf_id' => $jnf->id], $eligibility);
            }

            // 4a. Sync Eligible Programmes
            if (is_array($programmeRows)) {
                $formattedProgrammes = [];
                foreach ($programmeRows as $row) {
                    $pid = $row['programme_id'];
                    
                    // Industry-level resolution: if it's a string code, look it up
                    if (is_string($pid)) {
                        $pid = \App\Models\Programme::where('code', $pid)->orWhere('name', $pid)->value('id');
                    }
                    
                    if ($pid) {
                        $formattedProgrammes[$pid] = [
                            'is_eligible' => $row['is_eligible'] ?? true,
                            'min_cpi_for_programme' => $row['min_cpi'] ?? null,
                        ];
                    }
                }
                $jnf->eligibleProgrammes()->sync($formattedProgrammes);
            }

            // 4b. Sync Eligible Disciplines
            if (is_array($disciplineRows)) {
                $formattedDisciplines = [];
                foreach ($disciplineRows as $row) {
                    $did = $row['discipline_id'];
                    $pid = $row['programme_id'];

                    if (is_string($did)) {
                        $did = \App\Models\Discipline::where('short_name', $did)->orWhere('name', $did)->value('id');
                    }
                    if (is_string($pid)) {
                        $pid = \App\Models\Programme::where('code', $pid)->orWhere('name', $pid)->value('id');
                    }

                    if ($did && $pid) {
                        $formattedDisciplines[$did] = [
                            'programme_id' => $pid,
                            'is_eligible' => $row['is_eligible'] ?? true,
                            'min_cpi_for_discipline' => $row['min_cpi'] ?? null,
                        ];
                    }
                }
                $jnf->eligibleDisciplines()->sync($formattedDisciplines);
            }

            // 5. Sync Salary Packages
            if (is_array($salaryPackages)) {
                $jnf->salaryPackages()->delete();
                
                foreach ($salaryPackages as $packPayload) {
                    $components = $packPayload['components'] ?? [];
                    unset($packPayload['components']);
                    
                    $package = $jnf->salaryPackages()->create($packPayload);
                    
                    if (is_array($components) && count($components) > 0) {
                        $package->components()->createMany($components);
                    }
                }
            }

            // 6. Sync Selection Rounds
            if (is_array($selectionRounds)) {
                $jnf->selectionRounds()->delete();
                $jnf->selectionRounds()->createMany($selectionRounds);
            }

            $jnf->auditLogs()->create([
                'actor_type' => 'recruiter',
                'actor_id' => auth()->id(),
                'action' => 'autosaved',
            ]);
        });

        // Eager load all relations before returning the full transacted record back to the frontend
        $jnf->fresh()->load([
            'contacts', 
            'declaration', 
            'eligibilityRule', 
            'salaryPackages.components', 
            'selectionRounds',
            'eligibleProgrammes',
            'eligibleDisciplines'
        ]);

        return ['jnf' => $jnf->toArray()];
    }

    public function deleteDraft(int $jnfId): void
    {
        $jnf = Jnf::where('created_by', auth()->id())->findOrFail($jnfId);

        if ($jnf->status !== JnfStatus::Draft) {
            throw new ApiException(
                'INVALID_ACTION',
                'Only draft JNFs can be deleted.',
                403
            );
        }

        $jnf->delete();
    }

    public function submit(int $jnfId): array
    {
        $jnf = Jnf::where('created_by', auth()->id())->findOrFail($jnfId);

        if (!in_array($jnf->status, [JnfStatus::Draft, JnfStatus::ChangesRequested], true)) {
            throw new ApiException(
                'INVALID_ACTION',
                'Only draft or unlocked JNFs can be submitted.',
                403
            );
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

        return [
            'jnf' => $jnf->toArray(),
        ];
    }
}
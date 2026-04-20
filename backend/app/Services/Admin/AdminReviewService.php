<?php

namespace App\Services\Admin;

use App\Models\Jnf;
use App\Models\Recruiter;
use App\Models\Company;
use App\Enums\JnfStatus;
use App\Exceptions\Api\ApiException;
use Illuminate\Support\Facades\DB;

class AdminReviewService
{
    public function dashboard(): array
    {
        $counts = Jnf::select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status');

        return [
            'summary_cards' => [
                ['label' => 'Submitted JNFs', 'value' => $counts->get(JnfStatus::Submitted->value, 0)],
                ['label' => 'Under Review', 'value' => $counts->get(JnfStatus::UnderReview->value, 0)],
                ['label' => 'Approved JNFs', 'value' => $counts->get(JnfStatus::Approved->value, 0)],
                ['label' => 'Total Recruiters', 'value' => Recruiter::count()],
                ['label' => 'Total Companies', 'value' => Company::count()],
            ],
            'stats' => [
                'total_recruiters' => Recruiter::count(),
                'total_companies' => Company::count(),
                'total_jnfs' => Jnf::where('status', '!=', JnfStatus::Draft->value)->count(),
                'approved_jnfs' => $counts->get(JnfStatus::Approved->value, 0),
                'pending_jnfs' => $counts->get(JnfStatus::Submitted->value, 0) + $counts->get(JnfStatus::UnderReview->value, 0),
            ]
        ];
    }

    public function list(array $filters = []): array
    {
        $query = Jnf::with('company')
            ->where('status', '!=', JnfStatus::Draft->value);

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return [
            'filters' => $filters,
            'jnfs' => $query->orderByDesc('submitted_at')->get()->toArray(),
        ];
    }

    public function show(int $jnfId): array
    {
        $jnf = Jnf::with([
            'company', 
            'creator', 
            'documents', 
            'auditLogs', 
            'reviewer',
            'contacts', 
            'declaration', 
            'eligibilityRule', 
            'salaryPackages.components', 
            'selectionRounds',
            'eligibleProgrammes',
            'eligibleDisciplines'
        ])->findOrFail($jnfId);

        // Transform for Frontend compatibility precisely like JnfService
        $record = $jnf->toArray();
        
        // 1. Eligibility Bridge
        $record['eligibility'] = $record['eligibility_rule'] ?? [];
        $record['eligibility']['eligible_programme'] = $record['eligible_programmes'][0]['level'] ?? 'both';
        $record['eligibility']['eligible_degree_ids'] = array_map(fn($p) => (string)$p['id'], $record['eligible_programmes'] ?? []);
        $record['eligibility']['eligible_branch_ids'] = array_map(fn($d) => (string)$d['id'], $record['eligible_disciplines'] ?? []);
        
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
            }, $record['salary_packages'] ?? []),
            'benefits_and_perks' => $record['additional_job_info'] ?? '',
        ];

        // 3. Selection Bridge
        $record['selection_process'] = [
            'selection_mode' => $record['selection_rounds'][0]['selection_mode'] ?? 'online',
            'campus_visit_required' => 'no',
            'pre_placement_talk_required' => 'no',
            'rounds' => array_map(function($r) {
                return array_merge($r, ['id' => (string)$r['id']]);
            }, $record['selection_rounds'] ?? []),
        ];

        return ['jnf' => $record];
    }

    public function startReview(int $jnfId, array $payload): array
    {
        return $this->transition($jnfId, JnfStatus::UnderReview, $payload, 'reviewed');
    }

    public function requestChanges(int $jnfId, array $payload): array
    {
        return $this->transition($jnfId, JnfStatus::ChangesRequested, $payload, 'changes_requested');
    }

    public function approve(int $jnfId, array $payload): array
    {
        return $this->transition($jnfId, JnfStatus::Approved, $payload, 'approved');
    }

    public function close(int $jnfId, array $payload): array
    {
        return $this->transition($jnfId, JnfStatus::Closed, $payload, 'closed');
    }

    private function transition(
        int $jnfId,
        JnfStatus $newStatus,
        array $payload,
        string $auditAction
    ): array {
        $jnf = Jnf::findOrFail($jnfId);

        // 🚨 VALID TRANSITIONS
        $allowedTransitions = [
            JnfStatus::Submitted->value => [
                JnfStatus::UnderReview,
                JnfStatus::Approved,
                JnfStatus::ChangesRequested,
                JnfStatus::Closed,
            ],
            JnfStatus::UnderReview->value => [
                JnfStatus::Approved,
                JnfStatus::ChangesRequested,
                JnfStatus::Closed,
            ],
        ];

        $current = $jnf->status->value;

        if (! isset($allowedTransitions[$current]) ||
            ! in_array($newStatus, $allowedTransitions[$current])) {
            throw new ApiException(
                'INVALID_TRANSITION',
                "Cannot move from {$current} to {$newStatus->value}",
                403
            );
        }

        $jnf->update([
            'status' => $newStatus,
            'review_notes' => $payload['notes'] ?? null,
            'reviewed_by' => auth()->id(),
            'reviewed_at' => now(),
        ]);

        $jnf->auditLogs()->create([
            'actor_type' => 'admin',
            'actor_id' => auth()->id(),
            'action' => $auditAction,
            'remarks' => $payload['notes'] ?? null,
        ]);

        return [
            'jnf' => $jnf->fresh()->toArray(),
        ];
    }
}
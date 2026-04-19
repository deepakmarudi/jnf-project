<?php

namespace App\Services\Jnf;

use App\Models\Jnf;
use App\Models\JnfEligibilityRule;
use App\Exceptions\Api\ApiException;

class EligibilityService
{
    public function show(int $jnfId): array
    {
        $jnf = $this->getOwnedJnf($jnfId, [
            'eligibilityRule',
            'eligibleProgrammes',
            'eligibleDisciplines',
        ]);

        return [
            'jnf_id' => $jnfId,
            'eligibility_rule' => $jnf->eligibilityRule?->toArray(),
            'programme_rows' => $jnf->eligibleProgrammes->toArray(),
            'discipline_rows' => $jnf->eligibleDisciplines->toArray(),
        ];
    }

    public function upsert(int $jnfId, array $payload): array
    {
        $jnf = $this->getOwnedJnf($jnfId);

        // 🚨 Optional: restrict editing after submission
        if ($jnf->status !== 'draft') {
            throw new ApiException(
                'INVALID_ACTION',
                'Eligibility can only be modified for draft JNFs.',
                403
            );
        }

        // 1. Rule
        JnfEligibilityRule::updateOrCreate(
            ['jnf_id' => $jnfId],
            [
                'minimum_cgpa' => $payload['minimum_cgpa'] ?? null,
                'backlogs_allowed' => $payload['backlogs_allowed'] ?? false,
                'max_backlogs' => $payload['max_backlogs'] ?? null,
                'high_school_percentage_criterion' => $payload['high_school_percentage_criterion'] ?? null,
                'gender_filter' => $payload['gender_filter'] ?? 'all',
                'slp_requirement' => $payload['slp_requirement'] ?? null,
                'phd_allowed' => $payload['phd_allowed'] ?? false,
                'phd_department_requirement' => $payload['phd_department_requirement'] ?? null,
                'ma_dhss_allowed' => $payload['ma_dhss_allowed'] ?? false,
                'other_specific_requirements' => $payload['other_specific_requirements'] ?? null,
            ]
        );

        // 2. Programmes
        if (isset($payload['programme_rows'])) {
            $hasAll = collect($payload['programme_rows'])->contains('programme_id', 'all');
            
            if ($hasAll) {
                $allIds = \App\Models\Programme::where('is_active', true)->pluck('id');
                $formatted = $allIds->mapWithKeys(fn($id) => [$id => ['is_eligible' => true]])->toArray();
            } else {
                $formatted = [];
                foreach ($payload['programme_rows'] as $row) {
                    $formatted[$row['programme_id']] = [
                        'is_eligible' => $row['is_eligible'] ?? true,
                        'min_cpi_for_programme' => $row['min_cpi_for_programme'] ?? null,
                    ];
                }
            }
            $jnf->eligibleProgrammes()->sync($formatted);
        }

        // 3. Disciplines
        if (isset($payload['discipline_rows'])) {
            $hasAll = collect($payload['discipline_rows'])->contains('discipline_id', 'all');

            if ($hasAll) {
                $allIds = \App\Models\Discipline::where('is_active', true)->pluck('id');
                $formatted = $allIds->mapWithKeys(fn($id) => [
                    $id => [
                        'programme_id' => $payload['discipline_rows'][0]['programme_id'] ?? null, 
                        'is_eligible' => true
                    ]
                ])->toArray();
            } else {
                $formatted = [];
                foreach ($payload['discipline_rows'] as $row) {
                    $formatted[$row['discipline_id']] = [
                        'programme_id' => $row['programme_id'],
                        'is_eligible' => $row['is_eligible'] ?? true,
                        'min_cpi_for_discipline' => $row['min_cpi_for_discipline'] ?? null,
                    ];
                }
            }
            $jnf->eligibleDisciplines()->sync($formatted);
        }

        return $this->show($jnfId);
    }

    // 🔒 Ownership enforcement
    private function getOwnedJnf(int $jnfId, array $relations = []): Jnf
    {
        return Jnf::with($relations)
            ->where('id', $jnfId)
            ->where('created_by', auth()->id())
            ->firstOrFail();
    }
}
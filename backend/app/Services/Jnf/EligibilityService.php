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
        if (isset($payload['rule_fields'])) {
            JnfEligibilityRule::updateOrCreate(
                ['jnf_id' => $jnfId],
                $payload['rule_fields']
            );
        }

        // 2. Programmes
        if (isset($payload['programmes'])) {
            $formatted = [];

            foreach ($payload['programmes'] as $prog) {
                $formatted[$prog['id']] = [
                    'is_eligible' => $prog['is_eligible'] ?? true,
                    'min_cpi_for_programme' => $prog['min_cpi'] ?? null,
                ];
            }

            $jnf->eligibleProgrammes()->sync($formatted);
        }

        // 3. Disciplines
        if (isset($payload['disciplines'])) {
            $formatted = [];

            foreach ($payload['disciplines'] as $disc) {
                $formatted[$disc['id']] = [
                    'programme_id' => $disc['programme_id'],
                    'is_eligible' => $disc['is_eligible'] ?? true,
                    'min_cpi_for_discipline' => $disc['min_cpi'] ?? null,
                ];
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
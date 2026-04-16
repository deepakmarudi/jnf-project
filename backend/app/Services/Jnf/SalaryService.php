<?php

namespace App\Services\Jnf;

use App\Models\Jnf;
use App\Exceptions\Api\ApiException;

class SalaryService
{
    public function show(int $jnfId): array
    {
        $jnf = $this->getOwnedJnf($jnfId, [
            'salaryPackages.components',
        ]);

        return [
            'jnf_id' => $jnfId,
            'salary_packages' => $jnf->salaryPackages->toArray(),
        ];
    }

    public function upsert(int $jnfId, array $payload): array
    {
        $jnf = $this->getOwnedJnf($jnfId);

        // 🚨 Prevent modification after submission
        if ($jnf->status !== 'draft') {
            throw new ApiException(
                'INVALID_ACTION',
                'Salary can only be modified for draft JNFs.',
                403
            );
        }

        // Clear existing
        $jnf->salaryPackages()->delete();

        if (! empty($payload['salary_packages'])) {
            foreach ($payload['salary_packages'] as $packageData) {

                $components = $packageData['components'] ?? [];
                unset($packageData['components']);

                $package = $jnf->salaryPackages()->create($packageData);

                if (! empty($components)) {
                    $package->components()->createMany($components);
                }
            }
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
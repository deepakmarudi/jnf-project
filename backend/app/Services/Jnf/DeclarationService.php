<?php

namespace App\Services\Jnf;

use App\Models\Jnf;
use App\Models\JnfDeclaration;
use App\Exceptions\Api\ApiException;

class DeclarationService
{
    public function show(int $jnfId): array
    {
        $jnf = $this->getOwnedJnf($jnfId, ['declaration']);

        return [
            'jnf_id' => $jnfId,
            'declaration' => $jnf->declaration?->toArray(),
        ];
    }

    public function upsert(int $jnfId, array $payload): array
    {
        $jnf = $this->getOwnedJnf($jnfId);

        // 🚨 Prevent editing after submission
        if ($jnf->status !== 'draft') {
            throw new ApiException(
                'INVALID_ACTION',
                'Declaration can only be modified for draft JNFs.',
                403
            );
        }

        $declaration = JnfDeclaration::updateOrCreate(
            ['jnf_id' => $jnfId],
            $payload
        );

        return [
            'jnf_id' => $jnfId,
            'declaration' => $declaration->toArray(),
        ];
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
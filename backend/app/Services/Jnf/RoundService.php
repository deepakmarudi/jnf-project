<?php

namespace App\Services\Jnf;

use App\Models\Jnf;
use App\Models\JnfSelectionRound;
use App\Exceptions\Api\ApiException;

class RoundService
{
    public function store(int $jnfId, array $payload): array
    {
        $jnf = $this->getOwnedJnf($jnfId);

        // 🚨 Prevent modification after submission
        if ($jnf->status !== 'draft') {
            throw new ApiException(
                'INVALID_ACTION',
                'Rounds can only be modified for draft JNFs.',
                403
            );
        }

        $round = JnfSelectionRound::create(array_merge($payload, [
            'jnf_id' => $jnf->id,
        ]));

        return [
            'round' => $round->toArray(),
        ];
    }

    public function list(int $jnfId): array
    {
        $jnf = $this->getOwnedJnf($jnfId);

        return [
            'selection_rounds' => $jnf->selectionRounds()
                ->orderBy('round_order')
                ->get()
                ->toArray(),
        ];
    }

    public function update(int $roundId, array $payload): array
    {
        $round = JnfSelectionRound::with('jnf')->findOrFail($roundId);

        $this->assertOwnership($round->jnf);

        if ($round->jnf->status !== 'draft') {
            throw new ApiException(
                'INVALID_ACTION',
                'Rounds can only be modified for draft JNFs.',
                403
            );
        }

        $round->update($payload);

        return [
            'round' => $round->fresh()->toArray(),
        ];
    }

    public function delete(int $roundId): void
    {
        $round = JnfSelectionRound::with('jnf')->findOrFail($roundId);

        $this->assertOwnership($round->jnf);

        if ($round->jnf->status !== 'draft') {
            throw new ApiException(
                'INVALID_ACTION',
                'Rounds can only be deleted for draft JNFs.',
                403
            );
        }

        $round->delete();
    }

    // 🔒 Ownership check
    private function getOwnedJnf(int $jnfId): Jnf
    {
        return Jnf::where('id', $jnfId)
            ->where('created_by', auth()->id())
            ->firstOrFail();
    }

    private function assertOwnership(Jnf $jnf): void
    {
        if ($jnf->created_by !== auth()->id()) {
            throw new ApiException(
                'FORBIDDEN',
                'You do not have permission to access this resource.',
                403
            );
        }
    }
}
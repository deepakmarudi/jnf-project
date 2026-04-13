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

        return ['jnf' => $jnf->toArray()];
    }

    public function update(int $jnfId, array $payload): array
    {
        $jnf = Jnf::where('created_by', auth()->id())->findOrFail($jnfId);

        // 🚨 Prevent editing after submission
        if ($jnf->status !== JnfStatus::Draft->value) {
            throw new ApiException(
                'INVALID_ACTION',
                'Only draft JNFs can be edited.',
                403
            );
        }

        $jnf->update($payload);

        $jnf->auditLogs()->create([
            'actor_type' => 'recruiter',
            'actor_id' => auth()->id(),
            'action' => 'autosaved',
        ]);

        return ['jnf' => $jnf->fresh()->toArray()];
    }

    public function deleteDraft(int $jnfId): void
    {
        $jnf = Jnf::where('created_by', auth()->id())->findOrFail($jnfId);

        if ($jnf->status !== JnfStatus::Draft->value) {
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

        if ($jnf->status !== JnfStatus::Draft->value) {
            throw new ApiException(
                'INVALID_ACTION',
                'Only draft JNFs can be submitted.',
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
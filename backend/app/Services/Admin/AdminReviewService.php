<?php

namespace App\Services\Admin;

use App\Models\Jnf;
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
                ['label' => 'Submitted', 'value' => $counts->get(JnfStatus::Submitted->value, 0)],
                ['label' => 'Under Review', 'value' => $counts->get(JnfStatus::UnderReview->value, 0)],
                ['label' => 'Approved', 'value' => $counts->get(JnfStatus::Approved->value, 0)],
            ],
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
        $jnf = Jnf::with(['company', 'creator', 'documents', 'auditLogs', 'reviewer'])
            ->findOrFail($jnfId);

        return ['jnf' => $jnf->toArray()];
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
            JnfStatus::Submitted->value => [JnfStatus::UnderReview],
            JnfStatus::UnderReview->value => [
                JnfStatus::Approved,
                JnfStatus::ChangesRequested,
                JnfStatus::Closed,
            ],
        ];

        $current = $jnf->status;

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
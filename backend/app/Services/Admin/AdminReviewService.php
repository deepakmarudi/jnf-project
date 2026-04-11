<?php

namespace App\Services\Admin;

class AdminReviewService
{
    public function dashboard(): array
    {
        return [
            'summary_cards' => [
                [
                    'label' => 'Submitted',
                    'value' => 8,
                ],
                [
                    'label' => 'Under Review',
                    'value' => 3,
                ],
            ],
        ];
    }

    public function list(array $filters = []): array
    {
        return [
            'filters' => $filters,
            'jnfs' => [
                [
                    'id' => 1,
                    'job_title' => 'Software Engineer',
                    'status' => 'submitted',
                    'company_name' => 'Example Company',
                ],
            ],
        ];
    }

    public function show(int $jnf): array
    {
        return [
            'jnf' => [
                'id' => $jnf,
                'job_title' => 'Software Engineer',
                'status' => 'under_review',
            ],
            'company' => [
                'id' => 1,
                'name' => 'Example Company',
            ],
            'recruiter_summary' => [
                'id' => 1,
                'full_name' => 'Demo Recruiter',
            ],
            'documents' => [],
            'audit_logs' => [],
        ];
    }

    public function startReview(int $jnf, array $payload): array
    {
        return $this->transitionResponse($jnf, 'under_review', $payload);
    }

    public function requestChanges(int $jnf, array $payload): array
    {
        return $this->transitionResponse($jnf, 'changes_requested', $payload);
    }

    public function approve(int $jnf, array $payload): array
    {
        return $this->transitionResponse($jnf, 'approved', $payload);
    }

    public function close(int $jnf, array $payload): array
    {
        return $this->transitionResponse($jnf, 'closed', $payload);
    }

    private function transitionResponse(
        int $jnf,
        string $status,
        array $payload
    ): array {
        return [
            'jnf' => [
                'id' => $jnf,
                'status' => $status,
            ],
            'review' => $payload,
        ];
    }
}

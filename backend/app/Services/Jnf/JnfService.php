<?php

namespace App\Services\Jnf;

use App\Enums\JnfStatus;

class JnfService
{
    public function createDraft(array $payload): array
    {
        return [
            'jnf' => [
                'id' => 1,
                'status' => JnfStatus::Draft->value,
                ...$payload,
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
                    'status' => JnfStatus::Draft->value,
                    'recruitment_season' => '2026-27',
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
                'status' => JnfStatus::Draft->value,
            ],
        ];
    }

    public function update(int $jnf, array $payload): array
    {
        return [
            'jnf' => [
                'id' => $jnf,
                ...$payload,
            ],
        ];
    }

    public function deleteDraft(int $jnf): void
    {
    }

    public function preview(int $jnf): array
    {
        return [
            'jnf' => [
                'id' => $jnf,
                'status' => JnfStatus::Draft->value,
            ],
            'company' => [
                'id' => 1,
                'name' => 'Example Company',
            ],
            'recruiter_summary' => [
                'id' => 1,
                'full_name' => 'Demo Recruiter',
            ],
            'contacts' => [],
            'skills' => [],
            'eligibility' => [],
            'salary' => [],
            'selection_rounds' => [],
            'declaration' => [],
            'documents' => [],
            'audit_logs' => [],
        ];
    }

    public function submit(int $jnf): array
    {
        return [
            'jnf' => [
                'id' => $jnf,
                'status' => JnfStatus::Submitted->value,
            ],
        ];
    }
}

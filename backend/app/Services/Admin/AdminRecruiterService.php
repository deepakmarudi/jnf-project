<?php

namespace App\Services\Admin;

class AdminRecruiterService
{
    public function list(): array
    {
        return [
            'recruiters' => [
                [
                    'id' => 1,
                    'full_name' => 'Demo Recruiter',
                    'status' => 'active',
                    'company_name' => 'Example Company',
                ],
            ],
        ];
    }

    public function updateStatus(int $recruiter, array $payload): array
    {
        return [
            'recruiter' => [
                'id' => $recruiter,
                'status' => $payload['status'],
            ],
        ];
    }
}

<?php

namespace App\Services\Dashboard;

use Illuminate\Contracts\Auth\Authenticatable;

class DashboardService
{
    public function summary(?Authenticatable $user): array
    {
        return [
            'recruiter_summary' => [
                'id' => $user?->getAuthIdentifier(),
                'full_name' => 'Demo Recruiter',
                'status' => 'active',
            ],
            'company_summary' => [
                'id' => 1,
                'name' => 'Example Company',
            ],
            'jnf_counts' => [
                'draft' => 2,
                'submitted' => 1,
                'under_review' => 0,
                'changes_requested' => 0,
                'approved' => 0,
                'closed' => 0,
            ],
            'recent_jnfs' => [
                [
                    'id' => 1,
                    'job_title' => 'Software Engineer',
                    'status' => 'draft',
                ],
            ],
        ];
    }
}

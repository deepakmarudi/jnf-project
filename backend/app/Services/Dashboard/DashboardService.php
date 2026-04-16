<?php

namespace App\Services\Dashboard;

use App\Models\Jnf;
use Illuminate\Contracts\Auth\Authenticatable;

class DashboardService
{
    public function summary(?Authenticatable $user): array
    {
        if (!$user) {
            return [];
        }

        // Get the counts utilizing Eloquent scopes
        $jnfs = Jnf::where('created_by', $user->getAuthIdentifier())->get();

        $counts = [
            'draft' => $jnfs->where('status', 'draft')->count(),
            'submitted' => $jnfs->where('status', 'submitted')->count(),
            'under_review' => $jnfs->where('status', 'under_review')->count(),
            'changes_requested' => $jnfs->where('status', 'changes_requested')->count(),
            'approved' => $jnfs->where('status', 'approved')->count(),
            'closed' => $jnfs->where('status', 'closed')->count(),
        ];

        return [
            'recruiter_summary' => [
                'id' => $user->getAuthIdentifier(),
                'full_name' => $user->full_name,
                'status' => $user->status,
            ],
            'company_summary' => [
                'id' => $user->company_id,
                'name' => $user->company ? $user->company->name : null,
            ],
            'jnf_counts' => $counts,
            'recent_jnfs' => Jnf::where('created_by', $user->getAuthIdentifier())
                ->orderBy('updated_at', 'desc')
                ->take(5)
                ->get()
                ->map(fn($jnf) => [
                    'id' => $jnf->id,
                    'job_title' => $jnf->job_title,
                    'status' => $jnf->status,
                ])
                ->toArray(),
        ];
    }
}

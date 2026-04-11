<?php

namespace App\Services\Recruiter;

use Illuminate\Contracts\Auth\Authenticatable;

class RecruiterProfileService
{
    public function showCurrent(?Authenticatable $user): array
    {
        return [
            'recruiter' => [
                'id' => $user?->getAuthIdentifier(),
                'full_name' => 'Demo Recruiter',
                'designation' => 'Talent Acquisition Lead',
                'mobile_number' => '9999999999',
            ],
        ];
    }

    public function updateCurrent(array $validatedData): array
    {
        return [
            'recruiter' => $validatedData,
        ];
    }
}

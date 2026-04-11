<?php

namespace App\Services\Company;

use Illuminate\Contracts\Auth\Authenticatable;

class CompanyProfileService
{
    public function showCurrent(?Authenticatable $user): array
    {
        return [
            'company' => [
                'id' => 1,
                'name' => 'Example Company',
                'website' => 'https://example.com',
                'sector' => 'Technology',
                'recruiter_id' => $user?->getAuthIdentifier(),
            ],
        ];
    }

    public function updateCurrent(array $validatedData): array
    {
        return [
            'company' => $validatedData,
        ];
    }
}

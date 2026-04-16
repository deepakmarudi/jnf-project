<?php

namespace App\Services\Company;

use Illuminate\Contracts\Auth\Authenticatable;

class CompanyProfileService
{
    public function showCurrent(?Authenticatable $user): array
    {
        return [
            'company' => call_user_func(function() use ($user) {
                if ($user && method_exists($user, 'company')) {
                    return $user->company;
                }
                return null;
            }),
        ];
    }

    public function updateCurrent(array $validatedData, ?Authenticatable $user): array
    {
        if ($user && method_exists($user, 'company') && $user->company) {
            $user->company->update($validatedData);
            return [
                'company' => $user->company->fresh(),
            ];
        }

        return [
            'company' => null,
        ];
    }
}

<?php

namespace App\Services\Recruiter;

use Illuminate\Contracts\Auth\Authenticatable;

class RecruiterProfileService
{
    public function showCurrent(?Authenticatable $user): array
    {
        return [
            'recruiter' => $user,
        ];
    }

    public function updateCurrent(array $validatedData, ?Authenticatable $user): array
    {
        if ($user) {
            /** @var \Illuminate\Database\Eloquent\Model $user */
            $user->update($validatedData);
            return [
                'recruiter' => $user->fresh(),
            ];
        }

        return [
            'recruiter' => null,
        ];
    }
}

<?php

namespace App\Services\Auth;

use App\Exceptions\Api\ApiException;
use Illuminate\Contracts\Auth\Authenticatable;

class RecruiterSessionService
{
    public function me(?Authenticatable $user): array
    {
        if (! $user) {
            throw new ApiException(
                'UNAUTHENTICATED',
                'User is not authenticated.',
                401
            );
        }

        return [
            'recruiter' => $user->load('company'),
        ];
    }

    public function logout(?Authenticatable $user): array
    {
        if (! $user) {
            throw new ApiException(
                'UNAUTHENTICATED',
                'User is not authenticated.',
                401
            );
        }

        if ($user->currentAccessToken()) {
            $user->currentAccessToken()->delete();
        }

        return [
            'logged_out' => true,
        ];
    }
}
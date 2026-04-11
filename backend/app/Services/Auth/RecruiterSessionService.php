<?php

namespace App\Services\Auth;

use Illuminate\Contracts\Auth\Authenticatable;

class RecruiterSessionService
{
    public function me(?Authenticatable $user): array
    {
        return [
            'recruiter' => $user,
        ];
    }

    public function logout(?Authenticatable $user): array
    {
        return [
            'recruiter' => $user,
            'logged_out' => $user !== null,
        ];
    }
}

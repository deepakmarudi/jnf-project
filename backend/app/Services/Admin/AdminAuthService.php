<?php

namespace App\Services\Admin;

use Illuminate\Contracts\Auth\Authenticatable;

class AdminAuthService
{
    public function login(array $validatedData): array
    {
        return [
            'admin' => [
                'email' => $validatedData['email'],
            ],
            'token' => 'demo-admin-token',
            'token_type' => 'Bearer',
            'token_expires_in_minutes' => 60,
        ];
    }

    public function me(?Authenticatable $user): array
    {
        return [
            'admin' => $user,
        ];
    }

    public function logout(?Authenticatable $user): array
    {
        return [
            'admin' => $user,
            'logged_out' => $user !== null,
        ];
    }
}

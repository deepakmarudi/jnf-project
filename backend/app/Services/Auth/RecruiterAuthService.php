<?php

namespace App\Services\Auth;

class RecruiterAuthService
{
    public function register(array $validatedData): array
    {
        return [
            'recruiter' => [
                'email' => $validatedData['email'],
                'full_name' => $validatedData['full_name'],
                'designation' => $validatedData['designation'],
                'status' => 'pending',
            ],
            'company' => [
                'name' => $validatedData['company']['name'],
                'website' => $validatedData['company']['website'] ?? null,
                'sector' => $validatedData['company']['sector'] ?? null,
            ],
        ];
    }

    public function login(array $validatedData): array
    {
        return [
            'recruiter' => [
                'email' => $validatedData['email'],
            ],
            'token' => 'demo-recruiter-token',
            'token_type' => 'Bearer',
            'token_expires_in_minutes' => 60,
        ];
    }
}

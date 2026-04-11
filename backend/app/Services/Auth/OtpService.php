<?php

namespace App\Services\Auth;

class OtpService
{
    public function generate(string $email): array
    {
        return [
            'recruiter_email' => $email,
            'delivery_channel' => 'email',
            'expires_in_minutes' => 10,
        ];
    }

    public function verify(string $email, string $otpCode): bool
    {
        return $email !== '' && $otpCode !== '';
    }
}

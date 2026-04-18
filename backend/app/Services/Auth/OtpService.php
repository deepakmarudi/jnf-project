<?php

namespace App\Services\Auth;

use App\Models\RecruiterOtp;
use App\Exceptions\Api\ApiException;

class OtpService
{
    public function generate(string $email): array
    {
        // 1. Prevent spamming (simple rate limit: 1 OTP per minute)
        $recentOtp = RecruiterOtp::where('recruiter_email', $email)
            ->where('created_at', '>', now()->subMinute())
            ->exists();

        if ($recentOtp) {
            throw new ApiException(
                'OTP_RATE_LIMITED',
                'Please wait before requesting another OTP.',
                429
            );
        }

        // 2. Delete old OTPs
        RecruiterOtp::where('recruiter_email', $email)->delete();

        // 3. Generate OTP
        $otpCode = (string) random_int(100000, 999999);

        // 4. Store OTP
        RecruiterOtp::create([
            'recruiter_email' => $email,
            'otp_code' => $otpCode,
            'expires_at' => now()->addMinutes(10),
        ]);

        // 5. In production → send email here
        \Illuminate\Support\Facades\Log::info("DEVELOPMENT OTP for {$email} is: {$otpCode}");

        return [
            'recruiter_email' => $email,
            'delivery_channel' => 'email',
            'expires_in_minutes' => 10,
        ];
    }

    public function verify(string $email, string $otpCode): array
    {
        $otpRecord = RecruiterOtp::where('recruiter_email', $email)
            ->where('otp_code', $otpCode)
            ->whereNull('verified_at')
            ->where('expires_at', '>', now())
            ->first();

        if (! $otpRecord) {
            throw new ApiException(
                'INVALID_OTP',
                'Invalid or expired OTP.',
                422
            );
        }

        $otpRecord->update([
            'verified_at' => now(),
        ]);

        return [
            'recruiter_email' => $email,
            'verified' => true,
        ];
    }
}
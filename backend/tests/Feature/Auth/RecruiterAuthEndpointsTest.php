<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;

class RecruiterAuthEndpointsTest extends TestCase
{
    public function test_send_otp_endpoint_returns_success_shape(): void
    {
        $response = $this->postJson('/api/auth/send-otp', [
            'recruiter_email' => 'recruiter@example.com',
            'recaptcha_token' => 'demo-recaptcha-token',
        ]);

        $response
            ->assertOk()
            ->assertJsonStructure([
                'message',
                'data' => [
                    'recruiter_email',
                    'delivery_channel',
                    'expires_in_minutes',
                ],
            ]);
    }
}

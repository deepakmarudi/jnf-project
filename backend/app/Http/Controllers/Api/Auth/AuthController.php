<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SendOtpRequest;
use App\Http\Requests\Auth\VerifyOtpRequest;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function sendOtp(SendOtpRequest $request): JsonResponse
    {
        return response()->json([
            'message' => 'OTP request accepted.',
            'data' => [
                'recruiter_email' => $request->string('recruiter_email')->toString(),
            ],
        ]);
    }

    public function verifyOtp(VerifyOtpRequest $request): JsonResponse
    {
        return response()->json([
            'message' => 'OTP verification request accepted.',
            'data' => [
                'recruiter_email' => $request->string('recruiter_email')->toString(),
            ],
        ]);
    }
}

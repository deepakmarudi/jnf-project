<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\SendOtpRequest;
use App\Http\Requests\Auth\VerifyOtpRequest;
use App\Services\ApiResponseService;
use App\Services\Auth\OtpService;
use App\Services\Auth\RecruiterAuthService;
use App\Services\Auth\RecruiterSessionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        private readonly OtpService $otpService,
        private readonly RecruiterAuthService $recruiterAuthService,
        private readonly RecruiterSessionService $recruiterSessionService,
        private readonly ApiResponseService $apiResponseService
    ) {
    }

    public function sendOtp(SendOtpRequest $request): JsonResponse
    {
        $otpData = $this->otpService->generate(
            $request->string('recruiter_email')->toString()
        );

        return $this->apiResponseService->success(
            $otpData,
            'OTP request accepted.'
        );
    }

    public function verifyOtp(VerifyOtpRequest $request): JsonResponse
    {
        $isValid = $this->otpService->verify(
            $request->string('recruiter_email')->toString(),
            $request->string('otp_code')->toString()
        );

        return $this->apiResponseService->success(
            [
                'recruiter_email' => $request->string('recruiter_email')->toString(),
                'verified' => $isValid,
            ],
            'OTP verification request accepted.'
        );
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $registrationData = $this->recruiterAuthService->register(
            $request->validated()
        );

        return $this->apiResponseService->created(
            $registrationData,
            'Registration request accepted.'
        );
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $loginData = $this->recruiterAuthService->login(
            $request->validated()
        );

        return $this->apiResponseService->success(
            $loginData,
            'Login request accepted.'
        );
    }

    public function me(Request $request): JsonResponse
    {
        $sessionData = $this->recruiterSessionService->me($request->user());

        return $this->apiResponseService->success(
            $sessionData,
            'Authenticated recruiter fetched successfully.'
        );
    }

    public function logout(Request $request): JsonResponse
    {
        $logoutData = $this->recruiterSessionService->logout($request->user());

        return $this->apiResponseService->success(
            $logoutData,
            'Logout request accepted.'
        );
    }
}

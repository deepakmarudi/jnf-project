<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LoginRequest;
use App\Services\Admin\AdminAuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminAuthController extends Controller
{
    public function __construct(
        private readonly AdminAuthService $adminAuthService
    ) {
    }

    public function login(LoginRequest $request): JsonResponse
    {
        return $this->api()->success(
            $this->adminAuthService->login($request->validated())
        );
    }

    public function me(Request $request): JsonResponse
    {
        return $this->api()->success(
            $this->adminAuthService->me($request->user())
        );
    }

    public function logout(Request $request): JsonResponse
    {
        return $this->api()->success(
            $this->adminAuthService->logout($request->user())
        );
    }
}
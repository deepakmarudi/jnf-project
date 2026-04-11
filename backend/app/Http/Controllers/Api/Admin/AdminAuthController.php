<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LoginRequest;
use App\Services\Admin\AdminAuthService;
use App\Services\ApiResponseService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminAuthController extends Controller
{
    public function __construct(
        private readonly AdminAuthService $adminAuthService,
        private readonly ApiResponseService $apiResponseService
    ) {
    }

    public function login(LoginRequest $request): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->adminAuthService->login($request->validated()),
            'Admin login request accepted.'
        );
    }

    public function me(Request $request): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->adminAuthService->me($request->user()),
            'Authenticated admin fetched successfully.'
        );
    }

    public function logout(Request $request): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->adminAuthService->logout($request->user()),
            'Admin logout request accepted.'
        );
    }
}

<?php

namespace App\Http\Controllers\Api\Portal;

use App\Http\Controllers\Controller;
use App\Services\ApiResponseService;
use Illuminate\Http\JsonResponse;

class HealthController extends Controller
{
    public function __construct(
        private readonly ApiResponseService $apiResponseService
    ) {
    }

    public function __invoke(): JsonResponse
    {
        return $this->apiResponseService->success(
            [
                'healthy' => true,
                'service' => 'jnf-portal-backend',
            ],
            'Backend API is healthy.'
        );
    }
}

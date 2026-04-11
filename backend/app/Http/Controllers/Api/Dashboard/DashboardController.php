<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\ApiResponseService;
use App\Services\Dashboard\DashboardService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct(
        private readonly DashboardService $dashboardService,
        private readonly ApiResponseService $apiResponseService
    ) {
    }

    public function __invoke(Request $request): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->dashboardService->summary($request->user()),
            'Dashboard summary fetched successfully.'
        );
    }
}

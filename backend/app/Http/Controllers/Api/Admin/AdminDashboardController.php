<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AdminReviewService;
use App\Services\ApiResponseService;
use Illuminate\Http\JsonResponse;

class AdminDashboardController extends Controller
{
    public function __construct(
        private readonly AdminReviewService $adminReviewService,
        private readonly ApiResponseService $apiResponseService
    ) {
    }

    public function __invoke(): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->adminReviewService->dashboard(),
            'Admin dashboard fetched successfully.'
        );
    }
}

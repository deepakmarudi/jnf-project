<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AdminReviewService;
use Illuminate\Http\JsonResponse;

class AdminDashboardController extends Controller
{
    public function __construct(
        private readonly AdminReviewService $adminReviewService
    ) {
    }

    public function __invoke(): JsonResponse
    {
        return $this->api()->success(
            $this->adminReviewService->dashboard()
        );
    }
}
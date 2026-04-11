<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateRecruiterStatusRequest;
use App\Services\Admin\AdminRecruiterService;
use App\Services\ApiResponseService;
use Illuminate\Http\JsonResponse;

class AdminRecruiterController extends Controller
{
    public function __construct(
        private readonly AdminRecruiterService $adminRecruiterService,
        private readonly ApiResponseService $apiResponseService
    ) {
    }

    public function index(): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->adminRecruiterService->list(),
            'Recruiter accounts fetched successfully.'
        );
    }

    public function updateStatus(
        UpdateRecruiterStatusRequest $request,
        int $recruiter
    ): JsonResponse {
        return $this->apiResponseService->success(
            $this->adminRecruiterService->updateStatus(
                $recruiter,
                $request->validated()
            ),
            'Recruiter status updated successfully.'
        );
    }
}

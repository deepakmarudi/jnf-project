<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ListAdminJnfsRequest;
use App\Http\Requests\Admin\ReviewActionRequest;
use App\Services\Admin\AdminReviewService;
use App\Services\ApiResponseService;
use Illuminate\Http\JsonResponse;

class AdminReviewController extends Controller
{
    public function __construct(
        private readonly AdminReviewService $adminReviewService,
        private readonly ApiResponseService $apiResponseService
    ) {
    }

    public function index(ListAdminJnfsRequest $request): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->adminReviewService->list($request->validated()),
            'Admin review queue fetched successfully.'
        );
    }

    public function show(int $jnf): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->adminReviewService->show($jnf),
            'Admin JNF detail fetched successfully.'
        );
    }

    public function startReview(
        ReviewActionRequest $request,
        int $jnf
    ): JsonResponse {
        return $this->apiResponseService->success(
            $this->adminReviewService->startReview($jnf, $request->validated()),
            'JNF moved to under review successfully.'
        );
    }

    public function requestChanges(
        ReviewActionRequest $request,
        int $jnf
    ): JsonResponse {
        return $this->apiResponseService->success(
            $this->adminReviewService->requestChanges(
                $jnf,
                $request->validated()
            ),
            'JNF moved to changes requested successfully.'
        );
    }

    public function approve(
        ReviewActionRequest $request,
        int $jnf
    ): JsonResponse {
        return $this->apiResponseService->success(
            $this->adminReviewService->approve($jnf, $request->validated()),
            'JNF approved successfully.'
        );
    }

    public function close(
        ReviewActionRequest $request,
        int $jnf
    ): JsonResponse {
        return $this->apiResponseService->success(
            $this->adminReviewService->close($jnf, $request->validated()),
            'JNF closed successfully.'
        );
    }
}

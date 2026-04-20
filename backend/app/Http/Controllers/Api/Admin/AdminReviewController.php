<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ListAdminJnfsRequest;
use App\Http\Requests\Admin\ReviewActionRequest;
use App\Services\Admin\AdminReviewService;
use Illuminate\Http\JsonResponse;

class AdminReviewController extends Controller
{
    public function __construct(
        private readonly AdminReviewService $adminReviewService
    ) {
    }

    public function index(ListAdminJnfsRequest $request): JsonResponse
    {
        return $this->api()->success(
            $this->adminReviewService->list($request->validated())
        );
    }

    public function show(int $jnf): JsonResponse
    {
        return $this->api()->success(
            $this->adminReviewService->show($jnf)
        );
    }

    public function startReview(
        ReviewActionRequest $request,
        int $jnf
    ): JsonResponse {
        return $this->api()->success(
            $this->adminReviewService->startReview($jnf, $request->validated())
        );
    }

    public function requestChanges(
        ReviewActionRequest $request,
        int $jnf
    ): JsonResponse {
        return $this->api()->success(
            $this->adminReviewService->requestChanges(
                $jnf,
                $request->validated()
            )
        );
    }

    public function approve(
        ReviewActionRequest $request,
        int $jnf
    ): JsonResponse {
        return $this->api()->success(
            $this->adminReviewService->approve($jnf, $request->validated())
        );
    }

    public function close(
        ReviewActionRequest $request,
        int $jnf
    ): JsonResponse {
        return $this->api()->success(
            $this->adminReviewService->close($jnf, $request->validated())
        );
    }
}
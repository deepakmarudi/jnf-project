<?php

namespace App\Http\Controllers\Api\Jnf;

use App\Http\Controllers\Controller;
use App\Http\Requests\Jnf\Eligibility\UpsertEligibilityRequest;
use App\Services\ApiResponseService;
use App\Services\Jnf\EligibilityService;
use Illuminate\Http\JsonResponse;

class EligibilityController extends Controller
{
    public function __construct(
        private readonly EligibilityService $eligibilityService,
        private readonly ApiResponseService $apiResponseService
    ) {
    }

    public function show(int $jnf): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->eligibilityService->show($jnf),
            'JNF eligibility fetched successfully.'
        );
    }

    public function upsert(
        UpsertEligibilityRequest $request,
        int $jnf
    ): JsonResponse {
        return $this->apiResponseService->success(
            $this->eligibilityService->upsert($jnf, $request->validated()),
            'JNF eligibility updated successfully.'
        );
    }
}

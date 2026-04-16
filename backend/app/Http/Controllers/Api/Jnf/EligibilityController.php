<?php

namespace App\Http\Controllers\Api\Jnf;

use App\Http\Controllers\Controller;
use App\Http\Requests\Jnf\Eligibility\UpsertEligibilityRequest;
use App\Services\Jnf\EligibilityService;
use Illuminate\Http\JsonResponse;

class EligibilityController extends Controller
{
    public function __construct(
        private readonly EligibilityService $eligibilityService
    ) {
    }

    public function show(int $jnf): JsonResponse
    {
        return $this->api()->success(
            $this->eligibilityService->show($jnf)
        );
    }

    public function upsert(
        UpsertEligibilityRequest $request,
        int $jnf
    ): JsonResponse {
        return $this->api()->success(
            $this->eligibilityService->upsert($jnf, $request->validated())
        );
    }
}
<?php

namespace App\Http\Controllers\Api\Recruiter;

use App\Http\Controllers\Controller;
use App\Http\Requests\Recruiter\UpdateRecruiterProfileRequest;
use App\Services\ApiResponseService;
use App\Services\Recruiter\RecruiterProfileService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RecruiterController extends Controller
{
    public function __construct(
        private readonly RecruiterProfileService $recruiterProfileService,
        private readonly ApiResponseService $apiResponseService
    ) {
    }

    public function me(Request $request): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->recruiterProfileService->showCurrent($request->user()),
            'Recruiter profile fetched successfully.'
        );
    }

    public function updateMe(
        UpdateRecruiterProfileRequest $request
    ): JsonResponse {
        return $this->apiResponseService->success(
            $this->recruiterProfileService->updateCurrent($request->validated()),
            'Recruiter profile updated successfully.'
        );
    }
}

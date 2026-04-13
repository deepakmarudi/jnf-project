<?php

namespace App\Http\Controllers\Api\Recruiter;

use App\Http\Controllers\Controller;
use App\Http\Requests\Recruiter\UpdateRecruiterProfileRequest;
use App\Services\Recruiter\RecruiterProfileService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RecruiterController extends Controller
{
    public function __construct(
        private readonly RecruiterProfileService $recruiterProfileService
    ) {
    }

    public function me(Request $request): JsonResponse
    {
        return $this->api()->success(
            $this->recruiterProfileService->showCurrent($request->user())
        );
    }

    public function updateMe(
        UpdateRecruiterProfileRequest $request
    ): JsonResponse {
        return $this->api()->success(
            $this->recruiterProfileService->updateCurrent($request->validated())
        );
    }
}
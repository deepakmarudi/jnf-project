<?php

namespace App\Http\Controllers\Api\Company;

use App\Http\Controllers\Controller;
use App\Http\Requests\Company\UpdateCompanyProfileRequest;
use App\Services\ApiResponseService;
use App\Services\Company\CompanyProfileService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function __construct(
        private readonly CompanyProfileService $companyProfileService,
        private readonly ApiResponseService $apiResponseService
    ) {
    }

    public function me(Request $request): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->companyProfileService->showCurrent($request->user()),
            'Company profile fetched successfully.'
        );
    }

    public function updateMe(
        UpdateCompanyProfileRequest $request
    ): JsonResponse {
        return $this->apiResponseService->success(
            $this->companyProfileService->updateCurrent($request->validated()),
            'Company profile updated successfully.'
        );
    }
}

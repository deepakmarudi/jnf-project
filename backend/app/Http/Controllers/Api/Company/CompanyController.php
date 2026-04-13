<?php

namespace App\Http\Controllers\Api\Company;

use App\Http\Controllers\Controller;
use App\Http\Requests\Company\UpdateCompanyProfileRequest;
use App\Services\Company\CompanyProfileService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function __construct(
        private readonly CompanyProfileService $companyProfileService
    ) {
    }

    public function me(Request $request): JsonResponse
    {
        return $this->api()->success(
            $this->companyProfileService->showCurrent($request->user())
        );
    }

    public function updateMe(
        UpdateCompanyProfileRequest $request
    ): JsonResponse {
        return $this->api()->success(
            $this->companyProfileService->updateCurrent($request->validated())
        );
    }
}
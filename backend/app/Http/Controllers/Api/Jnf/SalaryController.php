<?php

namespace App\Http\Controllers\Api\Jnf;

use App\Http\Controllers\Controller;
use App\Http\Requests\Jnf\Salary\UpsertSalaryRequest;
use App\Services\ApiResponseService;
use App\Services\Jnf\SalaryService;
use Illuminate\Http\JsonResponse;

class SalaryController extends Controller
{
    public function __construct(
        private readonly SalaryService $salaryService,
        private readonly ApiResponseService $apiResponseService
    ) {
    }

    public function show(int $jnf): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->salaryService->show($jnf),
            'JNF salary fetched successfully.'
        );
    }

    public function upsert(
        UpsertSalaryRequest $request,
        int $jnf
    ): JsonResponse {
        return $this->apiResponseService->success(
            $this->salaryService->upsert($jnf, $request->validated()),
            'JNF salary updated successfully.'
        );
    }
}

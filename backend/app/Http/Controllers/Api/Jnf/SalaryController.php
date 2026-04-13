<?php

namespace App\Http\Controllers\Api\Jnf;

use App\Http\Controllers\Controller;
use App\Http\Requests\Jnf\Salary\UpsertSalaryRequest;
use App\Services\Jnf\SalaryService;
use Illuminate\Http\JsonResponse;

class SalaryController extends Controller
{
    public function __construct(
        private readonly SalaryService $salaryService
    ) {
    }

    public function show(int $jnf): JsonResponse
    {
        return $this->api()->success(
            $this->salaryService->show($jnf)
        );
    }

    public function upsert(
        UpsertSalaryRequest $request,
        int $jnf
    ): JsonResponse {
        return $this->api()->success(
            $this->salaryService->upsert($jnf, $request->validated())
        );
    }
}
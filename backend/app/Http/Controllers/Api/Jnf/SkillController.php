<?php

namespace App\Http\Controllers\Api\Jnf;

use App\Http\Controllers\Controller;
use App\Http\Requests\Jnf\Skills\ReplaceSkillsRequest;
use App\Services\ApiResponseService;
use App\Services\Jnf\SkillService;
use Illuminate\Http\JsonResponse;

class SkillController extends Controller
{
    public function __construct(
        private readonly SkillService $skillService,
        private readonly ApiResponseService $apiResponseService
    ) {
    }

    public function catalog(): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->skillService->catalog(),
            'Skill catalog fetched successfully.'
        );
    }

    public function show(int $jnf): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->skillService->show($jnf),
            'JNF skills fetched successfully.'
        );
    }

    public function replace(
        ReplaceSkillsRequest $request,
        int $jnf
    ): JsonResponse {
        return $this->apiResponseService->success(
            $this->skillService->replace($jnf, $request->validated()),
            'JNF skills updated successfully.'
        );
    }
}

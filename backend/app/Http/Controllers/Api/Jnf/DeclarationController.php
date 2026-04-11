<?php

namespace App\Http\Controllers\Api\Jnf;

use App\Http\Controllers\Controller;
use App\Http\Requests\Jnf\Declaration\UpsertDeclarationRequest;
use App\Services\ApiResponseService;
use App\Services\Jnf\DeclarationService;
use Illuminate\Http\JsonResponse;

class DeclarationController extends Controller
{
    public function __construct(
        private readonly DeclarationService $declarationService,
        private readonly ApiResponseService $apiResponseService
    ) {
    }

    public function show(int $jnf): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->declarationService->show($jnf),
            'JNF declaration fetched successfully.'
        );
    }

    public function upsert(
        UpsertDeclarationRequest $request,
        int $jnf
    ): JsonResponse {
        return $this->apiResponseService->success(
            $this->declarationService->upsert($jnf, $request->validated()),
            'JNF declaration updated successfully.'
        );
    }
}

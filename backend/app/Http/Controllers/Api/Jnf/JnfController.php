<?php

namespace App\Http\Controllers\Api\Jnf;

use App\Http\Controllers\Controller;
use App\Http\Requests\Jnf\ListJnfsRequest;
use App\Http\Requests\Jnf\StoreJnfRequest;
use App\Http\Requests\Jnf\UpdateJnfRequest;
use App\Services\ApiResponseService;
use App\Services\Jnf\JnfService;
use Illuminate\Http\JsonResponse;

class JnfController extends Controller
{
    public function __construct(
        private readonly JnfService $jnfService,
        private readonly ApiResponseService $apiResponseService
    ) {
    }

    public function index(ListJnfsRequest $request): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->jnfService->list($request->validated()),
            'JNF list fetched successfully.'
        );
    }

    public function store(StoreJnfRequest $request): JsonResponse
    {
        return $this->apiResponseService->created(
            $this->jnfService->createDraft($request->validated()),
            'Draft JNF created successfully.'
        );
    }

    public function show(int $jnf): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->jnfService->show($jnf),
            'JNF detail fetched successfully.'
        );
    }

    public function update(UpdateJnfRequest $request, int $jnf): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->jnfService->update($jnf, $request->validated()),
            'JNF updated successfully.'
        );
    }

    public function destroy(int $jnf): JsonResponse
    {
        $this->jnfService->deleteDraft($jnf);

        return $this->apiResponseService->noContent();
    }

    public function preview(int $jnf): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->jnfService->preview($jnf),
            'JNF preview built successfully.'
        );
    }

    public function submit(int $jnf): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->jnfService->submit($jnf),
            'JNF submitted successfully.'
        );
    }
}

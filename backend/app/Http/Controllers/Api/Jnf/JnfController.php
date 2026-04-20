<?php

namespace App\Http\Controllers\Api\Jnf;

use App\Http\Controllers\Controller;
use App\Http\Requests\Jnf\ListJnfsRequest;
use App\Http\Requests\Jnf\StoreJnfRequest;
use App\Http\Requests\Jnf\UpdateJnfRequest;
use App\Services\Jnf\JnfService;
use Illuminate\Http\JsonResponse;

class JnfController extends Controller
{
    public function __construct(
        private readonly JnfService $jnfService
    ) {
    }

    public function index(ListJnfsRequest $request): JsonResponse
    {
        return $this->api()->success(
            $this->jnfService->list($request->validated())
        );
    }

    public function store(StoreJnfRequest $request): JsonResponse
    {
        return $this->api()->created(
            $this->jnfService->createDraft($request->validated())
        );
    }

    public function show(int $jnf): JsonResponse
    {
        return $this->api()->success(
            $this->jnfService->show($jnf)
        );
    }

    public function update(UpdateJnfRequest $request, int $jnf): JsonResponse 
    {
        return $this->api()->success(
            $this->jnfService->update($jnf, $request->validated())
        );
    }

    public function destroy(int $jnf): JsonResponse
    {
        $this->jnfService->deleteDraft($jnf);

        return $this->api()->noContent();
    }

    public function preview(int $jnf): JsonResponse
    {
        return $this->api()->success(
            $this->jnfService->preview($jnf)
        );
    }

    public function submit(int $jnf): JsonResponse
    {
        return $this->api()->success(
            $this->jnfService->submit($jnf)
        );
    }
}
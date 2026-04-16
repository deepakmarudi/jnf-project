<?php

namespace App\Http\Controllers\Api\Jnf;

use App\Http\Controllers\Controller;
use App\Http\Requests\Jnf\Declaration\UpsertDeclarationRequest;
use App\Services\Jnf\DeclarationService;
use Illuminate\Http\JsonResponse;

class DeclarationController extends Controller
{
    public function __construct(
        private readonly DeclarationService $declarationService
    ) {
    }

    public function show(int $jnf): JsonResponse
    {
        return $this->api()->success(
            $this->declarationService->show($jnf)
        );
    }

    public function upsert(
        UpsertDeclarationRequest $request,
        int $jnf
    ): JsonResponse {
        return $this->api()->success(
            $this->declarationService->upsert($jnf, $request->validated())
        );
    }
}
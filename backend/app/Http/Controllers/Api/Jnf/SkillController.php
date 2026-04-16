<?php

namespace App\Http\Controllers\Api\Jnf;

use App\Http\Controllers\Controller;
use App\Http\Requests\Jnf\Skills\ReplaceSkillsRequest;
use App\Services\Jnf\SkillService;
use Illuminate\Http\JsonResponse;

class SkillController extends Controller
{
    public function __construct(
        private readonly SkillService $skillService
    ) {
    }

    public function catalog(): JsonResponse
    {
        return $this->api()->success(
            $this->skillService->catalog()
        );
    }

    public function show(int $jnf): JsonResponse
    {
        return $this->api()->success(
            $this->skillService->show($jnf)
        );
    }

    public function replace(
        ReplaceSkillsRequest $request,
        int $jnf
    ): JsonResponse {
        return $this->api()->success(
            $this->skillService->replace($jnf, $request->validated())
        );
    }
}
<?php

namespace App\Http\Controllers\Api\Jnf;

use App\Http\Controllers\Controller;
use App\Http\Requests\Jnf\Rounds\StoreRoundRequest;
use App\Http\Requests\Jnf\Rounds\UpdateRoundRequest;
use App\Services\ApiResponseService;
use App\Services\Jnf\RoundService;
use Illuminate\Http\JsonResponse;

class RoundController extends Controller
{
    public function __construct(
        private readonly RoundService $roundService,
        private readonly ApiResponseService $apiResponseService
    ) {
    }

    public function store(StoreRoundRequest $request, int $jnf): JsonResponse
    {
        return $this->apiResponseService->created(
            $this->roundService->store($jnf, $request->validated()),
            'Selection round created successfully.'
        );
    }

    public function index(int $jnf): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->roundService->list($jnf),
            'Selection rounds fetched successfully.'
        );
    }

    public function update(UpdateRoundRequest $request, int $round): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->roundService->update($round, $request->validated()),
            'Selection round updated successfully.'
        );
    }

    public function destroy(int $round): JsonResponse
    {
        $this->roundService->delete($round);

        return $this->apiResponseService->noContent();
    }
}

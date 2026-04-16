<?php

namespace App\Http\Controllers\Api\Jnf;

use App\Http\Controllers\Controller;
use App\Http\Requests\Jnf\Rounds\StoreRoundRequest;
use App\Http\Requests\Jnf\Rounds\UpdateRoundRequest;
use App\Services\Jnf\RoundService;
use Illuminate\Http\JsonResponse;

class RoundController extends Controller
{
    public function __construct(
        private readonly RoundService $roundService
    ) {
    }

    public function store(StoreRoundRequest $request, int $jnf): JsonResponse
    {
        return $this->api()->created(
            $this->roundService->store($jnf, $request->validated())
        );
    }

    public function index(int $jnf): JsonResponse
    {
        return $this->api()->success(
            $this->roundService->list($jnf)
        );
    }

    public function update(UpdateRoundRequest $request, int $round): JsonResponse
    {
        return $this->api()->success(
            $this->roundService->update($round, $request->validated())
        );
    }

    public function destroy(int $round): JsonResponse
    {
        $this->roundService->delete($round);

        return $this->api()->noContent();
    }
}
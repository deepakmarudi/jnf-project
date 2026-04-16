<?php

namespace App\Http\Controllers\Api\Portal;

use App\Http\Controllers\Controller;
use App\Http\Requests\Portal\QuickLinksQueryRequest;
use App\Services\Portal\PortalContentService;
use Illuminate\Http\JsonResponse;

class PortalController extends Controller
{
    public function __construct(
        private readonly PortalContentService $portalContentService
    ) {
    }

    public function stats(): JsonResponse
    {
        return $this->api()->success(
            $this->portalContentService->stats()
        );
    }

    public function quickLinks(QuickLinksQueryRequest $request): JsonResponse
    {
        return $this->api()->success(
            $this->portalContentService->quickLinks($request->validated())
        );
    }
}
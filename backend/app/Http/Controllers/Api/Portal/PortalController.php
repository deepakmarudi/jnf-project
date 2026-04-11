<?php

namespace App\Http\Controllers\Api\Portal;

use App\Http\Controllers\Controller;
use App\Http\Requests\Portal\QuickLinksQueryRequest;
use App\Services\ApiResponseService;
use App\Services\Portal\PortalContentService;
use Illuminate\Http\JsonResponse;

class PortalController extends Controller
{
    public function __construct(
        private readonly PortalContentService $portalContentService,
        private readonly ApiResponseService $apiResponseService
    ) {
    }

    public function stats(): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->portalContentService->stats(),
            'Portal stats fetched successfully.'
        );
    }

    public function quickLinks(QuickLinksQueryRequest $request): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->portalContentService->quickLinks($request->validated()),
            'Portal quick links fetched successfully.'
        );
    }
}

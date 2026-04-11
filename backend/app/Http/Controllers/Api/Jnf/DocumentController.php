<?php

namespace App\Http\Controllers\Api\Jnf;

use App\Http\Controllers\Controller;
use App\Http\Requests\Jnf\Documents\StoreDocumentRequest;
use App\Services\ApiResponseService;
use App\Services\Jnf\DocumentService;
use Illuminate\Http\JsonResponse;

class DocumentController extends Controller
{
    public function __construct(
        private readonly DocumentService $documentService,
        private readonly ApiResponseService $apiResponseService
    ) {
    }

    public function store(StoreDocumentRequest $request, int $jnf): JsonResponse
    {
        return $this->apiResponseService->created(
            $this->documentService->store($jnf, $request->validated()),
            'Document stored successfully.'
        );
    }

    public function index(int $jnf): JsonResponse
    {
        return $this->apiResponseService->success(
            $this->documentService->list($jnf),
            'Documents fetched successfully.'
        );
    }

    public function destroy(int $document): JsonResponse
    {
        $this->documentService->delete($document);

        return $this->apiResponseService->noContent();
    }
}

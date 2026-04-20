<?php

namespace App\Http\Controllers\Api\Jnf;

use App\Http\Controllers\Controller;
use App\Http\Requests\Jnf\Documents\StoreDocumentRequest;
use App\Services\Jnf\DocumentService;
use Illuminate\Http\JsonResponse;

class DocumentController extends Controller
{
    public function __construct(
        private readonly DocumentService $documentService
    ) {
    }

    public function store(StoreDocumentRequest $request, int $jnf): JsonResponse
    {
        return $this->api()->created(
            $this->documentService->store($jnf, $request->validated())
        );
    }

    public function index(int $jnf): JsonResponse
    {
        return $this->api()->success(
            $this->documentService->list($jnf)
        );
    }

    public function destroy(int $document): JsonResponse
    {
        $this->documentService->delete($document);

        return $this->api()->noContent();
    }
}
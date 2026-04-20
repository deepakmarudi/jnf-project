<?php

namespace App\Services\Jnf;

use App\Models\Jnf;
use App\Models\JnfDocument;
use App\Exceptions\Api\ApiException;

class DocumentService
{
    public function store(int $jnfId, array $payload): array
    {
        $jnf = $this->getOwnedJnf($jnfId);

        // 🚨 Prevent modification after submission
        if ($jnf->status !== 'draft') {
            throw new ApiException(
                'INVALID_ACTION',
                'Documents can only be modified for draft JNFs.',
                403
            );
        }

        $document = JnfDocument::create(array_merge($payload, [
            'jnf_id' => $jnf->id,
            'uploaded_by_type' => 'recruiter',
            'uploaded_by_id' => auth()->id(),
        ]));

        return [
            'document' => $document->toArray(),
        ];
    }

    public function list(int $jnfId): array
    {
        $jnf = $this->getOwnedJnf($jnfId);

        return [
            'documents' => $jnf->documents()->get()->toArray(),
        ];
    }

    public function delete(int $documentId): void
    {
        $document = JnfDocument::with('jnf')->findOrFail($documentId);

        $this->assertOwnership($document->jnf);

        if ($document->jnf->status !== 'draft') {
            throw new ApiException(
                'INVALID_ACTION',
                'Documents can only be deleted for draft JNFs.',
                403
            );
        }

        $document->delete();
    }

    // 🔒 Ownership enforcement
    private function getOwnedJnf(int $jnfId): Jnf
    {
        return Jnf::where('id', $jnfId)
            ->where('created_by', auth()->id())
            ->firstOrFail();
    }

    private function assertOwnership(Jnf $jnf): void
    {
        if ($jnf->created_by !== auth()->id()) {
            throw new ApiException(
                'FORBIDDEN',
                'You do not have permission to access this resource.',
                403
            );
        }
    }
}
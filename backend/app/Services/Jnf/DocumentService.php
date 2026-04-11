<?php

namespace App\Services\Jnf;

class DocumentService
{
    public function store(int $jnf, array $payload): array
    {
        return [
            'document' => [
                'id' => 1,
                'jnf_id' => $jnf,
                ...$payload,
            ],
        ];
    }

    public function list(int $jnf): array
    {
        return [
            'documents' => [
                [
                    'id' => 1,
                    'jnf_id' => $jnf,
                    'document_type' => 'jd_pdf',
                    'file_path' => '/storage/jd/example.pdf',
                ],
            ],
        ];
    }

    public function delete(int $document): void
    {
    }
}

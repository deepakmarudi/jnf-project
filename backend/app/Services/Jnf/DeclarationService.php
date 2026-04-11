<?php

namespace App\Services\Jnf;

class DeclarationService
{
    public function show(int $jnf): array
    {
        return [
            'jnf_id' => $jnf,
            'preview_confirmed' => false,
        ];
    }

    public function upsert(int $jnf, array $payload): array
    {
        return [
            'jnf_id' => $jnf,
            ...$payload,
        ];
    }
}

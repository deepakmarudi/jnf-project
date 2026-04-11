<?php

namespace App\Services\Jnf;

class EligibilityService
{
    public function show(int $jnf): array
    {
        return [
            'jnf_id' => $jnf,
            'minimum_cgpa' => null,
            'programme_rows' => [],
            'discipline_rows' => [],
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

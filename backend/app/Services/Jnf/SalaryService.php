<?php

namespace App\Services\Jnf;

class SalaryService
{
    public function show(int $jnf): array
    {
        return [
            'jnf_id' => $jnf,
            'salary_packages' => [],
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

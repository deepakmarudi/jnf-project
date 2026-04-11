<?php

namespace App\Services\Jnf;

class RoundService
{
    public function store(int $jnf, array $payload): array
    {
        return [
            'round' => [
                'id' => 1,
                'jnf_id' => $jnf,
                ...$payload,
            ],
        ];
    }

    public function list(int $jnf): array
    {
        return [
            'selection_rounds' => [
                [
                    'id' => 1,
                    'jnf_id' => $jnf,
                    'round_name' => 'Technical Interview',
                    'round_order' => 1,
                ],
            ],
        ];
    }

    public function update(int $round, array $payload): array
    {
        return [
            'round' => [
                'id' => $round,
                ...$payload,
            ],
        ];
    }

    public function delete(int $round): void
    {
    }
}

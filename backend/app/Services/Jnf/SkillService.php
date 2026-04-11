<?php

namespace App\Services\Jnf;

class SkillService
{
    public function catalog(): array
    {
        return [
            'skills' => [
                ['id' => 1, 'label' => 'C++'],
                ['id' => 2, 'label' => 'Java'],
                ['id' => 3, 'label' => 'Python'],
            ],
        ];
    }

    public function show(int $jnf): array
    {
        return [
            'jnf_id' => $jnf,
            'skill_ids' => [1, 3],
        ];
    }

    public function replace(int $jnf, array $payload): array
    {
        return [
            'jnf_id' => $jnf,
            'skill_ids' => $payload['skill_ids'],
        ];
    }
}

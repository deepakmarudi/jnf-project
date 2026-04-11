<?php

namespace App\Services\Jnf;

class ContactService
{
    public function store(int $jnf, array $payload): array
    {
        return [
            'contact' => [
                'id' => 1,
                'jnf_id' => $jnf,
                ...$payload,
            ],
        ];
    }

    public function list(int $jnf): array
    {
        return [
            'contacts' => [
                [
                    'id' => 1,
                    'jnf_id' => $jnf,
                    'contact_type' => 'hr',
                    'full_name' => 'HR Contact',
                    'email' => 'hr@example.com',
                ],
            ],
        ];
    }

    public function update(int $contact, array $payload): array
    {
        return [
            'contact' => [
                'id' => $contact,
                ...$payload,
            ],
        ];
    }

    public function delete(int $contact): void
    {
    }
}

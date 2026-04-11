<?php

namespace App\Services\Portal;

class PortalContentService
{
    public function stats(): array
    {
        return [
            'stats' => [
                [
                    'label' => 'Active recruiters',
                    'value' => 120,
                ],
                [
                    'label' => 'Open JNFs',
                    'value' => 34,
                ],
            ],
        ];
    }

    public function quickLinks(array $filters = []): array
    {
        return [
            'filters' => $filters,
            'quick_links' => [
                [
                    'id' => 1,
                    'title' => 'Placement Policy',
                    'link_type' => $filters['link_type'] ?? 'policy',
                    'url' => 'https://example.com/policy',
                    'is_active' => $filters['is_active'] ?? true,
                ],
            ],
        ];
    }
}

<?php

namespace App\Services\Portal;

use App\Models\PortalStat;
use App\Models\PortalQuickLink;

class PortalContentService
{
    public function stats(): array
    {
        $stats = PortalStat::where('is_active', true)
            ->orderBy('display_order')
            ->get();

        return [
            'stats' => $stats->map(function ($stat) {
                return [
                    'label' => $stat->metric_label,
                    'value' => $stat->metric_value,
                ];
            })->toArray(),
        ];
    }

    public function quickLinks(array $filters = []): array
    {
        $query = PortalQuickLink::where('is_active', true);

        if (isset($filters['link_type'])) {
            $query->where('link_type', $filters['link_type']);
        }

        $links = $query->orderBy('display_order')->get();

        return [
            'filters' => $filters,
            'quick_links' => $links->map(function ($link) {
                return [
                    'id' => $link->id,
                    'title' => $link->title,
                    'link_type' => $link->link_type,
                    'url' => $link->url,
                    'is_active' => $link->is_active,
                ];
            })->toArray(),
        ];
    }
}

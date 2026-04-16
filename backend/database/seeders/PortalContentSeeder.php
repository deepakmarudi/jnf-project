<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PortalContentSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        // 1. Portal Stats
        DB::table('portal_stats')->insert([
            ['metric_key' => 'students_placed', 'metric_label' => 'Students Placed', 'metric_value' => '900+', 'display_order' => 1, 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['metric_key' => 'companies_visited', 'metric_label' => 'Companies Visited', 'metric_value' => '300+', 'display_order' => 2, 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['metric_key' => 'highest_ctc', 'metric_label' => 'Highest Package', 'metric_value' => '1.2 Cr', 'display_order' => 3, 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
        ]);

        // 2. Portal Quick Links
        DB::table('portal_quick_links')->insert([
            ['title' => 'Placement Brochure 2026', 'url' => '/downloads/brochure-2026.pdf', 'link_type' => 'brochure', 'display_order' => 1, 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['title' => 'Past Recruiters', 'url' => '/recruiters', 'link_type' => 'past_recruiters', 'display_order' => 2, 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['title' => 'Placement Policy', 'url' => '/policy', 'link_type' => 'policy', 'display_order' => 3, 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['title' => 'Contact the Team', 'url' => '/contact', 'link_type' => 'contact', 'display_order' => 4, 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}

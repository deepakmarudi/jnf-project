<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MasterDataSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        // 1. Programmes
        DB::table('programmes')->insert([
            ['code' => 'BTECH', 'name' => 'Bachelor of Technology', 'level' => 'ug', 'duration_years' => 4.0, 'admission_channel' => 'JEE Advanced', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['code' => 'MTECH', 'name' => 'Master of Technology', 'level' => 'pg', 'duration_years' => 2.0, 'admission_channel' => 'GATE', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['code' => 'PHD', 'name' => 'Doctor of Philosophy', 'level' => 'doctoral', 'duration_years' => 5.0, 'admission_channel' => 'Institute Test', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
        ]);

        // Fetch programme IDs
        $ugId = DB::table('programmes')->where('code', 'BTECH')->value('id') ?? 1;
        $pgId = DB::table('programmes')->where('code', 'MTECH')->value('id') ?? 2;

        // 2. Disciplines
        DB::table('disciplines')->insert([
            ['programme_id' => $ugId, 'name' => 'Computer Science and Engineering', 'short_name' => 'CSE', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['programme_id' => $ugId, 'name' => 'Electrical Engineering', 'short_name' => 'EE', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['programme_id' => $ugId, 'name' => 'Mechanical Engineering', 'short_name' => 'ME', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['programme_id' => $pgId, 'name' => 'Artificial Intelligence', 'short_name' => 'AI', 'is_active' => true, 'created_at' => $now, 'updated_at' => $now],
        ]);

        // 3. Skills
        DB::table('skills')->insert([
            ['name' => 'Python', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Java', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'C++', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Machine Learning', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Web Development', 'created_at' => $now, 'updated_at' => $now],
        ]);

        // 4. Industry Tags
        DB::table('industry_tags')->insert([
            ['name' => 'Software/IT', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Finance/FinTech', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Consulting', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Core Engineering', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'R&D', 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}

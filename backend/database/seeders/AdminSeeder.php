<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Admin::updateOrCreate(
            ['email' => 'admin@iitism.ac.in'],
            [
                'name' => 'CDC Admin',
                'designation' => 'Placement Coordinator',
                'password' => Hash::make('admin123'),
                'status' => 'active',
            ]
        );

        Admin::updateOrCreate(
            ['email' => 'deepakmarudi1@gmail.com'],
            [
                'name' => 'Deepak Admin',
                'designation' => 'System Administrator',
                'password' => Hash::make('Deepak@123'),
                'status' => 'active',
            ]
        );

        $this->command->info('Admin accounts updated successfully.');
    }
}

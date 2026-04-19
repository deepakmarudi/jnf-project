<?php

use App\Models\Recruiter;
use App\Models\Company;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Artisan;
use App\Models\User;

require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$recruiter = Recruiter::first();
if (!$recruiter) {
    echo "No recruiter found to test with!\n";
    exit(1);
}

// Generate token
$token = $recruiter->createToken('test-token')->plainTextToken;

$baseUrl = 'http://127.0.0.1:8000/api';
$headers = [
    'Authorization' => "Bearer $token",
    'Accept' => 'application/json',
];

echo "Testing Draft Creation...\n";
// Create Draft
$response = Http::withHeaders($headers)->post("$baseUrl/jnfs", [
    'job_title' => 'Test SDE Role',
    'recruitment_season' => '2026-27',
]);

if (!$response->successful()) {
    echo "Draft Creation Failed: " . $response->body() . "\n";
    exit(1);
}
$jnfId = $response->json('data.jnf.id');
echo "Draft Created! ID: $jnfId\n";

echo "Testing Monolithic Full Payload Sync...\n";
$payload = [
    'job_title' => 'Senior Frontend Developer',
    'department_or_function' => 'Engineering',
    'expected_hires' => 10,
    
    // Test Contacts Sync
    'contacts' => [
        [
            'contact_type' => 'primary_poc',
            'full_name' => 'John Doe',
            'email' => 'john.doe@test.com',
            'mobile_number' => '9999999999',
            'is_optional' => false,
        ]
    ],

    // Test Eligibility Sink (with codes and actual sync)
    'eligibility' => [
        'minimum_cgpa' => 8.0,
        'backlogs_allowed' => false,
        'gender_filter' => 'all',
    ],
    'programme_rows' => [
        ['programme_id' => 'BTECH', 'is_eligible' => true]
    ],
    'discipline_rows' => [
        ['discipline_id' => 'CSE', 'programme_id' => 'BTECH', 'is_eligible' => true]
    ],

    // Test Salary Breakups with embedded components
    'salary_packages' => [
        [
            'currency' => 'INR',
            'ctc_annual' => 4500000,
            'base_fixed' => 3000000,
            'components' => [
                [
                    'component_type' => 'joining_bonus',
                    'component_label' => 'Joining Bonus',
                    'amount' => 500000,
                    'currency' => 'INR',
                    'notes' => null,
                ]
            ]
        ]
    ],

    // Test Rounds
    'selection_rounds' => [
        [
            'round_category' => 'online_test',
            'round_order' => 1,
            'round_name' => 'DSA Test',
            'selection_mode' => 'online',
            'duration_minutes' => 90,
            'is_pre_offer_mandatory' => true,
            'is_enabled' => true,
        ]
    ],

    // Test Declaration
    'declaration' => [
        'authorised_signatory_name' => 'Jane Smith',
        'aipc_guidelines_accepted' => true,
        'posted_information_verified' => true,
        'accuracy_terms_accepted' => true,
        'preview_confirmed' => true,
    ],
];

$response = Http::withHeaders($headers)->put("$baseUrl/jnfs/$jnfId", $payload);

if (!$response->successful()) {
    echo "Full Payload Sync Failed: " . $response->body() . "\n";
    exit(1);
}
echo "Payload Synced Successfully!\n";

echo "Testing Submit Operation...\n";
$response = Http::withHeaders($headers)->post("$baseUrl/jnfs/$jnfId/submit");

if (!$response->successful()) {
    echo "Submit Workflow Failed: " . $response->body() . "\n";
    exit(1);
}

echo "JNF Submitted Successfully! Final Status: " . $response->json('data.jnf.status') . "\n";
echo "ALL TESTS PASSED.\n";

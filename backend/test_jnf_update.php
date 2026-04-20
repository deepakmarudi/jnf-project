<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$user = App\Models\Recruiter::first();
auth()->login($user);

$service = app(App\Services\Jnf\JnfService::class);
$payload = [
    'contacts' => [],
    'eligibility' => [],
    'salary_details' => [
        'currency' => 'INR',
        'salary_mode' => 'same_for_all',
        'salary_rows' => [
            [
                'programme_id' => 'B.Tech',
                'ctc' => '1500000',
                'gross_salary' => '',
                'base_salary' => '',
                'variable_pay' => '',
                'joining_bonus' => '',
                'retention_bonus' => '',
                'performance_bonus' => '',
                'esops' => '',
                'stipend' => '',
                'bond_amount' => '',
                'deductions_or_notes' => 'None'
            ]
        ]
    ],
    'selection_process' => [
        'rounds' => [
            [
                'round_order' => 1,
                'round_name' => 'Aptitude Test',
                'round_category' => 'other',
                'selection_mode' => 'online',
                'duration_minutes' => '',
                'panel_count' => '',
                'infrastructure_required' => '',
                'instructions' => '',
                'is_enabled' => true,
                'is_pre_offer_mandatory' => false
            ]
        ]
    ],
    'declaration' => []
];

try {
    DB::beginTransaction();
    $service->update(4, $payload); // Update draft JNF 4
    DB::commit();
    echo "SUCCESS: Saved rounds! Count: " . \App\Models\Jnf::find(4)->selectionRounds()->count() . "\n";
} catch (\Exception $e) {
    DB::rollBack();
    echo "FAILED: " . $e->getMessage() . "\n" . $e->getTraceAsString() . "\n";
}

<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
auth()->loginUsingId(1); // Assuming 1 is recruiter

$service = app(\App\Services\Jnf\JnfService::class);
$payload = [
    'selection_process' => [
        'rounds' => [
            [
                'round_name' => 'Tech Test',
                'duration_minutes' => '',
                'panel_count' => '',
                'infrastructure_required' => '',
            ]
        ]
    ]
];
try {
    $service->update(4, $payload); // Update JNF 4
    echo "Update successful. Rounds: " . \App\Models\Jnf::find(4)->selectionRounds()->count() . "\n";
} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}

<?php

$jnf = App\Models\Jnf::first();
if (!$jnf) {
   echo "No JNF found.\n";
   exit;
}
$service = app(App\Services\Jnf\JnfService::class);
Auth::login($jnf->creator);

// Setup dummy initial payload based on what we know
$initialPayload = [
    'role_type' => 'full_time',
    'work_location_mode' => 'on_site',
    'department_or_function' => 'Other'
];

try {
    $service->update($jnf->id, $initialPayload);
    $dbJnf = App\Models\Jnf::find($jnf->id);
    echo "Initial Update -> Role: {$dbJnf->role_type}, Mode: {$dbJnf->work_location_mode}, Dept: {$dbJnf->department_or_function}\n";

    // Now change the options
    $secondPayload = [
        'role_type' => 'internship',
        'work_location_mode' => 'remote',
        'department_or_function' => 'Finance'
    ];
    
    $service->update($jnf->id, $secondPayload);
    $dbJnf2 = App\Models\Jnf::find($jnf->id);
    echo "Second Update -> Role: {$dbJnf2->role_type}, Mode: {$dbJnf2->work_location_mode}, Dept: {$dbJnf2->department_or_function}\n";

} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

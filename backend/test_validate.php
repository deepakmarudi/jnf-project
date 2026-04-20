<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$jnf = App\Models\Jnf::first();
$payload = [
    'job_title' => 'Software Engineer',
    'work_location_mode' => 'on_site',
    'role_type' => 'internship',
    'department_or_function' => 'Test Function',
    'eligibility' => ['gender_filter' => 'female'],
];
$request = new \App\Http\Requests\Jnf\UpdateJnfRequest();
$request->merge($payload);
$validator = \Illuminate\Support\Facades\Validator::make($request->all(), $request->rules());
$validated = $validator->validated();

$coreFields = $validated;
unset(
    $coreFields['contacts'], 
    $coreFields['eligibility'], 
    $coreFields['salary_details'], 
    $coreFields['selection_process'], 
    $coreFields['additional_details'],
    $coreFields['declaration'],
    $coreFields['required_skills'],
    $coreFields['salary_packages'],
    $coreFields['selection_rounds'],
    $coreFields['programme_rows'],
    $coreFields['discipline_rows']
);

$arrays = array_filter($coreFields, 'is_array');
echo "Arrays in coreFields: \n";
print_r($arrays);

try {
    $jnf->fill($coreFields);
    echo "Fill passed!\n";
} catch (\Exception $e) {
    echo "Exception: " . $e->getMessage() . "\n";
}

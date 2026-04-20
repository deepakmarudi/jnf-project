<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$service = app(\App\Services\Admin\AdminReviewService::class);
echo json_encode($service->show(3), JSON_PRETTY_PRINT);

<?php

use App\Http\Controllers\Api\Portal\HealthController;
use Illuminate\Support\Facades\Route;

Route::get('/health', HealthController::class);

require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/portal.php';

<?php

use App\Http\Controllers\Api\Dashboard\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'recruiter.auth'])->group(function () {
    Route::get('/dashboard', DashboardController::class);
});

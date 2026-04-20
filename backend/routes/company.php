<?php

use App\Http\Controllers\Api\Company\CompanyController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'recruiter.auth'])->group(function () {
    Route::get('/companies/me', [CompanyController::class, 'me']);
    Route::put('/companies/me', [CompanyController::class, 'updateMe']);
});

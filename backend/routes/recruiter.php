<?php

use App\Http\Controllers\Api\Recruiter\RecruiterController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'recruiter.auth'])->group(function () {
    Route::get('/recruiters/me', [RecruiterController::class, 'me']);
    Route::put('/recruiters/me', [RecruiterController::class, 'updateMe']);
});

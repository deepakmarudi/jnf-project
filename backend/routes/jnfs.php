<?php

use App\Http\Controllers\Api\Jnf\ContactController;
use App\Http\Controllers\Api\Jnf\DeclarationController;
use App\Http\Controllers\Api\Jnf\DocumentController;
use App\Http\Controllers\Api\Jnf\EligibilityController;
use App\Http\Controllers\Api\Jnf\JnfController;
use App\Http\Controllers\Api\Jnf\RoundController;
use App\Http\Controllers\Api\Jnf\SalaryController;
use App\Http\Controllers\Api\Jnf\SkillController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'recruiter.auth'])->group(function () {
    Route::get('/jnfs', [JnfController::class, 'index']);
    Route::post('/jnfs', [JnfController::class, 'store']);
    Route::get('/jnfs/{jnf}', [JnfController::class, 'show']);
    Route::put('/jnfs/{jnf}', [JnfController::class, 'update']);
    Route::delete('/jnfs/{jnf}', [JnfController::class, 'destroy']);
    Route::post('/jnfs/{jnf}/preview', [JnfController::class, 'preview']);
    Route::post('/jnfs/{jnf}/submit', [JnfController::class, 'submit']);

    Route::post('/jnfs/{jnf}/contacts', [ContactController::class, 'store']);
    Route::get('/jnfs/{jnf}/contacts', [ContactController::class, 'index']);
    Route::put('/contacts/{contact}', [ContactController::class, 'update']);
    Route::delete('/contacts/{contact}', [ContactController::class, 'destroy']);

    Route::get('/skills', [SkillController::class, 'catalog']);
    Route::get('/jnfs/{jnf}/skills', [SkillController::class, 'show']);
    Route::put('/jnfs/{jnf}/skills', [SkillController::class, 'replace']);

    Route::get('/jnfs/{jnf}/eligibility', [EligibilityController::class, 'show']);
    Route::put('/jnfs/{jnf}/eligibility', [EligibilityController::class, 'upsert']);

    Route::get('/jnfs/{jnf}/salary', [SalaryController::class, 'show']);
    Route::put('/jnfs/{jnf}/salary', [SalaryController::class, 'upsert']);

    Route::post('/jnfs/{jnf}/rounds', [RoundController::class, 'store']);
    Route::get('/jnfs/{jnf}/rounds', [RoundController::class, 'index']);
    Route::put('/rounds/{round}', [RoundController::class, 'update']);
    Route::delete('/rounds/{round}', [RoundController::class, 'destroy']);

    Route::get('/jnfs/{jnf}/declaration', [DeclarationController::class, 'show']);
    Route::put('/jnfs/{jnf}/declaration', [DeclarationController::class, 'upsert']);

    Route::post('/jnfs/{jnf}/documents', [DocumentController::class, 'store']);
    Route::get('/jnfs/{jnf}/documents', [DocumentController::class, 'index']);
    Route::delete('/documents/{document}', [DocumentController::class, 'destroy']);
});

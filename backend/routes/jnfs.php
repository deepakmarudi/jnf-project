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

    Route::prefix('jnfs')->group(function () {

        Route::get('/', [JnfController::class, 'index']);
        Route::post('/', [JnfController::class, 'store']);
        Route::get('/{jnf}', [JnfController::class, 'show']);
        Route::put('/{jnf}', [JnfController::class, 'update']);
        Route::delete('/{jnf}', [JnfController::class, 'destroy']);

        Route::post('/{jnf}/preview', [JnfController::class, 'preview']);
        Route::post('/{jnf}/submit', [JnfController::class, 'submit']);
        
        // Single PDF upload endpoint decoupled from specific JNF ID if needed, 
        // useful for the recruiter to upload PDF immediately while form is still filling in memory.
        Route::post('/upload-jd-pdf', [\App\Http\Controllers\JnfFileController::class, 'uploadJdPdf']);

        // Contacts
        Route::post('/{jnf}/contacts', [ContactController::class, 'store']);
        Route::get('/{jnf}/contacts', [ContactController::class, 'index']);
        Route::put('/contacts/{contact}', [ContactController::class, 'update']);
        Route::delete('/contacts/{contact}', [ContactController::class, 'destroy']);

        // Skills
        Route::get('/skills', [SkillController::class, 'catalog']);
        Route::get('/{jnf}/skills', [SkillController::class, 'show']);
        Route::put('/{jnf}/skills', [SkillController::class, 'replace']);

        // Eligibility
        Route::get('/{jnf}/eligibility', [EligibilityController::class, 'show']);
        Route::put('/{jnf}/eligibility', [EligibilityController::class, 'upsert']);

        // Salary
        Route::get('/{jnf}/salary', [SalaryController::class, 'show']);
        Route::put('/{jnf}/salary', [SalaryController::class, 'upsert']);

        // Rounds
        Route::post('/{jnf}/rounds', [RoundController::class, 'store']);
        Route::get('/{jnf}/rounds', [RoundController::class, 'index']);
        Route::put('/rounds/{round}', [RoundController::class, 'update']);
        Route::delete('/rounds/{round}', [RoundController::class, 'destroy']);

        // Declaration
        Route::get('/{jnf}/declaration', [DeclarationController::class, 'show']);
        Route::put('/{jnf}/declaration', [DeclarationController::class, 'upsert']);

        // Documents
        Route::post('/{jnf}/documents', [DocumentController::class, 'store']);
        Route::get('/{jnf}/documents', [DocumentController::class, 'index']);
        Route::delete('/documents/{document}', [DocumentController::class, 'destroy']);
    });
});
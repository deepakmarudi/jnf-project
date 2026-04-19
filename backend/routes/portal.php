<?php

use App\Http\Controllers\Api\Portal\MasterDataController;
use App\Http\Controllers\Api\Portal\PortalController;
use Illuminate\Support\Facades\Route;

Route::prefix('portal')->group(function () {
    Route::get('/stats', [PortalController::class, 'stats']);
    Route::get('/quick-links', [PortalController::class, 'quickLinks']);

    Route::prefix('master')->group(function () {
        Route::get('/programmes', [MasterDataController::class, 'programmes']);
        Route::get('/disciplines', [MasterDataController::class, 'disciplines']);
        Route::get('/departments', [MasterDataController::class, 'departments']);
    });
});

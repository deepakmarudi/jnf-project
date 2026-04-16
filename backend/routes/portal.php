<?php

use App\Http\Controllers\Api\Portal\PortalController;
use Illuminate\Support\Facades\Route;

Route::prefix('portal')->group(function () {
    Route::get('/stats', [PortalController::class, 'stats']);
    Route::get('/quick-links', [PortalController::class, 'quickLinks']);
});

<?php

namespace App\Http\Controllers;

use App\Services\ApiResponseService;

abstract class Controller
{
    protected function api(): ApiResponseService
    {
        return app(ApiResponseService::class);
    }
}
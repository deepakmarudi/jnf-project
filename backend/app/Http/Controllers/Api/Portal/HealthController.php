<?php

namespace App\Http\Controllers\Api\Portal;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class HealthController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return $this->api()->success([
            'healthy' => true,
            'service' => 'jnf-portal-backend',
        ]);
    }
}
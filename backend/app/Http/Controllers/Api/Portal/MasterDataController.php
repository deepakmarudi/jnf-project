<?php

namespace App\Http\Controllers\Api\Portal;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Discipline;
use App\Models\Programme;
use Illuminate\Http\JsonResponse;

class MasterDataController extends Controller
{
    public function programmes(): JsonResponse
    {
        return response()->json([
            'data' => Programme::where('is_active', true)->get()
        ]);
    }

    public function disciplines(): JsonResponse
    {
        return response()->json([
            'data' => Discipline::where('is_active', true)->get()
        ]);
    }

    public function departments(): JsonResponse
    {
        return response()->json([
            'data' => Department::where('is_active', true)->get()
        ]);
    }
}

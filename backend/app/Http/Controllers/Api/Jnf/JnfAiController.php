<?php

namespace App\Http\Controllers\Api\Jnf;

use App\Http\Controllers\Controller;
use App\Services\Jnf\JnfAiService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class JnfAiController extends Controller
{
    public function __construct(
        private readonly JnfAiService $jnfAiService
    ) {
    }

    public function importJd(Request $request): JsonResponse
    {
        $request->validate([
            'jd_pdf' => ['required', 'file', 'mimes:pdf', 'max:10240'], // 10MB max
        ]);

        try {
            $extractedData = $this->jnfAiService->parseJd($request->file('jd_pdf'));
            
            return response()->json([
                'message' => 'Job description parsed successfully.',
                'data' => $extractedData
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to parse PDF using GenAI.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
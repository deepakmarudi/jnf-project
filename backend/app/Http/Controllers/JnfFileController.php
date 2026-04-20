<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class JnfFileController extends Controller
{
    /**
     * Upload JD PDF to secure storage and return path for later auto-fill parsing implementations
     */
    public function uploadJdPdf(Request $request): JsonResponse
    {
        $request->validate([
            'jd_pdf' => ['required', 'file', 'mimes:pdf', 'max:10240'], // Max 10MB
        ]);

        $file = $request->file('jd_pdf');
        $filename = uniqid('jd_') . '.' . $file->getClientOriginalExtension();

        // Store the file and generate a path
        $path = $file->storeAs('public/jds', $filename);

        // Path format we return is essentially public path starting from storage root
        $publicPath = str_replace('public/', '/storage/', $path);

        return response()->json([
            'message' => 'File uploaded successfully',
            'data' => [
                'jd_pdf_path' => $publicPath,
                // Placeholder: When ML/AI is integrated, extracted_data will be attached here
                'extracted_data' => null 
            ]
        ]);
    }
}

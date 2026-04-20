<?php

namespace App\Services\Jnf;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Exception;

class JnfAiService
{
    /**
     * Parse Job Description PDF using Google Gemini 1.5 Pro.
     */
    public function parseJd(UploadedFile $file): array
    {
        $apiKey = config('services.gemini.api_key');
        if (!$apiKey) {
            throw new Exception("Gemini API key is not configured.");
        }

        $base64 = base64_encode(file_get_contents($file->getPathname()));
        $mimeType = $file->getMimeType();

        // Specific JSON schema-based prompt for HR parsing
        $prompt = "You are a precise HR data extraction assistant. 
Extract the required job details from the provided Job Description (JD) PDF.
Return ONLY valid JSON data matching the structure below. Do not wrap in markdown blocks if you can avoid it.
If a value is not mentioned in the text, use null.
The JSON keys and their expected types/formats are:
- job_title (string)
- job_designation (string or null)
- place_of_posting (string or null)
- work_location_mode (must be one of: 'on_site', 'remote', 'hybrid', or null)
- expected_hires (integer or null)
- minimum_hires (integer or null)
- tentative_joining_month (YYYY-MM-DD or null)
- ctc_annual (number or null)
- base_fixed (number or null)
- minimum_cgpa (number or null, e.g., 7.5)";

        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}";

        $payload = [
            'contents' => [
                [
                    'role' => 'user',
                    'parts' => [
                        [
                            'text' => $prompt
                        ],
                        [
                            'inline_data' => [
                                'mime_type' => $mimeType,
                                'data' => $base64
                            ]
                        ]
                    ]
                ]
            ],
            'generationConfig' => [
                'response_mime_type' => 'application/json' // Enforces JSON output on Gemini
            ]
        ];

        $response = Http::timeout(60)->post($url, $payload);

        if ($response->failed()) {
            throw new Exception("Gemini API request failed: " . $response->body());
        }

        $data = $response->json();
        
        $jsonText = $data['candidates'][0]['content']['parts'][0]['text'] ?? '{}';

        // Clean up markdown block in case generationConfig wasn't perfectly respected
        $jsonText = preg_replace('/^```json\s*/i', '', $jsonText);
        $jsonText = preg_replace('/```\s*$/', '', $jsonText);
        $jsonText = trim($jsonText);

        $extractedData = json_decode($jsonText, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception("Failed to decode the Gemini AI JSON response: " . json_last_error_msg());
        }

        return $extractedData;
    }
}
<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$apiKey = config('services.gemini.api_key');
$response = Illuminate\Support\Facades\Http::get("https://generativelanguage.googleapis.com/v1beta/models?key=" . $apiKey);

if ($response->failed()) {
    echo "Failed to fetch models: " . $response->body() . "\n";
    exit(1);
}

$data = $response->json();
if (!isset($data['models'])) {
    echo "No models array found. Response: \n" . json_encode($data) . "\n";
    exit(1);
}

foreach ($data['models'] as $m) {
    if (strpos($m['name'], 'gemini') !== false) {
        echo $m['name'] . "\n";
    }
}
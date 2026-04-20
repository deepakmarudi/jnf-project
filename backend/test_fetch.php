<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::create(
        '/api/admin/jnfs/3', // using jnfId 3 from screenshot
        'GET',
        [],
        [],
        [],
        ['HTTP_ACCEPT' => 'application/json']
    )
);

echo $response->getContent();

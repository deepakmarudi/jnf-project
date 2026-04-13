<?php

namespace Tests\Unit;

use App\Services\ApiResponseService;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class ApiResponseServiceTest extends TestCase
{
    public function test_success_response_contains_expected_keys(): void
    {
        $service = new ApiResponseService();
        $response = $service->success(
            ['foo' => 'bar'],
            'Operation successful.'
        );

        $payload = $response->getData(true);

        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());
        $this->assertSame('Operation successful.', $payload['message']);
        $this->assertSame(['foo' => 'bar'], $payload['data']);
    }
}

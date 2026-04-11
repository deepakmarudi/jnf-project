<?php

namespace App\Services;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ApiResponseService
{
    public function success(
        array $data = [],
        ?string $message = null,
        array $meta = [],
        int $status = Response::HTTP_OK
    ): JsonResponse {
        $response = [
            'data' => $data,
        ];

        if ($message !== null) {
            $response['message'] = $message;
        }

        if ($meta !== []) {
            $response['meta'] = $meta;
        }

        return response()->json($response, $status);
    }

    public function created(
        array $data = [],
        ?string $message = null,
        array $meta = []
    ): JsonResponse {
        return $this->success($data, $message, $meta, Response::HTTP_CREATED);
    }

    public function noContent(): JsonResponse
    {
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    public function error(
        string $message,
        array $errors = [],
        int $status = Response::HTTP_UNPROCESSABLE_ENTITY
    ): JsonResponse {
        $response = [
            'message' => $message,
        ];

        if ($errors !== []) {
            $response['errors'] = $errors;
        }

        return response()->json($response, $status);
    }
}

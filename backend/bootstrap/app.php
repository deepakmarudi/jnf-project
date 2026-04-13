<?php

use App\Exceptions\Api\ApiException;
use App\Http\Middleware\EnsureAdminAuthenticated;
use App\Http\Middleware\EnsureRecruiterAuthenticated;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->statefulApi();

        $middleware->alias([
            'admin.auth' => EnsureAdminAuthenticated::class,
            'recruiter.auth' => EnsureRecruiterAuthenticated::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {

        // ✅ Custom API exceptions
        $exceptions->render(function (
            ApiException $exception,
            Request $request
        ) {
            if (! $request->expectsJson()) {
                return null;
            }

            return app(\App\Services\ApiResponseService::class)->error(
                method_exists($exception, 'code')
                    ? $exception->code()
                    : 'API_ERROR',
                $exception->getMessage(),
                $exception->errors(),
                $exception->status()
            );
        });

        // ✅ Validation errors
        $exceptions->render(function (
            \Illuminate\Validation\ValidationException $exception,
            Request $request
        ) {
            if (! $request->expectsJson()) {
                return null;
            }

            return app(\App\Services\ApiResponseService::class)->error(
                'VALIDATION_ERROR',
                'Validation failed',
                $exception->errors(),
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        });

        // ✅ 404 Not Found
        $exceptions->render(function (
            NotFoundHttpException $exception,
            Request $request
        ) {
            if (! $request->expectsJson()) {
                return null;
            }

            return app(\App\Services\ApiResponseService::class)->error(
                'NOT_FOUND',
                'Resource not found',
                [],
                Response::HTTP_NOT_FOUND
            );
        });

        // ✅ Fallback (all other exceptions)
        $exceptions->render(function (\Throwable $exception, Request $request) {
            if (! $request->expectsJson()) {
                return null;
            }

            return app(\App\Services\ApiResponseService::class)->error(
                'SERVER_ERROR',
                config('app.debug')
                    ? $exception->getMessage()
                    : 'Server error.',
                [],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        });
    })
    ->create();
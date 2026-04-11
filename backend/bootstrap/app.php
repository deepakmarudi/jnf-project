<?php

use App\Exceptions\Api\ApiException;
use App\Http\Middleware\EnsureAdminAuthenticated;
use App\Http\Middleware\EnsureRecruiterAuthenticated;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

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
        $exceptions->render(function (
            ApiException $exception,
            Request $request
        ) {
            if (! $request->expectsJson()) {
                return null;
            }

            return response()->json([
                'message' => $exception->getMessage(),
                'errors' => $exception->errors(),
            ], $exception->status());
        });

        $exceptions->render(function (\Throwable $exception, Request $request) {
            if (! $request->expectsJson()) {
                return null;
            }

            return response()->json([
                'message' => config('app.debug')
                    ? $exception->getMessage()
                    : 'Server error.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        });
    })
    ->create();

<?php

namespace App\Http\Middleware;

use App\Models\Recruiter;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureRecruiterAuthenticated
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user instanceof Recruiter) {
            abort(Response::HTTP_FORBIDDEN, 'Recruiter access is required.');
        }

        return $next($request);
    }
}

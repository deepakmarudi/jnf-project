<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
    }

    public function boot(): void
    {
        Model::shouldBeStrict(! $this->app->isProduction());

        // Map the string enums from the PDF ERD (recruiter, admin) to actual Laravel Models
        Relation::enforceMorphMap([
            'admin' => \App\Models\Admin::class,
            'recruiter' => \App\Models\Recruiter::class,
        ]);
    }
}

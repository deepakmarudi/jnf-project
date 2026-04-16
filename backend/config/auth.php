<?php

return [
    'defaults' => [
        'guard' => 'recruiter',
        'passwords' => 'recruiters',
    ],

    'guards' => [
        'recruiter' => [
            'driver' => 'sanctum',
            'provider' => 'recruiters',
        ],
        'admin' => [
            'driver' => 'sanctum',
            'provider' => 'admins',
        ],
    ],

    'providers' => [
        'recruiters' => [
            'driver' => 'eloquent',
            'model' => App\Models\Recruiter::class,
        ],
        'admins' => [
            'driver' => 'eloquent',
            'model' => App\Models\Admin::class,
        ],
    ],

    'passwords' => [
        'recruiters' => [
            'provider' => 'recruiters',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
        'admins' => [
            'provider' => 'admins',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => 10800,
];

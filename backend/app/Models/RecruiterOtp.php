<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecruiterOtp extends Model
{
    public const UPDATED_AT = null; // We only have created_at as per ERD

    protected $fillable = [
        'recruiter_email',
        'otp_code',
        'expires_at',
        'verified_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'verified_at' => 'datetime',
    ];
}

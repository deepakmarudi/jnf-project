<?php

namespace App\Models;

use App\Enums\RecruiterStatus;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Recruiter extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'company_id',
        'full_name',
        'designation',
        'email',
        'mobile_number',
        'alternative_mobile',
        'password',
        'status',
        'email_verified_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'status' => RecruiterStatus::class, // ✅ FIX
    ];

    /**
     * Get the company this recruiter belongs to.
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get the JNFs created by this recruiter.
     */
    public function createdJnfs(): HasMany
    {
        return $this->hasMany(Jnf::class, 'created_by');
    }
}
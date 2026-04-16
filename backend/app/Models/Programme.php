<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Programme extends Model
{
    protected $fillable = [
        'code',
        'name',
        'level',
        'duration_years',
        'admission_channel',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'duration_years' => 'decimal:1',
    ];

    /**
     * Get the disciplines under this programme.
     */
    public function disciplines(): HasMany
    {
        return $this->hasMany(Discipline::class);
    }
}

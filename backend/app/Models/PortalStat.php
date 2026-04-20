<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortalStat extends Model
{
    protected $fillable = [
        'metric_key',
        'metric_label',
        'metric_value',
        'display_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}

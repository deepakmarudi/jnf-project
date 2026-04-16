<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JnfSalaryComponent extends Model
{
    protected $fillable = [
        'salary_package_id',
        'component_type',
        'component_label',
        'amount',
        'currency',
        'notes',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];

    public function package(): BelongsTo
    {
        return $this->belongsTo(JnfSalaryPackage::class, 'salary_package_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JnfEligibilityRule extends Model
{
    protected $fillable = [
        'jnf_id',
        'minimum_cgpa',
        'backlogs_allowed',
        'max_backlogs',
        'high_school_percentage_criterion',
        'gender_filter',
        'slp_requirement',
        'phd_allowed',
        'phd_department_requirement',
        'ma_dhss_allowed',
        'other_specific_requirements',
    ];

    protected $casts = [
        'minimum_cgpa' => 'decimal:2',
        'backlogs_allowed' => 'boolean',
        'high_school_percentage_criterion' => 'decimal:2',
        'phd_allowed' => 'boolean',
        'ma_dhss_allowed' => 'boolean',
    ];

    public function jnf(): BelongsTo
    {
        return $this->belongsTo(Jnf::class);
    }
}

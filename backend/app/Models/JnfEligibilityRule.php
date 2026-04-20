<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JnfEligibilityRule extends Model
{
    protected $fillable = [
        'jnf_id',
        'eligible_programme',
        'minimum_cgpa',
        'backlogs_allowed',
        'max_backlogs',
        'high_school_percentage_criterion',
        'minimum_class_10_percentage',
        'minimum_class_12_percentage',
        'gender_filter',
        'slp_requirement',
        'phd_allowed',
        'phd_department_requirement',
        'ma_dhss_allowed',
        'other_specific_requirements',
        'gap_year_allowed',
        'history_of_arrears_allowed',
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

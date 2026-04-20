<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JnfSalaryPackage extends Model
{
    protected $fillable = [
        'programme_id',
        'salary_structure_mode',
        'currency',
        'ctc',
        'base_salary',
        'variable_pay',
        'joining_bonus',
        'retention_bonus',
        'performance_bonus',
        'esops',
        'stipend',
        'ctc_annual',
        'base_fixed',
        'monthly_take_home',
        'gross_salary',
        'first_year_ctc',
        'stocks_options',
        'esops_value',
        'esops_vest_period',
        'bond_amount',
        'bond_duration_months',
        'deductions_text',
        'ctc_breakup_text',
    ];

    protected $casts = [
        'ctc_annual' => 'decimal:2',
        'base_fixed' => 'decimal:2',
        'monthly_take_home' => 'decimal:2',
        'gross_salary' => 'decimal:2',
        'first_year_ctc' => 'decimal:2',
        'stocks_options' => 'decimal:2',
        'esops_value' => 'decimal:2',
        'bond_amount' => 'decimal:2',
    ];

    public function jnf(): BelongsTo
    {
        return $this->belongsTo(Jnf::class);
    }

    public function programme(): BelongsTo
    {
        return $this->belongsTo(Programme::class);
    }

    public function components(): HasMany
    {
        return $this->hasMany(JnfSalaryComponent::class, 'salary_package_id');
    }
}

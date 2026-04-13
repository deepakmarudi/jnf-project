<?php

namespace App\Models;

use App\Enums\JnfStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Jnf extends Model
{
    protected $fillable = [
        'company_id',
        'created_by',
        'reviewed_by',
        'jnf_number',
        'recruitment_season',
        'job_title',
        'job_designation',
        'place_of_posting',
        'work_location_mode',
        'expected_hires',
        'minimum_hires',
        'tentative_joining_month',
        'job_description_html',
        'additional_job_info',
        'bond_details',
        'registration_link',
        'onboarding_procedure',
        'jd_pdf_path',
        'status',
        'preview_completed',
        'submitted_at',
        'reviewed_at',
        'review_notes',
    ];

    protected $casts = [
        'tentative_joining_month' => 'date',
        'preview_completed' => 'boolean',
        'submitted_at' => 'datetime',
        'reviewed_at' => 'datetime',

        // ✅ ENUM CAST (THIS IS THE MAIN CHANGE)
        'status' => JnfStatus::class,
    ];

    // BelongsTo

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(Recruiter::class, 'created_by');
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'reviewed_by');
    }

    // HasOne

    public function eligibilityRule(): HasOne
    {
        return $this->hasOne(JnfEligibilityRule::class);
    }

    public function declaration(): HasOne
    {
        return $this->hasOne(JnfDeclaration::class);
    }

    // HasMany

    public function contacts(): HasMany
    {
        return $this->hasMany(JnfContact::class);
    }

    public function salaryPackages(): HasMany
    {
        return $this->hasMany(JnfSalaryPackage::class);
    }

    public function selectionRounds(): HasMany
    {
        return $this->hasMany(JnfSelectionRound::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(JnfDocument::class);
    }

    public function auditLogs(): HasMany
    {
        return $this->hasMany(JnfAuditLog::class);
    }

    // BelongsToMany

    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class, 'jnf_skills')
            ->withTimestamps();
    }

    public function eligibleProgrammes(): BelongsToMany
    {
        return $this->belongsToMany(Programme::class, 'jnf_eligibility_programmes')
            ->withPivot(['is_eligible', 'min_cpi_for_programme'])
            ->withTimestamps();
    }

    public function eligibleDisciplines(): BelongsToMany
    {
        return $this->belongsToMany(Discipline::class, 'jnf_eligibility_disciplines')
            ->withPivot(['programme_id', 'is_eligible', 'min_cpi_for_discipline'])
            ->withTimestamps();
    }
}
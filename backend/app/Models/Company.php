<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    protected $fillable = [
        'name',
        'website',
        'postal_address',
        'employee_count',
        'sector',
        'logo_path',
        'category_or_org_type',
        'date_of_establishment',
        'annual_turnover',
        'social_media_url',
        'hq_country',
        'hq_city',
        'nature_of_business',
        'description',
        'is_mnc',
    ];

    protected $casts = [
        'date_of_establishment' => 'date',
        'annual_turnover' => 'decimal:2',
        'is_mnc' => 'boolean',
    ];

    /**
     * Get the recruiters for the company.
     */
    public function recruiters(): HasMany
    {
        return $this->hasMany(Recruiter::class);
    }

    /**
     * Get the JNFs tied to this company.
     */
    public function jnfs(): HasMany
    {
        return $this->hasMany(Jnf::class);
    }

    /**
     * The industry tags that belong to the company.
     */
    public function industryTags(): BelongsToMany
    {
        return $this->belongsToMany(IndustryTag::class, 'company_industry_tags');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class IndustryTag extends Model
{
    protected $fillable = [
        'name',
    ];

    /**
     * Companies associated with this industry tag.
     */
    public function companies(): BelongsToMany
    {
        return $this->belongsToMany(Company::class, 'company_industry_tags')
            ->withTimestamps();
    }
}

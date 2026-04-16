<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Skill extends Model
{
    protected $fillable = [
        'name',
    ];

    /**
     * The JNFs associated with this skill.
     */
    public function jnfs(): BelongsToMany
    {
        return $this->belongsToMany(Jnf::class, 'jnf_skills')
            ->withTimestamps();
    }
}

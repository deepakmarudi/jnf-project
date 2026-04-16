<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JnfAuditLog extends Model
{
    public const UPDATED_AT = null; // Audit logs only have created_at

    protected $fillable = [
        'jnf_id',
        'actor_type',
        'actor_id',
        'action',
        'old_values_json',
        'new_values_json',
        'remarks',
    ];

    protected $casts = [
        'old_values_json' => 'array',
        'new_values_json' => 'array',
    ];

    /**
     * The JNF this audit log belongs to.
     */
    public function jnf(): BelongsTo
    {
        return $this->belongsTo(Jnf::class);
    }

    /**
     * Get the actor (Recruiter, Admin, System).
     * Maps the string enum to an actual Eloquent model resolution.
     */
    public function actor(): MorphTo
    {
        return $this->morphTo();
    }
}

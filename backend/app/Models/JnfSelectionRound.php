<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JnfSelectionRound extends Model
{
    protected $fillable = [
        'jnf_id',
        'round_category',
        'round_order',
        'round_name',
        'selection_mode',
        'interview_mode',
        'test_type',
        'duration_minutes',
        'team_members_required',
        'rooms_required',
        'other_screening_notes',
        'is_enabled',
        'is_pre_offer_mandatory',
    ];

    protected $casts = [
        'is_enabled' => 'boolean',
        'is_pre_offer_mandatory' => 'boolean',
    ];

    public function jnf(): BelongsTo
    {
        return $this->belongsTo(Jnf::class);
    }
}

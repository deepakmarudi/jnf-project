<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JnfContact extends Model
{
    protected $fillable = [
        'jnf_id',
        'contact_type',
        'full_name',
        'designation',
        'email',
        'mobile_number',
        'landline',
        'is_optional',
    ];

    protected $casts = [
        'is_optional' => 'boolean',
    ];

    public function jnf(): BelongsTo
    {
        return $this->belongsTo(Jnf::class);
    }
}

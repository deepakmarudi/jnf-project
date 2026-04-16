<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JnfDeclaration extends Model
{
    protected $fillable = [
        'jnf_id',
        'aipc_guidelines_accepted',
        'shortlisting_timeline_accepted',
        'posted_information_verified',
        'ranking_media_consent',
        'accuracy_terms_accepted',
        'rti_nirf_consent',
        'authorised_signatory_name',
        'authorised_signatory_designation',
        'declaration_date',
        'typed_signature',
        'preview_confirmed',
        'email_confirmation_sent_at',
    ];

    protected $casts = [
        'aipc_guidelines_accepted' => 'boolean',
        'shortlisting_timeline_accepted' => 'boolean',
        'posted_information_verified' => 'boolean',
        'ranking_media_consent' => 'boolean',
        'accuracy_terms_accepted' => 'boolean',
        'rti_nirf_consent' => 'boolean',
        'declaration_date' => 'date',
        'preview_confirmed' => 'boolean',
        'email_confirmation_sent_at' => 'datetime',
    ];

    public function jnf(): BelongsTo
    {
        return $this->belongsTo(Jnf::class);
    }
}

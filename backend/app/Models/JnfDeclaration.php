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
        'authorised_signatory_email',
        'authorised_signatory_phone',
        'declaration_place',
        'declaration_date',
        'typed_signature',
        'preview_confirmed',
        'information_confirmed',
        'authorization_confirmed',
        'policy_consent_confirmed',
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
        'information_confirmed' => 'boolean',
        'authorization_confirmed' => 'boolean',
        'policy_consent_confirmed' => 'boolean',
        'email_confirmation_sent_at' => 'datetime',
    ];

    public function jnf(): BelongsTo
    {
        return $this->belongsTo(Jnf::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JnfDocument extends Model
{
    public const UPDATED_AT = null; // Only created_at is tracked

    protected $fillable = [
        'jnf_id',
        'document_type',
        'original_name',
        'stored_name',
        'file_path',
        'mime_type',
        'file_size',
        'uploaded_by_type',
        'uploaded_by_id',
    ];

    /**
     * Get the JNF to which this document belongs.
     */
    public function jnf(): BelongsTo
    {
        return $this->belongsTo(Jnf::class);
    }

    /**
     * Get the uploader logically.
     */
    public function uploader(): MorphTo
    {
        return $this->morphTo(null, 'uploaded_by_type', 'uploaded_by_id');
    }
}

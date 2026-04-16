<?php

namespace App\Http\Requests\Jnf\Declaration;

use Illuminate\Foundation\Http\FormRequest;

class UpsertDeclarationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'aipc_guidelines_accepted' => ['nullable', 'boolean'],
            'shortlisting_timeline_accepted' => ['nullable', 'boolean'],
            'posted_information_verified' => ['nullable', 'boolean'],
            'ranking_media_consent' => ['nullable', 'boolean'],
            'accuracy_terms_accepted' => ['nullable', 'boolean'],
            'rti_nirf_consent' => ['nullable', 'boolean'],
            'authorised_signatory_name' => ['nullable', 'string', 'max:255'],
            'authorised_signatory_designation' => ['nullable', 'string', 'max:255'],
            'declaration_date' => ['nullable', 'date'],
            'typed_signature' => ['nullable', 'string', 'max:255'],
            'preview_confirmed' => ['nullable', 'boolean'],
        ];
    }
}

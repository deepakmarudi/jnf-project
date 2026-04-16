<?php

namespace App\Http\Requests\Jnf\Contacts;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'contact_type' => ['required', 'string', 'max:50'],
            'full_name' => ['required', 'string', 'max:255'],
            'designation' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'mobile_number' => ['nullable', 'string', 'max:20'],
            'landline' => ['nullable', 'string', 'max:20'],
            'is_optional' => ['nullable', 'boolean'],
        ];
    }
}

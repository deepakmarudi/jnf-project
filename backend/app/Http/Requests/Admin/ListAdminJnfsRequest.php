<?php

namespace App\Http\Requests\Admin;

use App\Enums\JnfStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class ListAdminJnfsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'status' => ['nullable', new Enum(JnfStatus::class)],
            'company_id' => ['nullable', 'integer', 'min:1'],
            'recruitment_season' => ['nullable', 'string', 'max:50'],
            'search' => ['nullable', 'string', 'max:255'],
        ];
    }
}

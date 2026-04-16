<?php

namespace App\Http\Requests\Jnf\Skills;

use Illuminate\Foundation\Http\FormRequest;

class ReplaceSkillsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'skill_ids' => ['required', 'array'],
            'skill_ids.*' => ['integer', 'min:1'],
        ];
    }
}

<?php

namespace App\Http\Requests\Jnf\Rounds;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoundRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'round_category' => ['required', 'string', 'max:100'],
            'round_order' => ['required', 'integer', 'min:1'],
            'round_name' => ['required', 'string', 'max:255'],
            'selection_mode' => ['nullable', 'string', 'max:100'],
            'interview_mode' => ['nullable', 'string', 'max:100'],
            'test_type' => ['nullable', 'string', 'max:100'],
            'duration_minutes' => ['nullable', 'integer', 'min:0'],
            'team_members_required' => ['nullable', 'integer', 'min:0'],
            'rooms_required' => ['nullable', 'integer', 'min:0'],
            'other_screening_notes' => ['nullable', 'string'],
            'is_enabled' => ['nullable', 'boolean'],
            'is_pre_offer_mandatory' => ['nullable', 'boolean'],
        ];
    }
}

<?php

namespace App\Http\Requests\Jnf\Eligibility;

use Illuminate\Foundation\Http\FormRequest;

class UpsertEligibilityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'minimum_cgpa' => ['nullable', 'numeric'],
            'backlogs_allowed' => ['nullable', 'boolean'],
            'max_backlogs' => ['nullable', 'integer', 'min:0'],
            'high_school_percentage_criterion' => ['nullable', 'numeric'],
            'gender_filter' => ['nullable', 'string', 'max:50'],
            'slp_requirement' => ['nullable', 'string', 'max:255'],
            'phd_allowed' => ['nullable', 'boolean'],
            'phd_department_requirement' => ['nullable', 'string'],
            'ma_dhss_allowed' => ['nullable', 'boolean'],
            'other_specific_requirements' => ['nullable', 'string'],
            'programme_rows' => ['nullable', 'array'],
            'programme_rows.*.programme_id' => ['required_with:programme_rows', 'integer'],
            'programme_rows.*.is_eligible' => ['required_with:programme_rows', 'boolean'],
            'programme_rows.*.min_cpi_for_programme' => ['nullable', 'numeric'],
            'discipline_rows' => ['nullable', 'array'],
            'discipline_rows.*.programme_id' => ['required_with:discipline_rows', 'integer'],
            'discipline_rows.*.discipline_id' => ['required_with:discipline_rows', 'integer'],
            'discipline_rows.*.is_eligible' => ['required_with:discipline_rows', 'boolean'],
            'discipline_rows.*.min_cpi_for_discipline' => ['nullable', 'numeric'],
        ];
    }
}

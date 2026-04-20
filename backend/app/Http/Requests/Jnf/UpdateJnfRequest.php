<?php

namespace App\Http\Requests\Jnf;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJnfRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'jnf_number' => ['nullable', 'string', 'max:100'],
            'recruitment_season' => ['nullable', 'string', 'max:50'],
            'job_title' => ['nullable', 'string', 'max:255'],
            'job_designation' => ['nullable', 'string', 'max:255'],
            'department_or_function' => ['nullable', 'string', 'max:255'],
            'role_type' => ['nullable', 'string', 'max:100'],
            'place_of_posting' => ['nullable', 'string', 'max:255'],
            'work_location_mode' => ['nullable', 'string', 'max:50'],
            'expected_hires' => ['nullable', 'integer', 'min:0'],
            'minimum_hires' => ['nullable', 'integer', 'min:0'],
            'tentative_joining_month' => ['nullable', 'string', 'max:50'],
            'job_description_html' => ['nullable', 'string'],
            'additional_job_info' => ['nullable', 'string'],
            'bond_details' => ['nullable', 'string'],
            'registration_link' => ['nullable', 'url'],
            'onboarding_procedure' => ['nullable', 'string'],
            'jd_pdf_path' => ['nullable', 'string', 'max:255'],

            'contacts' => ['nullable', 'array'],
            'eligibility' => ['nullable', 'array'],
            'salary_details' => ['nullable', 'array'],
            'selection_process' => ['nullable', 'array'],
            'additional_details' => ['nullable', 'array'],
            'declaration' => ['nullable', 'array'],
            'required_skills' => ['nullable', 'array'],
        ];
    }
}

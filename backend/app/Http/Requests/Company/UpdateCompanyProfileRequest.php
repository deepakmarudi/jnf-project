<?php

namespace App\Http\Requests\Company;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'website' => ['nullable', 'string', 'max:255'],
            'postal_address' => ['nullable', 'string'],
            'employee_count' => ['nullable', 'integer', 'min:0'],
            'sector' => ['nullable', 'string', 'max:255'],
            'logo_path' => ['nullable', 'string', 'max:255'],
            'category_or_org_type' => ['nullable', 'string', 'max:255'],
            'date_of_establishment' => ['nullable', 'date'],
            'annual_turnover' => ['nullable', 'numeric', 'min:0'],
            'social_media_url' => ['nullable', 'string', 'max:255'],
            'hq_country' => ['nullable', 'string', 'max:100'],
            'hq_city' => ['nullable', 'string', 'max:100'],
            'nature_of_business' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'is_mnc' => ['nullable', 'boolean'],
            'industry_tag_ids' => ['nullable', 'array'],
            'industry_tag_ids.*' => ['integer'],
        ];
    }
}

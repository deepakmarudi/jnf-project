<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:255'],
            'designation' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'mobile_number' => ['required', 'string', 'max:20'],
            'alternative_mobile' => ['nullable', 'string', 'max:20'],
            'password' => ['required', 'string', 'min:8'],
            'confirm_password' => ['required', 'same:password'],
            'company' => ['required', 'array'],
            'company.name' => ['required', 'string', 'max:255'],
            'company.website' => ['nullable', 'string', 'max:255'],
            'company.postal_address' => ['nullable', 'string'],
            'company.employee_count' => ['nullable', 'integer', 'min:0'],
            'company.sector' => ['nullable', 'string', 'max:255'],
            'company.logo_path' => ['nullable', 'string', 'max:255'],
            'company.category_or_org_type' => ['nullable', 'string', 'max:255'],
            'company.date_of_establishment' => ['nullable', 'date'],
            'company.annual_turnover' => ['nullable', 'numeric', 'min:0'],
            'company.social_media_url' => ['nullable', 'string', 'max:255'],
            'company.hq_country' => ['nullable', 'string', 'max:100'],
            'company.hq_city' => ['nullable', 'string', 'max:100'],
            'company.nature_of_business' => ['nullable', 'string'],
            'company.description' => ['nullable', 'string'],
            'company.is_mnc' => ['nullable', 'boolean'],
            'company.industry_tag_ids' => ['nullable', 'array'],
            'company.industry_tag_ids.*' => ['integer'],
        ];
    }
}

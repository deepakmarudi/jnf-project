<?php

namespace App\Http\Requests\Jnf\Salary;

use Illuminate\Foundation\Http\FormRequest;

class UpsertSalaryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'salary_packages' => ['required', 'array'],
            'salary_packages.*.programme_id' => ['nullable', 'integer'],
            'salary_packages.*.salary_structure_mode' => ['nullable', 'string', 'max:50'],
            'salary_packages.*.currency' => ['nullable', 'string', 'max:10'],
            'salary_packages.*.ctc_annual' => ['nullable', 'numeric'],
            'salary_packages.*.base_fixed' => ['nullable', 'numeric'],
            'salary_packages.*.monthly_take_home' => ['nullable', 'numeric'],
            'salary_packages.*.gross_salary' => ['nullable', 'numeric'],
            'salary_packages.*.first_year_ctc' => ['nullable', 'numeric'],
            'salary_packages.*.stocks_options' => ['nullable', 'string'],
            'salary_packages.*.esops_value' => ['nullable', 'numeric'],
            'salary_packages.*.esops_vest_period' => ['nullable', 'string', 'max:100'],
            'salary_packages.*.bond_amount' => ['nullable', 'numeric'],
            'salary_packages.*.bond_duration_months' => ['nullable', 'integer'],
            'salary_packages.*.deductions_text' => ['nullable', 'string'],
            'salary_packages.*.ctc_breakup_text' => ['nullable', 'string'],
            'salary_packages.*.components' => ['nullable', 'array'],
        ];
    }
}

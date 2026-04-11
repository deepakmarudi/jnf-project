<?php

namespace App\Http\Requests\Admin;

use App\Enums\RecruiterStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateRecruiterStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'status' => ['required', new Enum(RecruiterStatus::class)],
        ];
    }
}

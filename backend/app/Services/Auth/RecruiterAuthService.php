<?php

namespace App\Services\Auth;

use App\Models\Company;
use App\Models\Recruiter;
use App\Models\RecruiterOtp;
use App\Enums\RecruiterStatus;
use App\Exceptions\Api\ApiException;
use Illuminate\Support\Facades\Hash;

class RecruiterAuthService
{
    public function register(array $validatedData): array
    {
        $email = $validatedData['email'];

        // 1. Get verified OTP record
        $otpRecord = RecruiterOtp::where('recruiter_email', $email)
            ->whereNotNull('verified_at')
            ->where('expires_at', '>', now())
            ->first();

        if (! $otpRecord) {
            throw new ApiException(
                'OTP_NOT_VERIFIED',
                'Please verify OTP before registration.',
                403
            );
        }

        // 2. Email must be unique
        if (Recruiter::where('email', $email)->exists()) {
            throw new ApiException(
                'EMAIL_ALREADY_EXISTS',
                'Recruiter with this email already exists.',
                409
            );
        }

        // 3. Create or find company
        $companyData = collect($validatedData['company']);
        $companyName = strtolower(trim($companyData->get('name')));

        $company = Company::firstOrCreate(
            ['name' => $companyName],
            [
                'website' => $companyData->get('website'),
                'postal_address' => $companyData->get('postal_address'),
                'employee_count' => $companyData->get('employee_count'),
                'sector' => $companyData->get('sector'),
                'logo_path' => $companyData->get('logo_path'),
                'category_or_org_type' => $companyData->get('category_or_org_type'),
                'date_of_establishment' => $companyData->get('date_of_establishment'),
                'annual_turnover' => $companyData->get('annual_turnover'),
                'social_media_url' => $companyData->get('social_media_url'),
                'hq_country' => $companyData->get('hq_country'),
                'hq_city' => $companyData->get('hq_city'),
                'nature_of_business' => $companyData->get('nature_of_business'),
                'description' => $companyData->get('description'),
                'is_mnc' => $companyData->get('is_mnc'),
            ]
        );

        if ($company->wasRecentlyCreated && $companyData->has('industry_tag_ids')) {
            $company->industryTags()->sync($companyData->get('industry_tag_ids', []));
        }

        // 4. Create recruiter
        $recruiter = Recruiter::create([
            'company_id' => $company->id,
            'full_name' => $validatedData['full_name'],
            'designation' => $validatedData['designation'] ?? null,
            'email' => $email,
            'password' => Hash::make($validatedData['password']),
            'mobile_number' => $validatedData['mobile_number'] ?? null,
            'status' => RecruiterStatus::Active, // Fast-track for development
        ]);

        // 5. Invalidate OTP (single-use enforcement)
        $otpRecord->delete();

        return [
            'recruiter' => $recruiter->toArray(),
            'company' => $company->toArray(),
        ];
    }

    public function login(array $validatedData): array
    {
        $recruiter = Recruiter::where('email', $validatedData['email'])->first();

        if (! $recruiter || ! Hash::check($validatedData['password'], $recruiter->password)) {
            throw new ApiException(
                'INVALID_CREDENTIALS',
                'Invalid credentials provided.',
                401
            );
        }

        if ($recruiter->status !== RecruiterStatus::Active) {
            throw new ApiException(
                'ACCOUNT_NOT_ACTIVE',
                'Your account is not active.',
                403
            );
        }

        $token = $recruiter->createToken('recruiter-auth-token')->plainTextToken;

        return [
            'recruiter' => $recruiter->toArray(),
            'token' => $token,
            'token_type' => 'Bearer',
        ];
    }
}
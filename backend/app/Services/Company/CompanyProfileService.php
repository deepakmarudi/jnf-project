<?php

namespace App\Services\Company;

use Illuminate\Contracts\Auth\Authenticatable;

class CompanyProfileService
{
    public function showCurrent(?Authenticatable $user): array
    {
        return [
            'company' => call_user_func(function() use ($user) {
                if ($user && method_exists($user, 'company')) {
                    $company = $user->company;
                    if ($company) {
                        $company->load('industryTags');
                        $data = $company->toArray();
                        $data['industry_tag_ids'] = $company->industryTags->pluck('id')->toArray();
                        return $data;
                    }
                }
                return null;
            }),
        ];
    }

    public function updateCurrent(array $validatedData, ?Authenticatable $user): array
    {
        if ($user && method_exists($user, 'company') && $user->company) {
            $tagIds = null;
            if (array_key_exists('industry_tag_ids', $validatedData)) {
                $tagIds = $validatedData['industry_tag_ids'];
                unset($validatedData['industry_tag_ids']);
            }

            $user->company->update($validatedData);

            if ($tagIds !== null) {
                $user->company->industryTags()->sync($tagIds);
            }

            $user->company->load('industryTags');
            $data = $user->company->fresh()->toArray();
            $data['industry_tag_ids'] = $user->company->industryTags->pluck('id')->toArray();

            return [
                'company' => $data,
            ];
        }

        return [
            'company' => null,
        ];
    }
}

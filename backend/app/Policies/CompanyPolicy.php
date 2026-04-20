<?php

namespace App\Policies;

use App\Models\Company;
use App\Models\Recruiter;

class CompanyPolicy
{
    public function view(Recruiter $recruiter, Company $company): bool
    {
        return data_get($recruiter, 'company_id') === data_get($company, 'id')
            || data_get($company, 'recruiter_id') === $recruiter->getAuthIdentifier();
    }

    public function update(Recruiter $recruiter, Company $company): bool
    {
        return $this->view($recruiter, $company);
    }
}

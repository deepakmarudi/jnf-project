<?php

namespace App\Policies;

use App\Enums\JnfStatus;
use App\Models\Jnf;
use App\Models\Recruiter;

class JnfPolicy
{
    public function view(Recruiter $recruiter, Jnf $jnf): bool
    {
        return data_get($recruiter, 'company_id') === data_get($jnf, 'company_id');
    }

    public function update(Recruiter $recruiter, Jnf $jnf): bool
    {
        return $this->view($recruiter, $jnf);
    }

    public function delete(Recruiter $recruiter, Jnf $jnf): bool
    {
        return $this->view($recruiter, $jnf)
            && data_get($jnf, 'status') === JnfStatus::Draft->value;
    }

    public function submit(Recruiter $recruiter, Jnf $jnf): bool
    {
        return $this->view($recruiter, $jnf)
            && in_array(
                data_get($jnf, 'status'),
                [
                    JnfStatus::Draft->value,
                    JnfStatus::ChangesRequested->value,
                ],
                true
            );
    }
}

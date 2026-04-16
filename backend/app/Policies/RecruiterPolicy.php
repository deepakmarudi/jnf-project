<?php

namespace App\Policies;

use App\Models\Recruiter;

class RecruiterPolicy
{
    public function view(Recruiter $actor, Recruiter $target): bool
    {
        return $actor->getAuthIdentifier() === $target->getAuthIdentifier();
    }

    public function update(Recruiter $actor, Recruiter $target): bool
    {
        return $this->view($actor, $target);
    }
}

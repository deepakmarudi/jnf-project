<?php

namespace App\Services\Jnf;

use App\Models\Skill;
use App\Models\Jnf;
use App\Exceptions\Api\ApiException;

class SkillService
{
    public function catalog(): array
    {
        $skills = Skill::orderBy('name')->get();

        return [
            'skills' => $skills->map(fn ($s) => [
                'id' => $s->id,
                'label' => $s->name,
            ])->toArray(),
        ];
    }

    public function show(int $jnfId): array
    {
        $jnf = $this->getOwnedJnf($jnfId);

        return [
            'jnf_id' => $jnfId,
            'skill_ids' => $jnf->skills()->pluck('skills.id')->toArray(),
        ];
    }

    public function replace(int $jnfId, array $payload): array
    {
        $jnf = $this->getOwnedJnf($jnfId);

        // Optional: validate skill IDs exist
        if (! empty($payload['skill_ids'])) {
            $count = Skill::whereIn('id', $payload['skill_ids'])->count();

            if ($count !== count($payload['skill_ids'])) {
                throw new ApiException(
                    'INVALID_SKILLS',
                    'One or more skill IDs are invalid.',
                    422
                );
            }
        }

        $jnf->skills()->sync($payload['skill_ids'] ?? []);

        return [
            'jnf_id' => $jnfId,
            'skill_ids' => $jnf->skills()->pluck('skills.id')->toArray(),
        ];
    }

    // 🔒 Ownership check
    private function getOwnedJnf(int $jnfId): Jnf
    {
        return Jnf::where('id', $jnfId)
            ->where('created_by', auth()->id())
            ->firstOrFail();
    }
}
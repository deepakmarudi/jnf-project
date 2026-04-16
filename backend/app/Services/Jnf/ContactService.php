<?php

namespace App\Services\Jnf;

use App\Models\Jnf;
use App\Models\JnfContact;
use App\Exceptions\Api\ApiException;

class ContactService
{
    public function store(int $jnfId, array $payload): array
    {
        $jnf = $this->getOwnedJnf($jnfId);

        $contact = JnfContact::create(array_merge($payload, [
            'jnf_id' => $jnf->id,
        ]));

        return [
            'contact' => $contact->toArray(),
        ];
    }

    public function list(int $jnfId): array
    {
        $jnf = $this->getOwnedJnf($jnfId);

        return [
            'contacts' => $jnf->contacts()->get()->toArray(),
        ];
    }

    public function update(int $contactId, array $payload): array
    {
        $contact = JnfContact::with('jnf')->findOrFail($contactId);

        $this->assertOwnership($contact->jnf);

        $contact->update($payload);

        return [
            'contact' => $contact->fresh()->toArray(),
        ];
    }

    public function delete(int $contactId): void
    {
        $contact = JnfContact::with('jnf')->findOrFail($contactId);

        $this->assertOwnership($contact->jnf);

        $contact->delete();
    }

    // 🔒 Ensure JNF belongs to current recruiter
    private function getOwnedJnf(int $jnfId): Jnf
    {
        return Jnf::where('id', $jnfId)
            ->where('created_by', auth()->id())
            ->firstOrFail();
    }

    // 🔒 Ensure recruiter owns the JNF
    private function assertOwnership(Jnf $jnf): void
    {
        if ($jnf->created_by !== auth()->id()) {
            throw new ApiException(
                'FORBIDDEN',
                'You do not have permission to access this resource.',
                403
            );
        }
    }
}
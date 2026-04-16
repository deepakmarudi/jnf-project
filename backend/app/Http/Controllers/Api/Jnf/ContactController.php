<?php

namespace App\Http\Controllers\Api\Jnf;

use App\Http\Controllers\Controller;
use App\Http\Requests\Jnf\Contacts\StoreContactRequest;
use App\Http\Requests\Jnf\Contacts\UpdateContactRequest;
use App\Services\Jnf\ContactService;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    public function __construct(
        private readonly ContactService $contactService
    ) {
    }

    public function store(StoreContactRequest $request, int $jnf): JsonResponse
    {
        return $this->api()->created(
            $this->contactService->store($jnf, $request->validated())
        );
    }

    public function index(int $jnf): JsonResponse
    {
        return $this->api()->success(
            $this->contactService->list($jnf)
        );
    }

    public function update(
        UpdateContactRequest $request,
        int $contact
    ): JsonResponse {
        return $this->api()->success(
            $this->contactService->update($contact, $request->validated())
        );
    }

    public function destroy(int $contact): JsonResponse
    {
        $this->contactService->delete($contact);

        return $this->api()->noContent();
    }
}
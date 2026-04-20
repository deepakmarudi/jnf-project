<?php

namespace App\Services\Admin;

use App\Models\Admin;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AdminAuthService
{
    public function login(array $validatedData): array
    {
        $admin = Admin::where('email', $validatedData['email'])->first();

        if (! $admin || ! Hash::check($validatedData['password'], $admin->password)) {
            throw ValidationException::withMessages([
                'email' => ['Invalid admin credentials provided.'],
            ]);
        }

        if ($admin->status === 'inactive') {
            throw ValidationException::withMessages([
                'email' => ['This admin account is marked as inactive.'],
            ]);
        }

        $token = $admin->createToken('admin-auth-token')->plainTextToken;

        return [
            'admin' => $admin->toArray(),
            'token' => $token,
            'token_type' => 'Bearer',
            'token_expires_in_minutes' => config('sanctum.expiration', 120),
        ];
    }

    public function me(?Authenticatable $user): array
    {
        return [
            'admin' => $user,
        ];
    }

    public function logout(?Authenticatable $user): array
    {
        if ($user) {
            $user->currentAccessToken()->delete();
        }

        return [
            'admin' => $user,
            'logged_out' => true,
        ];
    }
}

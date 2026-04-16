<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. admins
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('designation')->nullable();
            $table->string('password');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->rememberToken();
            $table->timestamps();
        });

        // 2. recruiters
        Schema::create('recruiters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('companies')->onDelete('cascade');
            $table->string('full_name');
            $table->string('designation')->nullable();
            $table->string('email')->unique();
            $table->string('mobile_number', 30)->nullable();
            $table->string('alternative_mobile', 30)->nullable();
            $table->string('password');
            $table->enum('status', ['pending', 'active', 'blocked'])->default('pending')->index();
            $table->dateTime('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        // 3. recruiter_otps
        Schema::create('recruiter_otps', function (Blueprint $table) {
            $table->id();
            $table->string('recruiter_email');
            $table->string('otp_code', 10);
            $table->dateTime('expires_at');
            $table->dateTime('verified_at')->nullable();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recruiter_otps');
        Schema::dropIfExists('recruiters');
        Schema::dropIfExists('admins');
    }
};

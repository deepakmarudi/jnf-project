<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. companies
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index();
            $table->string('website')->nullable();
            $table->text('postal_address')->nullable();
            $table->integer('employee_count')->nullable();
            $table->string('sector')->nullable();
            $table->string('logo_path')->nullable();
            $table->string('category_or_org_type', 100)->nullable();
            $table->date('date_of_establishment')->nullable();
            $table->decimal('annual_turnover', 18, 2)->nullable();
            $table->string('social_media_url')->nullable();
            $table->string('hq_country', 100)->nullable();
            $table->string('hq_city', 100)->nullable();
            $table->string('nature_of_business')->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_mnc')->default(false);
            $table->timestamps();
        });

        // 2. industry_tags
        Schema::create('industry_tags', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->unique();
            $table->timestamps();
        });

        // 3. company_industry_tags
        Schema::create('company_industry_tags', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('companies')->onDelete('cascade');
            $table->foreignId('industry_tag_id')->constrained('industry_tags')->onDelete('cascade');
            $table->timestamp('created_at')->nullable();
        });

        // 4. programmes
        Schema::create('programmes', function (Blueprint $table) {
            $table->id();
            $table->string('code', 50)->unique();
            $table->string('name');
            $table->enum('level', ['ug', 'pg', 'doctoral', 'other']);
            $table->decimal('duration_years', 4, 1)->nullable();
            $table->string('admission_channel', 100)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 5. disciplines
        Schema::create('disciplines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('programme_id')->constrained('programmes')->onDelete('cascade');
            $table->string('name');
            $table->string('short_name', 50)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 6. skills
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->unique();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('skills');
        Schema::dropIfExists('disciplines');
        Schema::dropIfExists('programmes');
        Schema::dropIfExists('company_industry_tags');
        Schema::dropIfExists('industry_tags');
        Schema::dropIfExists('companies');
    }
};

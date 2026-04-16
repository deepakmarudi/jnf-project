<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. jnfs
        Schema::create('jnfs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('companies')->onDelete('cascade');
            $table->foreignId('created_by')->constrained('recruiters')->onDelete('cascade');
            $table->foreignId('reviewed_by')->nullable()->constrained('admins')->onDelete('set null');
            $table->string('jnf_number', 50)->unique()->nullable();
            $table->string('recruitment_season', 50)->index();
            $table->string('job_title');
            $table->string('job_designation')->nullable();
            $table->string('place_of_posting')->nullable();
            $table->enum('work_location_mode', ['on_site', 'remote', 'hybrid'])->nullable();
            $table->integer('expected_hires')->nullable();
            $table->integer('minimum_hires')->nullable();
            $table->date('tentative_joining_month')->nullable();
            $table->text('job_description_html')->nullable();
            $table->text('additional_job_info')->nullable();
            $table->text('bond_details')->nullable();
            $table->string('registration_link')->nullable();
            $table->text('onboarding_procedure')->nullable();
            $table->string('jd_pdf_path')->nullable();
            $table->enum('status', ['draft', 'submitted', 'under_review', 'changes_requested', 'approved', 'closed'])->default('draft')->index();
            $table->boolean('preview_completed')->default(false);
            $table->dateTime('submitted_at')->nullable();
            $table->dateTime('reviewed_at')->nullable();
            $table->text('review_notes')->nullable();
            $table->timestamps();
        });

        // 2. jnf_contacts
        Schema::create('jnf_contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jnf_id')->constrained('jnfs')->onDelete('cascade');
            $table->enum('contact_type', ['head_hr', 'primary_poc', 'secondary_poc']);
            $table->string('full_name');
            $table->string('designation')->nullable();
            $table->string('email');
            $table->string('mobile_number', 30);
            $table->string('landline', 30)->nullable();
            $table->boolean('is_optional')->default(false);
            $table->timestamps();
        });

        // 3. jnf_skills
        Schema::create('jnf_skills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jnf_id')->constrained('jnfs')->onDelete('cascade');
            $table->foreignId('skill_id')->constrained('skills')->onDelete('cascade');
            $table->timestamp('created_at')->useCurrent();
        });

        // 4. jnf_eligibility_rules
        Schema::create('jnf_eligibility_rules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jnf_id')->constrained('jnfs')->onDelete('cascade');
            $table->decimal('minimum_cgpa', 4, 2)->nullable();
            $table->boolean('backlogs_allowed')->default(false);
            $table->integer('max_backlogs')->nullable();
            $table->decimal('high_school_percentage_criterion', 5, 2)->nullable();
            $table->enum('gender_filter', ['all', 'male', 'female', 'others'])->default('all');
            $table->text('slp_requirement')->nullable();
            $table->boolean('phd_allowed')->default(false);
            $table->text('phd_department_requirement')->nullable();
            $table->boolean('ma_dhss_allowed')->default(false);
            $table->text('other_specific_requirements')->nullable();
            $table->timestamps();
        });

        // 5. jnf_eligibility_programmes
        Schema::create('jnf_eligibility_programmes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jnf_id')->constrained('jnfs')->onDelete('cascade');
            $table->foreignId('programme_id')->constrained('programmes')->onDelete('cascade');
            $table->boolean('is_eligible')->default(true);
            $table->decimal('min_cpi_for_programme', 4, 2)->nullable();
            $table->timestamps();
        });

        // 6. jnf_eligibility_disciplines
        Schema::create('jnf_eligibility_disciplines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jnf_id')->constrained('jnfs')->onDelete('cascade');
            $table->foreignId('programme_id')->constrained('programmes')->onDelete('cascade');
            $table->foreignId('discipline_id')->constrained('disciplines')->onDelete('cascade');
            $table->boolean('is_eligible')->default(true);
            $table->decimal('min_cpi_for_discipline', 4, 2)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jnf_eligibility_disciplines');
        Schema::dropIfExists('jnf_eligibility_programmes');
        Schema::dropIfExists('jnf_eligibility_rules');
        Schema::dropIfExists('jnf_skills');
        Schema::dropIfExists('jnf_contacts');
        Schema::dropIfExists('jnfs');
    }
};

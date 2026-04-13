<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. jnf_salary_packages
        Schema::create('jnf_salary_packages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jnf_id')->constrained('jnfs')->onDelete('cascade');
            $table->foreignId('programme_id')->nullable()->constrained('programmes')->onDelete('cascade');
            $table->enum('salary_structure_mode', ['same_for_all', 'different_per_programme'])->default('same_for_all');
            $table->enum('currency', ['INR', 'USD', 'EUR'])->default('INR');
            $table->decimal('ctc_annual', 18, 2)->nullable();
            $table->decimal('base_fixed', 18, 2)->nullable();
            $table->decimal('monthly_take_home', 18, 2)->nullable();
            $table->decimal('gross_salary', 18, 2)->nullable();
            $table->decimal('first_year_ctc', 18, 2)->nullable();
            $table->decimal('stocks_options', 18, 2)->nullable();
            $table->decimal('esops_value', 18, 2)->nullable();
            $table->string('esops_vest_period', 100)->nullable();
            $table->decimal('bond_amount', 18, 2)->nullable();
            $table->integer('bond_duration_months')->nullable();
            $table->text('deductions_text')->nullable();
            $table->text('ctc_breakup_text')->nullable();
            $table->timestamps();
        });

        // 2. jnf_salary_components
        Schema::create('jnf_salary_components', function (Blueprint $table) {
            $table->id();
            $table->foreignId('salary_package_id')->constrained('jnf_salary_packages')->onDelete('cascade');
            $table->enum('component_type', ['joining_bonus', 'retention_bonus', 'variable_bonus', 'relocation_allowance', 'medical_allowance', 'deduction', 'other']);
            $table->string('component_label');
            $table->decimal('amount', 18, 2);
            $table->enum('currency', ['INR', 'USD', 'EUR'])->default('INR');
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        // 3. jnf_selection_rounds
        Schema::create('jnf_selection_rounds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jnf_id')->constrained('jnfs')->onDelete('cascade');
            $table->enum('round_category', ['ppt', 'resume_shortlisting', 'online_test', 'written_test', 'aptitude_test', 'technical_test', 'group_discussion', 'technical_interview', 'personal_interview', 'psychometric_test', 'medical_test', 'other']);
            $table->integer('round_order');
            $table->string('round_name');
            $table->enum('selection_mode', ['online', 'offline', 'hybrid'])->nullable();
            $table->enum('interview_mode', ['on_campus', 'telephonic', 'video_conferencing'])->nullable();
            $table->enum('test_type', ['aptitude', 'technical', 'written', 'other'])->nullable();
            $table->integer('duration_minutes')->nullable();
            $table->integer('team_members_required')->nullable();
            $table->integer('rooms_required')->nullable();
            $table->text('other_screening_notes')->nullable();
            $table->boolean('is_enabled')->default(true);
            $table->boolean('is_pre_offer_mandatory')->default(false);
            $table->timestamps();
        });

        // 4. jnf_declarations
        Schema::create('jnf_declarations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jnf_id')->constrained('jnfs')->onDelete('cascade');
            $table->boolean('aipc_guidelines_accepted')->default(false);
            $table->boolean('shortlisting_timeline_accepted')->default(false);
            $table->boolean('posted_information_verified')->default(false);
            $table->boolean('ranking_media_consent')->default(false);
            $table->boolean('accuracy_terms_accepted')->default(false);
            $table->boolean('rti_nirf_consent')->default(false);
            $table->string('authorised_signatory_name')->nullable();
            $table->string('authorised_signatory_designation')->nullable();
            $table->date('declaration_date')->nullable();
            $table->string('typed_signature')->nullable();
            $table->boolean('preview_confirmed')->default(false);
            $table->dateTime('email_confirmation_sent_at')->nullable();
            $table->timestamps();
        });

        // 5. jnf_documents
        Schema::create('jnf_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jnf_id')->constrained('jnfs')->onDelete('cascade');
            $table->enum('document_type', ['company_logo', 'jd_pdf', 'brochure', 'other']);
            $table->string('original_name');
            $table->string('stored_name');
            $table->string('file_path');
            $table->string('mime_type', 100);
            $table->bigInteger('file_size');
            $table->enum('uploaded_by_type', ['recruiter', 'admin', 'system']);
            $table->bigInteger('uploaded_by_id');
            $table->timestamp('created_at')->useCurrent();
        });

        // 6. jnf_audit_logs
        Schema::create('jnf_audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jnf_id')->constrained('jnfs')->onDelete('cascade');
            $table->enum('actor_type', ['recruiter', 'admin', 'system']);
            $table->bigInteger('actor_id');
            $table->enum('action', ['created', 'updated', 'autosaved', 'submitted', 'reviewed', 'approved', 'changes_requested', 'closed']);
            $table->json('old_values_json')->nullable();
            $table->json('new_values_json')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jnf_audit_logs');
        Schema::dropIfExists('jnf_documents');
        Schema::dropIfExists('jnf_declarations');
        Schema::dropIfExists('jnf_selection_rounds');
        Schema::dropIfExists('jnf_salary_components');
        Schema::dropIfExists('jnf_salary_packages');
    }
};

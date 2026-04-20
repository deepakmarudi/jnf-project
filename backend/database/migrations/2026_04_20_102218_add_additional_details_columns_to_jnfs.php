<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('jnfs', function (Blueprint $table) {
            // Additional Details Section
            if (!Schema::hasColumn('jnfs', 'application_deadline')) {
                $table->string('application_deadline')->nullable()->after('preferred_interview_date');
            }
            if (!Schema::hasColumn('jnfs', 'required_documents')) {
                $table->text('required_documents')->nullable()->after('application_deadline');
            }
            if (!Schema::hasColumn('jnfs', 'dress_code_or_compliance_notes')) {
                $table->text('dress_code_or_compliance_notes')->nullable()->after('required_documents');
            }
            if (!Schema::hasColumn('jnfs', 'travel_or_accommodation_policy')) {
                $table->text('travel_or_accommodation_policy')->nullable()->after('dress_code_or_compliance_notes');
            }
            if (!Schema::hasColumn('jnfs', 'offer_validity_notes')) {
                $table->text('offer_validity_notes')->nullable()->after('travel_or_accommodation_policy');
            }
            if (!Schema::hasColumn('jnfs', 'additional_instructions_for_cdc')) {
                $table->text('additional_instructions_for_cdc')->nullable()->after('offer_validity_notes');
            }
            if (!Schema::hasColumn('jnfs', 'recruiter_remarks')) {
                $table->text('recruiter_remarks')->nullable()->after('additional_instructions_for_cdc');
            }

            // Salary & Eligibility Metadata
            if (!Schema::hasColumn('jnfs', 'benefits_and_perks')) {
                $table->text('benefits_and_perks')->nullable()->after('recruiter_remarks');
            }
            if (!Schema::hasColumn('jnfs', 'eligible_batch')) {
                $table->string('eligible_batch')->nullable()->after('benefits_and_perks');
            }

            // Workflow Metadata
            if (!Schema::hasColumn('jnfs', 'submission_acknowledged')) {
                $table->boolean('submission_acknowledged')->default(false)->after('preview_completed');
            }
            if (!Schema::hasColumn('jnfs', 'self_edit_used')) {
                $table->boolean('self_edit_used')->default(false)->after('submission_acknowledged');
            }
            if (!Schema::hasColumn('jnfs', 'submission_count')) {
                $table->integer('submission_count')->default(0)->after('self_edit_used');
            }
            if (!Schema::hasColumn('jnfs', 'admin_feedback')) {
                $table->text('admin_feedback')->nullable()->after('submission_count');
            }
        });
    }

    public function down(): void
    {
        Schema::table('jnfs', function (Blueprint $table) {
            $table->dropColumn([
                'application_deadline',
                'required_documents',
                'dress_code_or_compliance_notes',
                'travel_or_accommodation_policy',
                'offer_validity_notes',
                'additional_instructions_for_cdc',
                'recruiter_remarks',
                'benefits_and_perks',
                'eligible_batch',
                'submission_acknowledged',
                'self_edit_used',
                'submission_count',
                'admin_feedback'
            ]);
        });
    }
};

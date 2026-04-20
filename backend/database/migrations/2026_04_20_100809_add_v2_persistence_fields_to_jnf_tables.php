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
            if (!Schema::hasColumn('jnfs', 'department_or_function')) {
                $table->string('department_or_function')->nullable()->after('job_designation');
            }
            if (!Schema::hasColumn('jnfs', 'role_type')) {
                $table->string('role_type')->nullable()->after('department_or_function');
            }
            if (!Schema::hasColumn('jnfs', 'selection_mode')) {
                $table->string('selection_mode')->nullable()->after('tentative_joining_month');
            }
            if (!Schema::hasColumn('jnfs', 'campus_visit_required')) {
                $table->string('campus_visit_required')->nullable()->after('selection_mode');
            }
            if (!Schema::hasColumn('jnfs', 'pre_placement_talk_required')) {
                $table->string('pre_placement_talk_required')->nullable()->after('campus_visit_required');
            }
            if (!Schema::hasColumn('jnfs', 'expected_hiring_timeline')) {
                $table->text('expected_hiring_timeline')->nullable()->after('pre_placement_talk_required');
            }
            if (!Schema::hasColumn('jnfs', 'preferred_ppt_date')) {
                $table->string('preferred_ppt_date')->nullable()->after('expected_hiring_timeline');
            }
            if (!Schema::hasColumn('jnfs', 'preferred_interview_date')) {
                $table->string('preferred_interview_date')->nullable()->after('preferred_ppt_date');
            }
        });

        Schema::table('jnf_eligibility_rules', function (Blueprint $table) {
            if (!Schema::hasColumn('jnf_eligibility_rules', 'minimum_class_12_percentage')) {
                $table->decimal('minimum_class_12_percentage', 5, 2)->nullable()->after('high_school_percentage_criterion');
            }
            if (!Schema::hasColumn('jnf_eligibility_rules', 'slp_requirement')) {
                $table->text('slp_requirement')->nullable()->after('minimum_class_12_percentage');
            }
            if (!Schema::hasColumn('jnf_eligibility_rules', 'phd_allowed')) {
                $table->boolean('phd_allowed')->default(false)->after('slp_requirement');
            }
            if (!Schema::hasColumn('jnf_eligibility_rules', 'phd_department_requirement')) {
                $table->text('phd_department_requirement')->nullable()->after('phd_allowed');
            }
            if (!Schema::hasColumn('jnf_eligibility_rules', 'ma_dhss_allowed')) {
                $table->boolean('ma_dhss_allowed')->default(false)->after('phd_department_requirement');
            }
        });
    }

    public function down(): void
    {
        Schema::table('jnf_eligibility_rules', function (Blueprint $table) {
            $table->dropColumn([
                'slp_requirement',
                'phd_allowed',
                'phd_department_requirement',
                'ma_dhss_allowed'
            ]);
        });

        Schema::table('jnfs', function (Blueprint $table) {
            $table->dropColumn([
                'department_or_function',
                'role_type',
                'selection_mode',
                'campus_visit_required',
                'pre_placement_talk_required',
                'expected_hiring_timeline',
                'preferred_ppt_date',
                'preferred_interview_date'
            ]);
        });
    }
};

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
        Schema::table('jnf_salary_packages', function (Blueprint $table) {
            $table->decimal('ctc', 12, 2)->nullable()->after('programme_id');
            $table->decimal('base_salary', 12, 2)->nullable()->after('ctc');
            $table->decimal('variable_pay', 12, 2)->nullable()->after('base_salary');
            $table->decimal('joining_bonus', 12, 2)->nullable()->after('variable_pay');
            $table->decimal('retention_bonus', 12, 2)->nullable()->after('joining_bonus');
            $table->decimal('performance_bonus', 12, 2)->nullable()->after('retention_bonus');
            $table->decimal('esops', 12, 2)->nullable()->after('performance_bonus');
            $table->decimal('stipend', 12, 2)->nullable()->after('esops');
        });
    }

    public function down(): void
    {
        Schema::table('jnf_salary_packages', function (Blueprint $table) {
            $table->dropColumn([
                'ctc',
                'base_salary',
                'variable_pay',
                'joining_bonus',
                'retention_bonus',
                'performance_bonus',
                'esops',
                'stipend'
            ]);
        });
    }
};

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
        Schema::table('jnf_eligibility_rules', function (Blueprint $table) {
            $table->decimal('minimum_class_10_percentage', 5, 2)->nullable()->after('high_school_percentage_criterion');
            $table->decimal('minimum_class_12_percentage', 5, 2)->nullable()->after('minimum_class_10_percentage');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jnf_eligibility_rules', function (Blueprint $table) {
            $table->dropColumn(['minimum_class_10_percentage', 'minimum_class_12_percentage']);
        });
    }
};

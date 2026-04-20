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
            $table->string('eligible_programme')->nullable()->after('jnf_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jnf_eligibility_rules', function (Blueprint $table) {
            $table->dropColumn('eligible_programme');
        });
    }
};

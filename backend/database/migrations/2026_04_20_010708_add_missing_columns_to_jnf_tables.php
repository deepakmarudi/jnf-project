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
        Schema::table('jnf_declarations', function (Blueprint $table) {
            $table->string('authorised_signatory_email')->nullable()->after('authorised_signatory_designation');
            $table->string('authorised_signatory_phone')->nullable()->after('authorised_signatory_email');
            $table->string('declaration_place')->nullable()->after('authorised_signatory_phone');
            $table->boolean('information_confirmed')->default(false)->after('preview_confirmed');
            $table->boolean('authorization_confirmed')->default(false)->after('information_confirmed');
            $table->boolean('policy_consent_confirmed')->default(false)->after('authorization_confirmed');
        });

        Schema::table('jnf_contacts', function (Blueprint $table) {
            $table->string('preferred_contact_method', 50)->nullable()->after('landline');
            $table->text('remarks')->nullable()->after('preferred_contact_method');
        });

        Schema::table('jnf_eligibility_rules', function (Blueprint $table) {
            $table->boolean('gap_year_allowed')->default(false)->after('other_specific_requirements');
            $table->boolean('history_of_arrears_allowed')->default(false)->after('gap_year_allowed');
        });
    }

    public function down(): void
    {
        Schema::table('jnf_eligibility_rules', function (Blueprint $table) {
            $table->dropColumn(['gap_year_allowed', 'history_of_arrears_allowed']);
        });

        Schema::table('jnf_contacts', function (Blueprint $table) {
            $table->dropColumn(['preferred_contact_method', 'remarks']);
        });

        Schema::table('jnf_declarations', function (Blueprint $table) {
            $table->dropColumn([
                'authorised_signatory_email',
                'authorised_signatory_phone',
                'declaration_place',
                'information_confirmed',
                'authorization_confirmed',
                'policy_consent_confirmed'
            ]);
        });
    }
};

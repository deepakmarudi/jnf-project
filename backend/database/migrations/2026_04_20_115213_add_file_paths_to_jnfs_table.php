<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('jnfs', function (Blueprint $table) {
            if (!Schema::hasColumn('jnfs', 'brochure_path')) {
                $table->string('brochure_path')->nullable()->after('recruiter_remarks');
            }
            if (!Schema::hasColumn('jnfs', 'compensation_attachment_path')) {
                $table->string('compensation_attachment_path')->nullable()->after('brochure_path');
            }
        });
    }

    public function down(): void
    {
        Schema::table('jnfs', function (Blueprint $table) {
            $table->dropColumn(['brochure_path', 'compensation_attachment_path']);
        });
    }
};

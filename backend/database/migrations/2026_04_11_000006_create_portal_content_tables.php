<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. portal_stats
        Schema::create('portal_stats', function (Blueprint $table) {
            $table->id();
            $table->string('metric_key', 100)->unique();
            $table->string('metric_label', 100);
            $table->string('metric_value', 100);
            $table->integer('display_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 2. portal_quick_links
        Schema::create('portal_quick_links', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('url');
            $table->enum('link_type', ['brochure', 'past_recruiters', 'contact', 'policy', 'manual', 'other'])->index();
            $table->integer('display_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('portal_quick_links');
        Schema::dropIfExists('portal_stats');
    }
};

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
        Schema::table('session', function(Blueprint $table) {
            $table->integer('taps')->default(0);
            $table->index('status');
        });

        Schema::table('user_telegram', function(Blueprint $table) {
            $table->dropColumn('taps');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

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
        Schema::table('user_telegram', function (Blueprint $table) {
            $table->bigInteger('airdrop_point')->unsigned()->default(0);
        });
        Schema::table('airdrop_task', function (Blueprint $table) {
            $table->string('checker')->nullable();
            $table->string('checker_options')->nullable();
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

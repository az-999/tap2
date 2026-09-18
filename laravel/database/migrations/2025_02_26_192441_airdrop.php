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
        Schema::table('airdrop_user', function (Blueprint $table) {
            $table->integer('task8_total_earned')->default(0);
            $table->text('task8_friend_list')->nullable();
            $table->tinyInteger('task9_is_get')->default(0);
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

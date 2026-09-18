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
            $table->integer('black_metka_count')->unsigned()->default(0);
            $table->integer('black_metka_finish_at')->unsigned()->nullable();
            $table->integer('shield_count')->unsigned()->default(0);
            $table->integer('shield_finish_at')->unsigned()->nullable();
            $table->integer('ship_craft_count')->unsigned()->default(0);
            $table->integer('ship_upgrade_count')->unsigned()->default(0);
            $table->integer('ship_union_count')->unsigned()->default(0);
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

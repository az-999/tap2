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
        Schema::create('airdrop_user', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('tg_id')->unsigned()->index();
            $table->bigInteger('balance_ap')->unsigned()->default(0);
            $table->bigInteger('balance_bump_token')->unsigned()->default(0);
            $table->boolean('task_ship3_is_done')->default(0);
            $table->boolean('airdrop_is_oferta_accept')->default(0);
            $table->integer('airdrop_is_oferta_start')->unsigned()->nullable();
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

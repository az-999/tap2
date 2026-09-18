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
        Schema::create('session_archive', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('start_at')->unsigned();
            $table->integer('finish_at')->unsigned();
            $table->bigInteger('user_telegram_id')->unsigned();
            $table->bigInteger('amount')->unsigned();
            $table->bigInteger('taps')->unsigned();
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

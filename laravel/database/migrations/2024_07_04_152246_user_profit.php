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
        Schema::create('user_profit', function (Blueprint $table) {
            $table->id();
            $table->integer('tg_id')->unsigned()->index();
            $table->bigInteger('author_id')->unsigned()->index();
            $table->bigInteger('amount')->unsigned();
            $table->integer('time')->unsigned();
            $table->string('comment');
            $table->bigInteger('log_id')->unsigned();
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

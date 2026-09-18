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
        Schema::create('log_balance', function (Blueprint $table) {
            $table->id();
            $table->integer('telegram_chat_id')->unsigned()->index();
            $table->tinyInteger('type')->unsigned()->index();
            $table->bigInteger('amount');
            $table->integer('created_at')->unsigned();
        });
        Schema::table('user_task', function(Blueprint $table) {
            $table->integer('claimed_at')->unsigned()->nullable()->index();
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

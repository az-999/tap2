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
        Schema::table('user_telegram', function(Blueprint $table) {
            $table->integer('session_moon_time')->unsigned()->nullable();
            $table->tinyInteger('session_moon_claimed')->unsigned()->nullable();
            $table->tinyInteger('session_status')->unsigned()->nullable();
            $table->integer('session_start_at')->unsigned()->nullable();
            $table->integer('session_finish_at')->unsigned()->nullable();
            $table->string('task_list')->nullable();
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

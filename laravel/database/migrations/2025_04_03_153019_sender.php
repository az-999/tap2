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
        Schema::connection('mysql_log')->create('sender', function (Blueprint $table) {
            $table->id();
            $table->text('content');
        });

        Schema::connection('mysql_log')->create('sender_queue', function (Blueprint $table) {
            $table->id();
            $table->integer('send_id')->unsigned()->index();
            $table->bigInteger('tg_id')->unsigned();
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

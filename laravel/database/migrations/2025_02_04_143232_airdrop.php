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
        Schema::create('airdrop_whitebit_request', function (Blueprint $table) {
            $table->id();
            $table->integer('task_id')->unsigned();
            $table->string('nik');
            $table->string('description');
            $table->integer('created_at')->unsigned();
            $table->tinyInteger('status')->unsigned();
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

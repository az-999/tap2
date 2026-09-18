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
        Schema::create('mmpro_token', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('tg_id')->index();
            $table->string('address',66)->index();
            $table->string('txid',64);
            $table->integer('created_at')->unsigned();
            $table->decimal('amount',20,8)->nullable();
            $table->decimal('kurs_ton',20,8);
            $table->decimal('kurs_mmpro',20,8);
            $table->tinyInteger('ton')->unsigned();
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

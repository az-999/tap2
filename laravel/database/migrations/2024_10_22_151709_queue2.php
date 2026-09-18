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
        Schema::create('pirate_queue', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('tg_id')->unsigned()->index();
            $table->string('address',66);
            $table->string('txid',64);
            $table->integer('created_at')->unsigned();
            $table->integer('verified_at')->unsigned()->nullable();
            $table->bigInteger('amount')->unsigned();
            $table->tinyInteger('status')->unsigned()->index();
            $table->tinyInteger('product_id')->unsigned()->index();
            $table->string('error')->nullable();
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


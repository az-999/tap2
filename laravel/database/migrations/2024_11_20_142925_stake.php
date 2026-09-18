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
        Schema::create('stake', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('tg_id')->unsigned()->index();
            $table->integer('lootbox_id')->unsigned()->index();
            $table->integer('amount')->unsigned();
            $table->integer('out_amount')->unsigned();
            $table->integer('mint_count')->unsigned();
            $table->integer('duration')->unsigned();
            $table->integer('max_claims')->unsigned();
            $table->integer('claims')->unsigned();
            $table->string('address')->index();
            $table->string('owner')->index();
            $table->string('txid')->index();
            $table->integer('status')->unsigned()->index();
            $table->integer('created_at')->unsigned()->index();
            $table->integer('next_claim')->unsigned()->nullable();
            $table->integer('last_claim')->unsigned()->nullable();
            $table->integer('finished_at')->unsigned()->nullable();
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

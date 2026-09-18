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
        Schema::create('mint_queue', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('tg_id')->unsigned()->index();
            $table->tinyInteger('nft_id')->unsigned();
            $table->tinyInteger('item_id')->unsigned();
            $table->string('address')->index();
            $table->bigInteger('amount')->unsigned();
            $table->string('txid')->index();
            $table->bigInteger('query_id')->index();
            $table->dateTime('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->dateTime('verified_at')->nullable();
            $table->dateTime('completed_at')->nullable();
            $table->tinyInteger('status')->default(0)->index();
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

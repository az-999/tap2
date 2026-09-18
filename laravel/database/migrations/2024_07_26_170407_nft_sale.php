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
        Schema::create('nft_sale', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('tg_id')->unsigned()->index();
            $table->tinyInteger('nft_id')->unsigned()->index();
            $table->string('nft_address')->index();
            $table->string('sale_address')->unique();
            $table->string('sale_price');
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('deployed_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->tinyInteger('status')->default(0);
        });

        Schema::create('nft_history', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('nft_id')->unsigned()->index();
            $table->string('nft_address')->index();
            $table->integer('action');
            $table->string('to_address');
            $table->string('from_address');
            $table->string('price');
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
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

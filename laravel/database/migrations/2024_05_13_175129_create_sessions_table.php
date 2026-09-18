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
        Schema::create('session', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('start_at');
            $table->integer('finish_at');
            $table->tinyInteger('status');
            $table->bigInteger('user_telegram_id');
            $table->decimal('amount', 65, 2);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};

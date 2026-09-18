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
        Schema::create('user_telegram', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('chat_id');
            $table->string('name_first', 64);
            $table->string('name_last', 64);
            $table->string('username', 64);
            $table->bigInteger('ref_id');
            $table->decimal('balance', 65,2);
            $table->string('hash');
            $table->timestamps();
        });

        Schema::create('transaction', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount', 65,2);
            $table->integer('from');
            $table->integer('to');
            $table->string('hash');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_telegrams');
    }
};

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
        Schema::create('wallet_stats', function (Blueprint $table) {
            $table->id();
            $table->string('address')->index();
            $table->string('from');
            $table->string('type');
            $table->string('hash');
            $table->bigInteger('lt')->index();
            $table->bigInteger('value');
            $table->bigInteger('fees');
            $table->bigInteger('income');
            $table->bigInteger('locked');
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

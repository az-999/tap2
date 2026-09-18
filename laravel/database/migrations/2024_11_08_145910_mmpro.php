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
        Schema::table('mmpro_token', function (Blueprint $table) {
            $table->tinyInteger('status')->unsigned()->default(0)->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

    }
};

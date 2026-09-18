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
        Schema::table('task', function (Blueprint $table) {
            $table->integer('life_time')->unsigned()->default(0);
            $table->integer('life_time_start_at')->unsigned()->nullable();
        });
        \Illuminate\Support\Facades\DB::table('task')
            ->where('is_hide', 0)
            ->where('is_active', 1)
            ->update(['life_time_start_at' => time()]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

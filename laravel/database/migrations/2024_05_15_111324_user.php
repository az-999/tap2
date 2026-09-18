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
        Schema::table('user_telegram', function(Blueprint $table) {
            $table->tinyInteger('ref_balance')->default(0);
        });

        \Illuminate\Support\Facades\DB::update('update user_telegram set ref_balance = 0');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

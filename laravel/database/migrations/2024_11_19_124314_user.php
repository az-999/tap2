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
//        Schema::table('user_telegram', function (Blueprint $table) {
//            $table->tinyInteger('has_one_pay')->unsigned()->default(0)->index();
//        });
//        Schema::table('task', function (Blueprint $table) {
//            $table->tinyInteger('has_one_pay')->unsigned()->default(0);
//        });
//        \Illuminate\Support\Facades\DB::statement('update user_telegram set has_one_pay = 2 where 1;');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

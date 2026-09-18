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
        Schema::connection('mysql_log')->create('geo_cache', function (Blueprint $table) {
            $table->id();
            $table->integer('ip')->unsigned()->index();
            $table->string('country');
        });

        Schema::table('task', function (Blueprint $table) {
            $table->string('geo_target')->nullable();
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

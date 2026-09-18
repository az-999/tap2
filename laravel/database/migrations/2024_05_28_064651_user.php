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
            $table->integer('ref_count')->unsigned()->default(0);
        });
        \Illuminate\Support\Facades\DB::statement('alter table user_telegram modify balance bigint unsigned default 0 null;');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

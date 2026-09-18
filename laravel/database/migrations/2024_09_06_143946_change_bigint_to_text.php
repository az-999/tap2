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
        Schema::table('mint_queue', function (Blueprint $table) {
            $table->string('query_id_tmp')->index();
        });

        \Illuminate\Support\Facades\DB::statement("UPDATE mint_queue SET query_id_tmp = query_id;");
        \Illuminate\Support\Facades\DB::statement("ALTER TABLE mint_queue DROP COLUMN query_id;");
        \Illuminate\Support\Facades\DB::statement("ALTER TABLE mint_queue RENAME COLUMN query_id_tmp TO query_id;");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('text', function (Blueprint $table) {
            //
        });
    }
};

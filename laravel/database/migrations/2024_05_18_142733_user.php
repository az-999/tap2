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
        \Illuminate\Support\Facades\DB::statement('alter table transaction modify `from` bigint unsigned null;');
        \Illuminate\Support\Facades\DB::statement('alter table transaction modify `to` bigint unsigned null;');

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

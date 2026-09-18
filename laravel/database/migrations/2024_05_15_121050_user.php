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
        \Illuminate\Support\Facades\DB::statement('alter table user_telegram modify ref_balance bigint default 0 not null;');

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

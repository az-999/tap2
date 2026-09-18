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
        \Illuminate\Support\Facades\DB::statement('alter table task modify language_filter varchar(255) null;');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //

    }
};

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
        \Illuminate\Support\Facades\DB::statement('alter table transaction modify amount decimal(65) null;');
        \Illuminate\Support\Facades\DB::statement('alter table transaction modify `from` int null;');
        \Illuminate\Support\Facades\DB::statement('alter table transaction modify `to` int null;');

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

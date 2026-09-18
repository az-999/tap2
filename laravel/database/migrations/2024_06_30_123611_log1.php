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
        \Illuminate\Support\Facades\DB::connection('mysql_log')->statement('alter table log_balance modify id bigint unsigned auto_increment;');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

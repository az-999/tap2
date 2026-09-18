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
        \Illuminate\Support\Facades\DB::statement('create index mmpro_token_txid_index on mmpro_token (txid);');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

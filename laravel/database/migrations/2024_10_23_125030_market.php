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
        \Illuminate\Support\Facades\DB::statement('create index nft_history_action_index on nft_history (action);');
        \Illuminate\Support\Facades\DB::statement('create index nft_history_created_at_index on nft_history (created_at);');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

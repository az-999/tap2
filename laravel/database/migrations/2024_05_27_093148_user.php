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
        Schema::table('user_task', function(Blueprint $table) {
            $table->index('chat_id');
            $table->index('task_id');
        });
        \Illuminate\Support\Facades\DB::statement('alter table session drop column created_at;');
        \Illuminate\Support\Facades\DB::statement('alter table session drop column updated_at;');
        \Illuminate\Support\Facades\DB::statement('alter table user_telegram drop column created_at;');
        \Illuminate\Support\Facades\DB::statement('alter table user_telegram drop column updated_at;');

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

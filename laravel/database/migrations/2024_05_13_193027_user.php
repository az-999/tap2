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
        \Illuminate\Support\Facades\DB::statement('ALTER TABLE `session` CHANGE `start_at` `start_at` INT NULL;');
        \Illuminate\Support\Facades\DB::statement('ALTER TABLE `session` CHANGE `finish_at` `finish_at` INT NULL;');
        \Illuminate\Support\Facades\DB::statement('ALTER TABLE `session` CHANGE `status` `status` TINYINT NULL;');
        \Illuminate\Support\Facades\DB::statement('ALTER TABLE `session` CHANGE `user_telegram_id` `user_telegram_id` BIGINT NULL;');
        \Illuminate\Support\Facades\DB::statement('ALTER TABLE `session` CHANGE `amount` `amount` DECIMAL(65) NULL;');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

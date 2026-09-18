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
        \Illuminate\Support\Facades\DB::statement('ALTER TABLE `user_telegram` CHANGE `chat_id` `chat_id` BIGINT NULL;');
        \Illuminate\Support\Facades\DB::statement('ALTER TABLE `user_telegram` CHANGE `ref_id` `ref_id` BIGINT NULL;');
        \Illuminate\Support\Facades\DB::statement('ALTER TABLE `user_telegram` CHANGE `name_first` `name_first` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL;');
        \Illuminate\Support\Facades\DB::statement('ALTER TABLE `user_telegram` CHANGE `name_last` `name_last` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL;');
        \Illuminate\Support\Facades\DB::statement('ALTER TABLE `user_telegram` CHANGE `username` `username` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL;');
        \Illuminate\Support\Facades\DB::statement('ALTER TABLE `user_telegram` CHANGE `hash` `token` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL;');
        \Illuminate\Support\Facades\DB::statement('ALTER TABLE `user_telegram` CHANGE `balance` `balance` DECIMAL(65) NULL;');
        \Illuminate\Support\Facades\DB::statement('ALTER TABLE `transaction` CHANGE `hash` `hash` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL;
');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

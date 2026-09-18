<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $users = DB::table('user_telegram')->update(['ref_count' => 0]);
        $users = DB::table('user_telegram')->get()->toArray();
        foreach ($users as $user) {
            $c = DB::table('user_telegram')->where('ref_id', $user->chat_id)->count();
            DB::table('user_telegram')->where('chat_id', $user->chat_id)->update(['ref_count' => $c]);
        }
    }
};

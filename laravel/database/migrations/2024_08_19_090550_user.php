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
        Schema::table('task', function (Blueprint $table) {
            $table->tinyInteger('phone_type')->unsigned()->nullable();
            $table->tinyInteger('is_hide')->unsigned()->default(0);
        });
        $design = [
            67 => 5,
            68 => 5,
            23 => 3,
            11 => 1,
            24 => 2,
            25 => 2,
            59 => 3,
        ];
        $phone_type = [
            67 => 2,
            68 => 2,
        ];
        foreach ($design as $key => $value) {
            DB::table('task')->where('id', $key)->update(['design_id' => $value]);
        }
        foreach ($phone_type as $key => $value) {
            DB::table('task')->where('id', $key)->update(['phone_type' => $value]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

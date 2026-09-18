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
        Schema::table('user_telegram', function (Blueprint $table) {
            $table->tinyInteger('star_wars_oferta')->unsigned()->default(0)->index();
            $table->bigInteger('green_metka_modal_count')->unsigned()->default(0);
            $table->bigInteger('green_metka_modal_flag')->unsigned()->default(0);
            $table->integer('green_metka_modal_last_show_at')->unsigned()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

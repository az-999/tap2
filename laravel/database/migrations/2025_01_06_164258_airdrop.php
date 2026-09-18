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
        Schema::create('airdrop_task', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description', 1000);
            $table->integer('amount')->unsigned();
            $table->tinyInteger('type')->unsigned();
            $table->tinyInteger('is_hide')->unsigned()->default(0);
            $table->integer('count')->unsigned()->default(0);
            $table->text('instruction');
        });

        Schema::create('airdrop_task_user', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('tg_id')->unsigned()->index();
            $table->integer('task_id')->unsigned()->index();
            $table->integer('index')->unsigned();
            $table->integer('amount')->unsigned();
            $table->text('data');
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

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
        Schema::create('task', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->bigInteger('price')->unsigned();
            $table->string('link')->nullable();
            $table->tinyInteger('type')->unsigned();
            $table->tinyInteger('group');
            $table->tinyInteger('status');
            $table->tinyInteger('is_active')->default(1);
            $table->string('icon')->nullable();
            $table->string('checker')->nullable();
            $table->text('checker_options')->nullable();
            $table->integer('sort_index')->nullable();
            $table->integer('limit')->nullable();
            $table->integer('dead_line_at')->nullable();
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

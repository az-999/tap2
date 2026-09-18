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
        $list = [
            [
                "id"       => 38,
                "type"     => "kolo",
                "name"     => "Join KOLO news channel",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'   => \App\Service\TelegramChecker::class,
                    'chat_id' => -1002037091393,
                ],
                'url'      => 'https://t.me/+u5ILqNjPFWBlNDQy',
                'is_active' => 1,
                'limit'     => 200000,
            ],
            [
                "id"       => 39,
                "type"     => "kolo",
                "name"     => "Play KOLO and claim your first points",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => 1,
                ],
                'url'      => 'https://t.me/kolo?start=promo_bump',
                'is_active' => 1,
                'limit'     => 200000,
            ],
        ];

        foreach ($list as $t) {
            $checker_options = $t['checker'];
            unset($checker_options['class']);

            $task = \App\Models\Task::create([
                'name'            => $t['name'],
                'price'           => $t['grant'],
                'link'            => $t['url'],
                'checker'         => $t['checker']['class'],
                'checker_options' => json_encode($checker_options),
                'group'           => ($t['category'] == 'cols') ? 2 : 1,
                'is_active'       => $t['is_active'],
                'type'            => $t['type'],
                'status'          => 0,
            ]);
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

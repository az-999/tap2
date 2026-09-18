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
                "id"       => 34,
                "type"     => "trending",
                "name"     => "Subscribe to Trending Apps on Telegram",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'   => \App\Service\TelegramChecker::class,
                    'chat_id' => -1001967795413,
                ],
                'url'      => 'https://t.me/trendingapps',
                'is_active' => 1,
            ],
            [
                "id"       => 35,
                "type"     => "trending",
                "name"     => "Start Telegram App Center",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => 1,
                ],
                'url'      => 'http://t.me/tapps_bot/app?startapp=promo_bored_bump',
                'is_active' => 1,
            ],
            [
                "id"       => 36,
                "type"     => "artifica",
                "name"     => "Subscribe to Artifica Channel on Telegram",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'   => \App\Service\TelegramChecker::class,
                    'chat_id' => -1002245689162,
                ],
                'url'      => 'https://t.me/+lt9rrU23LpcyYmE8',
                'is_active' => 1,
                'limit'     => 10000,
            ],
            [
                "id"       => 37,
                "type"     => "artifica",
                "name"     => "Start Artifica bot",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => 1,
                ],
                'url'      => 'http://t.me/artifica_bot',
                'is_active' => 1,
                'limit'     => 10000,
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

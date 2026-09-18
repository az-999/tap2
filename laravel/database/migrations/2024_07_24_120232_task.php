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
        \Illuminate\Support\Facades\DB::statement("alter table task modify `group` varchar(10) not null;");

        Schema::table('task', function (Blueprint $table) {
            $table->tinyInteger('checker_front')->nullable();
        });

        $list = [
            [
                "id"       => 26,
                "type"     => "zimabank",
                "name"     => "Subscribe Zima Bank on Telegram",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'   => \App\Service\TelegramChecker::class,
                    'chat_id' => -1001634806745,
                ],
                'url'      => 'https://t.me/zimabank',
                'is_active' => 1,
            ],
            [
                "id"       => 27,
                "type"     => "zimabank",
                "name"     => "Follow Zima Bank on Twitter (X)",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => 1,
                ],
                'url'      => 'https://x.com/zimabank',
                'is_active' => 1,
            ],
            [
                "id"       => 28,
                "type"     => "zimabank",
                "name"     => "Join Zima Bank on Telegram",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'   => \App\Service\TelegramChecker::class,
                    'chat_id' => -1001703569156,
                ],
                'url'       => 'https://t.me/zima_bank',
                'is_active' => 0,
            ],
            [
                "id"       => 29,
                "type"     => "zimabank",
                "name"     => "Start the first banking app in Telegram",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => 1,
                ],
                'url'      => 'https://t.me/zimabank_tg_bot',
                'is_active' => 1,
                'limit' => 50000,
            ],
            [
                "id"       => 30,
                "type"     => "timeton",
                "name"     => "Start Time TON bot",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => 1,
                ],
                'url'      => 'https://t.me/TimeTONbot?start=timetoner',
                'is_active' => 0,
                'limit'     => 200000,
            ],
            [
                "id"       => 31,
                "type"     => "vertus",
                "name"     => "Subscribe Vertus on Telegram",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => 1,
                ],
                'url'      => 'https://t.me/+YE7eU1oeNDYxZjVi',
                'is_active' => 1,
                'limit'     => 200000,
            ],
            [
                "id"       => 32,
                "type"     => "vertus",
                "name"     => "Start Vertus app",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => 1,
                ],
                'url'      => 'http://t.me/vertus_app_bot/app?startapp=1917583394',
                'is_active' => 1,
                'limit'     => 200000,
            ],
            [
                "id"       => 33,
                "type"     => "puppies",
                "name"     => "Start NotBoredPuppies bot",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => 1,
                ],
                'url'      => 'https://t.me/NotBoredPuppies_bot/app?startapp=r_1917583394',
                'is_active' => 1,
                'limit'     => 100000,
            ],
        ];

        foreach ($list as $t) {
            $checker_options = $t['checker'];
            unset($checker_options['class']);

            $type = [
                'telegram'       => 1,
                'twitter'        => 2,
                'telegram_boost' => 3,
            ];
            $keys = array_keys($type);
            if (in_array($t['type'], $keys)) {
                $type_id = $type[$t['type']];
            } else {
                $type_id = 4;
            }
            \App\Models\Task::create([
                'id'              => $t['id'],
                'name'            => $t['name'],
                'price'           => $t['grant'],
                'link'            => $t['url'],
                'checker'         => $t['checker']['class'],
                'checker_options' => json_encode($checker_options),
                'group'           => ($t['category'] == 'cols') ? 2 : 1,
                'is_active'       => $t['is_active'],
                'type'            => $type_id,
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

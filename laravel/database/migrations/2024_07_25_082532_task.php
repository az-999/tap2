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
        $task = [
            [
                "id"       => 11,
                "type"     => "tonkeeper_wallet",
                "name"     => "Connect Tonkeeper wallet",
                "grant"    => 100000000,
                "category" => 'default',
                "checker"  => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => -1001580988846,
                ],
                'url'      => '',
                'is_active' => 1,
            ],
            [
                "id"       => 24,
                "type"     => "tonstakers_telegram",
                "name"     => "Subscribe Tonstakers on Telegram",
                "grant"    => 100000000,
                "category" => 'default',
                "checker"  => [
                    'class'   => \App\Service\TelegramChecker::class,
                    'chat_id' => -1001772298776,
                ],
                'url'      => 'https://t.me/+vTLxdYLe4p5hNDgy',
                'is_active' => 1,
            ],

            [
                "id"       => 25,
                "type"     => "tonstakers_twitter",
                "name"     => "Follow Tonstakers on Twitter (X)",
                "grant"    => 100000000,
                "category" => 'default',
                "checker"  => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => 1,
                ],
                'url'      => 'https://x.com/tonstakers',
                'is_active' => 1,
            ],
            [
                "id"       => 1,
                "type"     => "telegram",
                "name"     => "Subscribe to group MMpro Group on Telegram",
                "grant"    => 10000000,
                "category" => 'default',
                "checker"  => [
                    'class'   => \App\Service\TelegramChecker::class,
                    'chat_id' => -1002213314019,
                ],
                'url'      => 'https://t.me/mmprogroup6',
                'is_active' => 1,
            ],
            [
                "id"       => 2,
                "type"     => "telegram",
                "name"     => "Subscribe to channel MMPro on Telegram",
                "grant"    => 10000000,
                "category" => 'default',
                "checker"  => [
                    'class'   => \App\Service\TelegramChecker::class,
                    'chat_id' => -1001393662912,
                ],
                'url'      => 'https://t.me/marketmakingpro',
                'is_active' => 1,
            ],
            [
                "id"       => 3,
                "type"     => "telegram",
                "name"     => "Subscribe to channel MMPro Trust on Telegram",
                "grant"    => 10000000,
                "category" => 'default',
                "checker"  => [
                    'class'   => \App\Service\TelegramChecker::class,
                    'chat_id' => -1001831732027,
                ],
                'url'      => 'https://t.me/mmprotrust',
                'is_active' => 1,
            ],
            [
                "id"       => 4,
                "type"     => "twitter",
                "name"     => "Follow MMPro Trust on Twitter (X)",
                "grant"    => 10000000,
                "category" => 'default',
                "checker"  => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => -1001831732027,
                ],
                'url'      => 'https://x.com/mmprotrust',
                'is_active' => 1,
            ],
            [
                "id"       => 5,
                "type"     => "twitter",
                "name"     => "Follow Market Making Pro on Twitter (X)",
                "grant"    => 10000000,
                "category" => 'default',
                "checker"  => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => 1,
                ],
                'url'      => 'https://x.com/MarketmakingX',
                'is_active' => 1,
            ],
            [
                "id"       => 6,
                "type"     => "twitter",
                "name"     => "Follow Tonkeeper on Twitter (X)",
                "grant"    => 50000000,
                "category" => 'default',
                "checker"  => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => 1,
                ],
                'url'      => 'https://x.com/tonkeeper',
                'is_active' => 1,
            ],
            [
                "id"       => 7,
                "type"     => "twitter",
                "name"     => "Follow STON.fi on Twitter (X)",
                "grant"    => 50000000,
                "category" => 'default',
                "checker"  => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => 1,
                ],
                'url'      => 'https://x.com/ston_fi',
                'is_active' => 1,
            ],
            [
                "id"       => 8,
                "type"     => "telegram",
                "name"     => "Subscribe to channel STON.fi  on Telegram",
                "grant"    => 50000000,
                "category" => 'default',
                "checker"  => [
                    'class'   => \App\Service\TelegramChecker::class,
                    'chat_id' => -1001580988846,
                ],
                'url'      => 'https://t.me/stonfidex',
                'is_active' => 1,
            ],
            [
                "id"       => 9,
                "type"     => "telegram_boost",
                "name"     => "Boost to channel MMPro Trust on Telegram",
                "grant"    => 50000000,
                "category" => 'default',
                "checker"  => [
                    'class'   => \App\Service\TelegramBoostChecker::class,
                    'chat_id' => -1001831732027,
                ],
                'url'      => 'https://t.me/boost/mmprotrust',
                'is_active' => 1,
            ],
            [
                "id"       => 10,
                "type"     => "telegram_boost",
                "name"     => "Boost to channel MMPro Group Official Annoucements on Telegram",
                "grant"    => 50000000,
                "category" => 'default',
                "checker"  => [
                    'class'   => \App\Service\TelegramBoostChecker::class,
                    'chat_id' => -1001393662912,
                ],
                'url'      => 'https://t.me/boost/marketmakingpro',
                'is_active' => 1,
            ],
            [
                "id"       => 12,
                "type"     => "yescoin",
                "name"     => "Start YesCoin bot",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'         => \App\Service\TrueChecker::class,
                    'chat_id'    => 1,
                ],
                'url'      => 'https://t.me/YesCoin_ebot?start=1860738410',
            ],
            [
                "id"       => 13,
                "type"     => "telegram",
                "name"     => "Subscribe to channel Cointelegraph on Telegram",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'         => \App\Service\TelegramChecker::class,
                    'chat_id'       => -1001072723547,
                ],
                'url'      => 'https://t.me/cointelegraph',
            ],
            [
                "id"       => 14,
                "type"     => "twitter",
                "name"     => "Follow Cointelegraph on Twitter (X)",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => 1,
                ],
                'url'      => 'https://x.com/cointelegraph?s=21',
            ],
            [
                "id"       => 15,
                "type"     => "twitter",
                "name"     => "Follow Yescoin on Twitter (X)",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'         => \App\Service\TrueChecker::class,
                    'chat_id'    => 1,
                ],
                'url'      => 'https://x.com/yescoinfun',
            ],
            [
                "id"       => 16,
                "type"     => "telegram",
                "name"     => "Follow Yescoin on Telegram",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'         => \App\Service\TelegramChecker::class,
                    'chat_id'    => -1002028890123,
                ],
                'url'      => 'https://t.me/yescoin',
            ],
            [
                "id"       => 17,
                "type"     => "ogc",
                "name"     => "Start OGC Community bot",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => 1,
                ],
                'url'      => 'https://t.me/OGCommunityBot?start=bump',
                'is_active' => 1,
            ],
            [
                "id"       => 18,
                "type"     => "hexn",
                "name"     => "Subscribe HEXN on Telegram",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => 1,
                ],
                'url'      => 'https://t.me/+ZXAGHICYSAY4NWYy',
            ],
            [
                "id"       => 19,
                "type"     => "hexn",
                "name"     => "Start HEXN bot",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => 1,
                ],
                'url'      => 'https://t.me/hexn_bot/app?startapp=1df8f2e3-bb5c-4f0f-84e6-936d8f7ca707',
            ],
            [
                "id"       => 20,
                "type"     => "wormfare",
                "name"     => "Subscribe Wormfare on Telegram",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'   => \App\Service\TelegramChecker::class,
                    'chat_id' => -1001914901722,
                ],
                'url'      => 'https://t.me/+aqOozW5e578yYjM0',
                'is_active' => 1,
            ],
            [
                "id"       => 21,
                "type"     => "wormfare",
                "name"     => "Follow Wormfare on Twitter (X)",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => 1,
                ],
                'url'      => 'https://x.com/wormfare',
                'is_active' => 1,
            ],
            [
                "id"       => 22,
                "type"     => "wormfare",
                "name"     => "Start Wormfare Slap bot",
                "grant"    => 100000000,
                "category" => 'cols',
                "checker"  => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => 1,
                ],
                'url'      => 'https://t.me/wormfare_slap_bot?start=r_1165684894',
                'is_active' => 1,
            ],
            [
                "id"        => 23,
                "type"      => "bulls",
                "name"      => "Join the Battle Bulls",
                "grant"     => 100000000,
                "category"  => 'cols',
                "checker"   => [
                    'class'   => \App\Service\TrueChecker::class,
                    'chat_id' => 1,
                ],
                'url'       => 'https://t.me/battle_games_com_bot/start?startapp=frndId385206483',
                'is_active' => 1,
                'limit'     => 553264,
            ],
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
        $img = [
            'wormfare' => '/img/partners/WF_short_logo@4x.png',
            'zimabank' => '/img/partners/zimaImg.png',
            'timeton'  => '/img/partners/timeton.svg',
            'vertus'   => '/img/partners/vertus.png',
            'puppies'  => '/img/partners/puppiesImage.png',
            'bulls'    => '/img/partners/bulls.png',
        ];
        $imgKeys = array_keys($img);

        foreach ($task as $t) {
            $tObject = \App\Models\Task::query()->find($t['id']);
            if (!is_null($tObject)) {
                $tObject->type = $t['type'];
                if (isset($t['limit'])) {
                    $tObject->limit = $t['limit'];
                }
                if (in_array($t['type'], $imgKeys)) {
                    $tObject->icon = $img[$t['type']];
                }
                $tObject->save();
            }
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

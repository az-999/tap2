<?php

namespace App\Http\Controllers;

use App\Models\UserTelegram;
use App\Service\BaseVarDumper;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Number;
use Illuminate\Support\Str;
use Symfony\Component\VarDumper\VarDumper;
use Telegram\Bot\Laravel\Facades\Telegram;
use Telegram\Bot\Api;

class TelegramController extends Controller
{
    public function webhook(Request $request)
    {
        try {
            $data = $request->getContent();
            $data = json_decode($data);
            Log::info(\App\Service\VarDumper::dumpAsString($data));

            if (!property_exists($data, 'message')) {
                return 'ok';
            }
            if (!property_exists($data->message, 'from')) {
                return 'ok';
            }
            if ($data->message->chat->id < 0) {
                return 'ok';
            }

            $user = $this->action($request);
            if ($this->commandStatistic($data, $user)) return 'ok';

            $count_mem = Cache::store('memcached')->get('\App\Console\Commands\calc_all_users::all_users:memcached');
            if (is_null($count_mem)) {
                $count_mem = 0;
            }

            $post_data = [
                'chat_id'                  => $user->chat_id,
                'disable_web_page_preview' => true,
                'text'                     => join("\n\n", [
                    'Hey '.'@' . $user->username.'! 🎉',
                    'Welcome to Bump by MMpro Trust, Tonkeeper,Tonstakers and STON fi📲',
                    'Bump — mini app in Telegram for trading and marketing, based on SocialFi mechanics for investors and users, powered by TON Ecosystem.',
                    'Ways to earn:',
                    '📲 Tap and farm: Gain points for activity.',
                    '👥 Invite friends: Earn extra points from their activities.',
                    '🛒 Bump Store: Buy NFTs via the points, sell for TON and MMPro tokens.',
                    '🎟 Fair Launch & BUMP Ticket: Participate in Fair Launch and get earning from the listings on STON fi',
                    '🎮 Staking and farming: Earn % for lock liquidity (Ton and MMpro tokens) from Tonstakers and STON fi, get NFT for the upcoming space PvE game.',
                    '🎯 Marketing and trading tasks: Complete tasks and get airdrops, rewards and points.',
                    'BUMP Token! How to get it?',
                    '🔄 Exchange NFTs for BUMP tokens - coming soon.',
                ]),
                'reply_markup'             => self::buildKeyboard($user),
            ];

            $response = Telegram::sendMessage($post_data);

            return 'ok';

        } catch ( \Throwable $e ) {

            Log::error($e->getMessage() . "\n" . $e->getTraceAsString());
            \App\Service\TelegramLogger::send($e->getMessage());
            return 'ok';
        }
    }


    public static function test($user)
    {
        $post_data = [
            'chat_id'                  => $user->chat_id,
            'disable_web_page_preview' => true,
            'text'                     => join(" ", [
                'Hey '.'@' . $user->username.'! 🎉',
                'Welcome to Bump by MMpro Trust, Tonkeeper,Tonstakers and STON fi📲',
                'Bump — mini app in Telegram for trading and marketing, based on SocialFi mechanics for investors and users, powered by TON Ecosystem.',
                'Ways to earn:',
                '📲 Tap and farm: Gain points for activity.',
                '👥 Invite friends: Earn extra points from their activities.',
                '🛒 Bump Store: Buy NFTs via the points, sell for TON and MMPro tokens.',
                '🎟 Fair Launch & BUMP Ticket: Participate in Fair Launch and get earning from the listings on STON fi',
                '🎮 Staking and farming: Earn % for lock liquidity (Ton and MMpro tokens) from Tonstakers and STON fi, get NFT for the upcoming space PvE game.',
                '🎯 Marketing and trading tasks: Complete tasks and get airdrops, rewards and points.',
                'BUMP Token! How to get it?',
                '🔄 Exchange NFTs for BUMP tokens - coming soon.',
            ]),
            'reply_markup'             => self::buildKeyboard($user),
        ];

        $response = Telegram::sendMessage($post_data);
    }


    /**
     * @param \stdClass $data
     * @param UserTelegram $user
     * @return bool Отработала фунция успешно?
     */
    private function commandStatistic($data, $user)
    {
        $text = $data->message->text;

        if (Str::startsWith($text, '/stat')) {
            if (in_array($user->chat_id, config('app.stat_user_list'))) {
                $c = \Illuminate\Support\Facades\Cache::store('memcached')->get('\App\Console\Commands\calc_all_users::all_users:memcached') ?? 0;

                $response = Telegram::sendMessage([
                    'chat_id'    => $user->chat_id,
                    'parse_mode' => 'html',
                    'text'       => join("\n\n", [
                        'Кол-во пользователей:',
                        '<b>' . Number::format($c) . '</b>',
                    ]),
                ]);

                return true;
            }
        }

        return false;
    }


    /**
     *
     * @return \App\Models\UserTelegram
     */
    private function action(Request $request)
    {
        $data = $request->getContent();
        $data = json_decode($data);
        $from = $data->message->from;

        $user = \App\Models\UserTelegram::findByTgId($from->id);

        if (is_null($user)) {
            $ref_id = null;
            $text = $data->message->text;
            if (Str::startsWith($text, '/start')) {
                $arr = explode(' ', $text);
                if (count($arr) > 1) {
                    if (Str::start($arr[1], 'ref_')) {
                        $arr2 = explode('_', $arr[1]);
                        $ref_id = (int)$arr2[1];
                    }
                }
            }

            $user = UserTelegram::create([
                'chat_id'       => $from->id,
                'username'      => property_exists($from, 'username') ? $from->username : '',
                'name_first'    => property_exists($from, 'first_name') ? $from->first_name : '',
                'name_last'     => property_exists($from, 'last_name') ? $from->last_name : '',
                'ref_id'        => $ref_id,
            ]);

            if ($ref_id) {
                $user_ref = UserTelegram::findByTgId($ref_id);
                $user_ref->ref_count++;
                $user_ref->save();
            }
        }

        return $user;
    }

    /**
     * @throws JsonException
     */
    private static function buildKeyboard(\App\Models\UserTelegram $user, $url = null): false|string
    {
        if (is_null($url)) {
            $url = config('app.front_url');
        }

        return json_encode([
            'inline_keyboard' => [
                [
                    [
                        'text'    => 'Start Game 🎮',
                        'web_app' => [
                            'url' => $url,
                        ],
                    ],
                ],
                [
                    [
                        'text' => 'Let\'s BUMP Fun 🪙',
                        'url'  => 'https://bumpfun.mmbump.pro',
                    ],
                ],
                [
                    [
                        'text' => 'Join BUMP Channel 🤝',
                        'url'  => 'https://t.me/+QzFoO68cQJI1MTIy',
                    ],
                ],
            ],
        ], JSON_THROW_ON_ERROR);
    }
}

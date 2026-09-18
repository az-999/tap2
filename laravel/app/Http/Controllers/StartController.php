<?php

namespace App\Http\Controllers;

use App\Models\LogBalance;
use App\Models\Session;
use App\Models\SessionArchive;
use App\Models\Transaction;
use App\Models\UserGrant;
use App\Models\UserTelegram;
use App\Service\BaseVarDumper;
use DateTimeImmutable;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Symfony\Component\VarDumper\VarDumper;

class StartController extends Controller
{
    private static function correctGrantDay($user)
    {
        if (!is_null($user->day_grant_first) && is_null($user->day_grant_day)) {
            $v = (int)((time() - $user->day_grant_first) / (60*60*24));
            if ($v == 0) {
                $user->day_grant_day = null;
                $user->day_grant_first = null;
            } else {
                $user->day_grant_day = $v;
            }
            $user->save();
        }
        if (!is_null($user->day_grant_first) && $user->day_grant_day == 0) {
            $v = (int)((time() - $user->day_grant_first) / (60*60*24));
            if ($v > 0) {
                $s = \App\Http\Controllers\GrantDayController::calcAmount($v);
                UserGrant::query()->create([
                    'tg_id'     => $user->chat_id,
                    'author_id' => 0,
                    'amount'    => $s,
                    'time'      => time(),
                    'comment'   => 'Compensation for daily check in',
                ]);
                $user->day_grant_day = $v;
            } else {
                $user->day_grant_day = null;
                $user->day_grant_first = null;
            }
            $user->save();
        }
    }

    public static function getData()
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $data = [
            'info'                     => [
                'farm' => 1000000,
                'taps' => 0,
            ],
            'system_time'              => time(),
            'has_wallet'               => !is_null($user->token),
            'wallet'                   => $user->token,
            'telegram_id'              => $user->chat_id,
            'balance'                  => $user->balance,
            'balance_block'            => $user->balance_block,
            'day_grant_first'          => $user->day_grant_first,
            'day_grant_day'            => $user->day_grant_day,
            'day_grant_prize_possible' => $user->day_grant_day >= ($user->day_grant_prize_round * 84) + 84,
            'current_nft_id_farming'   => $user->current_nft_id_farming,
            'nft' => [
                'market'         => (int)Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'market', 1),
                'bumpstore'      => (int)Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'bumpstore', 1),
                'shipkraft'      => (int)Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'shipkraft', 1),
                'shiplevelup'    => (int)Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'shiplevelup', 1),
                'shipcombine'    => (int)Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'shipcombine', 1),
                'ogpass'         => (int)Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'ogpass', 1),
                'staking'        => (int)Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'staking', 1),
                'spaceshipparts' => (int)Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'spaceshipparts', 1),
                'pirate'         => (int)Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'pirate', 1),
                'voucher'        => (int)Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'voucher', 1),
                'mmprotoken'     => (int)Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'mmprotoken', 1),
            ],

        ];

        if ($user->active_booster) {
            $data['info']['boost'] = 'x' . $user->active_booster;
            $data['info']['active_booster_finish_at'] = $user->active_booster_finish_at;
        }

        return $data;
    }

    public function index(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        // корректирую неверные значения для ежедневных наград
        self::correctGrantDay($user);

        // получаю данные для выдачи
        $data = self::getData();

        // Добавляю полагающиеся награды
        $data['grant'] = \App\Models\UserGrant::query()->select(['id', 'amount', 'comment'])->where('tg_id', $user->chat_id)->get();

        // добавляю информацию по пиратским меткам
        $data = self::setPirate($data);

        // Обнуляю счетчики для модалки
        $user->green_metka_modal_last_show_at = time();
        $user->green_metka_modal_count = 0;
        $user->shield_count = 0;
        $user->save();

        return response()->json($data);
    }

    public static function setPirate($data)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $data['pirate'] = [
            'black_metka_count_grant_all'    => $user->black_metka_count_grant_all,
            'black_metka_count_all'          => $user->black_metka_count_all,
            'shield_count_all'               => $user->shield_count_all,
            'black_metka_count'              => $user->black_metka_count,
            'shield_count'                   => $user->shield_count,
            'star_wars_oferta'               => $user->star_wars_oferta,
            'green_metka_modal_last_show_at' => $user->green_metka_modal_last_show_at,
        ];

        $data['pirate']['green_metka_modal_count'] = $user->green_metka_modal_count;
        if ($user->green_metka_modal_count > 0) {
            if ($user->green_metka_modal_last_show_at > 0) {
                if ($user->green_metka_modal_last_show_at - time() < 60*60*24) {
                    $data['pirate']['green_metka_modal_flag'] = $user->green_metka_modal_flag;
                } else {
                    $data['pirate']['green_metka_modal_flag'] = UserTelegram::GREEN_METKA_MANY_DAYS;
                }
            }
        } else {
            $data['pirate']['green_metka_modal_flag'] = UserTelegram::GREEN_METKA_NO;
        }

        if (is_null($user->black_metka_finish_at)) {
            $data['pirate']['status'] = 'await';
        } else {
            if ($user->black_metka_finish_at < time()) {
                if ($user->black_metka_grant == 0) {
                    $rand = rand(0,100);
                    if ($rand <= 5) $grant = 200;
                    if ($rand > 5 and $rand <= 25) $grant = 250;
                    if ($rand > 25 and $rand <= 75) $grant = 300;
                    if ($rand > 75 and $rand <= 95) $grant = 350;
                    if ($rand > 95 and $rand <= 100) $grant = 400;

                    $level = \App\Http\Controllers\PirateController::getMaxLevelShip($user->token);
                    if ($level > 0) {
                        if ($level > 20) $level = 20;
                        $add = (int)($grant * $level * 0.05);
                        $grant += $add;
                    }

                    $user->black_metka_grant = $grant;
                } else {
                    $grant = $user->black_metka_grant;
                }

                $data['pirate']['status'] = 'finished';
                $data['pirate']['grant'] = $grant * 1000000;
            } else {
                $data['pirate']['status'] = 'inProgress';
                $data['pirate']['black_metka_finish_at'] = $user->black_metka_finish_at;
            }
        }
        if (!is_null($user->shield_finish_at)) {
            $data['pirate']['green_metka_finish_at'] = $user->shield_finish_at;
        }

        $user->save();

        return $data;
    }

}

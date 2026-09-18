<?php

namespace App\Models;

use App\Service\BaseVarDumper;
use App\Service\VarDumper;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * @property int id
 * @property string name_first
 * @property string name_last
 * @property string username
 * @property int    ref_id
 * @property int    chat_id
 * @property int    balance
 * @property string token                       Кошелек TON пользователя
 * @property int    created_at
 * @property int    updated_at
 * @property int    active_booster
 * @property int    active_booster_start_at
 * @property int    active_booster_finish_at
 * @property int    ref_balance
 * @property int    current_nft_id_farming      if от NFT который фармится
 * @property int    balance_farmed              баланс заработанный c фарминга
 * @property int    balance_block               баланс заблокированный
 * @property int    day_grant_first             первое мгновение взятия приза
 * @property int    day_grant_prize_round       кол-во полученных призов за круг 84 дня
 * @property int    day_grant_day               кол-во дней пройденных
 * @property int    session_moon_time           время вылета луны
 * @property int    session_moon_claimed        флаг. Забрана награда за луну? 0/1
 * @property int    session_status              Статус сессии
 * @property int    session_start_at            Время начала сессии
 * @property int    session_finish_at           Время окончания сессии
 * @property int    ship_module_count           Кол-во сминченных запчастей корабля
 * @property int    is_blocked                  Флаг что пользователь заблокирован. По умолчанию = 0
 * @property int    black_metka_count
 * @property int    black_metka_finish_at
 * @property int    black_metka_count_grant_all
 * @property int    shield_count
 * @property int    shield_finish_at
 * @property int    ship_craft_count
 * @property int    ship_upgrade_count
 * @property int    ship_union_count
 * @property int    black_metka_count_all
 * @property int    shield_count_all
 * @property int    black_metka_grant           приз за грабеж в млн (*10e6)
 * @property int    star_wars_oferta
 * @property int    green_metka_modal_count
 * @property int    green_metka_modal_flag
 * @property int    green_metka_modal_last_show_at
 * @property int    airdrop_is_oferta_accept
 * @property int    airdrop_is_oferta_start
 * @property int    airdrop_point               кол-во airdrop поинтов
 * @property int    has_one_pay                 Флаг, был хоть один платеж в BUMP? 0 - нет, 1 - был платеж и более
 * @property string task_list                   список выполненных задач
 */
class UserTelegram extends Authenticatable implements JWTSubject
{
    use HasFactory;

    const TASK_GRANTED = 'granted';
    const TASK_POSSIBLE = 'possible';
    const HAS_ONE_PAY_NO_TRANSACTION = 0;
    const HAS_ONE_PAY_YES_TRANSACTION = 1;
    const HAS_ONE_PAY_ORDER = 2;

    const GREEN_METKA_NO = 0;
    const GREEN_METKA_GRAB5 = 1;
    const GREEN_METKA_GRAB10 = 2;
    const GREEN_METKA_MANY_DAYS = 3;

    protected $fillable = [
        'name_first',
        'name_last',
        'ref_id',
        'username',
        'chat_id',
        'balance',
        'token',
        'active_booster',
        'ref_balance',
        'active_booster_start_at',
        'active_booster_finish_at',
        'ref_balance',
        'current_nft_id_farming',
        'balance_farmed',
        'balance_block',
        'session_moon_time',
        'session_moon_claimed',
        'session_status',
        'session_start_at',
        'session_finish_at',
        'task_list',
        'ship_module_count',
        'is_blocked',
        'black_metka_count',
        'black_metka_finish_at',
        'shield_count',
        'shield_finish_at',
        'ship_craft_count',
        'ship_upgrade_count',
        'ship_union_count',
        'black_metka_grant',
        'shield_count_all',
        'black_metka_count_all',
        'black_metka_count_grant_all',
        'star_wars_oferta',
        'green_metka_modal_count',
        'green_metka_modal_flag',
        'green_metka_modal_last_show_at',
        'airdrop_is_oferta_accept',
        'airdrop_is_oferta_start',
    ];

    public $timestamps = false;
    public $isDebug = false;

    protected $table = 'user_telegram';

    public static function findById($id)
    {
        $user = Cache::get('user.'.$id);
        if (!is_null($user)) {
            return $user;
        } else {
            return parent::find($id);
        }
    }

    public static function findByChatId($chat_id)
    {
        return self::getByChatId($chat_id);
    }

    public static function findByTgId($chat_id)
    {
        return self::getByChatId($chat_id);
    }

    /**
     * @param $chat_id
     * @return \App\Models\UserTelegram
     */
    public static function getByChatId($chat_id)
    {
        $id = Cache::get('user.chat_id.'.$chat_id);
        if (!is_null($id)) {
            $user = Cache::get('user.'.$id);
            if (!is_null($user)) {
                return $user;
            } else {
                return self::query()->where('chat_id', $chat_id)->first();
            }
        } else {
            $user = self::query()->where('chat_id', $chat_id)->first();
            if (is_null($user)) { return null;}
            Cache::put('user.chat_id.'.$user->chat_id, $user->id, config('app.user_cache'));

            return $user;
        }
    }

    public function sendRefTransactions($amount)
    {
        $precent = config('app.referal_system.percent');
        $amount2 = (int)($amount * ($precent /100));
        $ref_id = $this->ref_id;

        $this->ref_balance += $amount2;
        $ret = $this->save();
    }


    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'chat_id' => $this->chat_id,
        ];
    }

    /**
     * @return array
     * [
     *  1 => 'done',
     *  2 => 'granted',
     *  3 => 'granted',
     * ]
     */
    public function getTasks()
    {
        $completed = $this->task_list;
        if (is_null($completed)) {
            $completed1 = [];
        } else {
            if ($completed == '') {
                $completed1 = [];
            } else {
                foreach (explode(',', $completed) as $v) {
                    if (substr($v, 0, 1) == '+') {
                        $id = substr($v, 1);
                        $completed1[$id] = 'granted';
                    }
                }
            }
        }

        return $completed1;
    }

    /**
     * @param array $list
     * [
     *  1 => 'done',
     *  2 => 'granted',
     *  3 => 'granted',
     * ]
     */
    public function setTasks($list)
    {
        $rows = [];
        foreach ($list as $k => $value) {
            if ($value == 'granted') {
                $rows[] = '+' . $k;
            } else {
                $rows[] = $k;
            }
        }
        $this->task_list = join(',', $rows);
    }

    /**
     * @param array $list
     * [
     *  1 => 'done',
     *  2 => 'granted',
     *  3 => 'granted',
     * ]
     */
    public function saveTasks($list)
    {
        $this->setTasks($list);
        $this->save();
    }


    /**
     * @param $amount
     * @param int $type \App\Models\LogBalance::TYPE_*
     * @param bool $force_write
     * @return LogBalance|null
     */
    public function balanceAdd($amount, $type, $force_write = false)
    {
        $this->balance += $amount;
        $this->save();

        $is_active = 1;
        if ($is_active) {
            return LogBalance::create([
                'telegram_chat_id' => $this->chat_id,
                'type'             => $type,
                'amount'           => $amount,
                'created_at'       => time(),
            ]);
        }

        return null;
    }

    /**
     * @param $amount
     * @param int $type \App\Models\LogBalance::TYPE_*
     * @return void
     */
    public function balanceSub($amount, $type)
    {
        $this->balance -= $amount;
        $this->save();

        $is_active = 1;
        if ($is_active) {
            LogBalance::create([
                'telegram_chat_id' => $this->chat_id,
                'type'             => $type,
                'amount'           => -$amount,
                'created_at'       => time(),
            ]);
        }
    }
}


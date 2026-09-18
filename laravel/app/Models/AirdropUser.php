<?php
namespace App\Models;

use App\Http\Middleware\Airdrop;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int    id
 * @property int    tg_id
 * @property int    balance_ap
 * @property int    balance_bump_token
 * @property int    task_ship3_is_done
 * @property int    airdrop_is_oferta_accept
 * @property int    airdrop_is_oferta_start
 * @property int    task2_is_done           Статус третьего задания ship3 level
 * @property int    task2_first_time        Время первой отметки для ежедневных наград
 * @property int    task2_day               День взятой награды, если = 0 то значит не брал никогда
 * @property int    task2_total_earned      Всего заработано денег
 * @property int    task4_total_earned      Всего заработано денег
 * @property string task5_status            Статусы для единичных тасков
 * @property int    task6_total_earned      Всего заработано денег
 * @property int    task6_balance           Баланс с последнего клейма
 * @property int    task7_total_earned
 * @property string task7_nft_address_list  Список mint_queue.id через запятую
 * @property int    task8_total_earned
 * @property string task8_friend_list       Список друзей tg_id
 * @property int    task9_is_get
 * @property int    task9_is_first          Флаг. Сейчас проверять сценарий самого начала? 0 - нет после начала, 1 - сценарий начала. По умолчанию - 1
 * @property int    task10_total_earned
 * @property int    task10_list
 * @property int    task11_total_earned
 * @property int    task11_list
 * @property int    task12_is_get
 * @property int    task13_is_closed
 * @property int    rating
 * @property float  balance_bp
 */
class AirdropUser extends Model
{

    use HasFactory;

    protected $fillable = [
        'tg_id',
        'balance_ap',
        'balance_bump_token',
        'task_ship3_is_done',
        'airdrop_is_oferta_accept',
        'airdrop_is_oferta_start',
        'task2_is_done',
        'task2_first_time',
        'task2_day',
        'task2_total_earned',
        'task5_status',
        'task4_total_earned',
        'task6_total_earned',
        'task6_balance',
        'task7_total_earned',
        'task7_nft_address_list',
        'task8_total_earned',
        'task8_friend_list',
        'task9_is_get',
        'task9_is_first',
        'task10_total_earned',
        'task10_list',
        'task11_total_earned',
        'task11_list',
        'task12_is_get',
        'task13_is_closed',
        'rating',
    ];

    protected $table = 'airdrop_user';

    public $timestamps = false;

    /**
     * @param $td_id
     * @return \App\Models\AirdropUser
     */
    public static function findByTgId($td_id)
    {
        return self::query()->where('tg_id', $td_id)->first();
    }

    /**
     * @param $tg_id
     * @return \App\Models\AirdropUser
     */
    public static function findOrCreate($tg_id, $params = [])
    {
        $i = self::query()->where('tg_id', $tg_id)->first();
        if (is_null($i)) {
            $params['tg_id'] = $tg_id;
            $i = self::query()->create($params);
        }

        return $i;
    }

    public function addTask5($id)
    {
        if (is_null($this->task5_status)) {
            $this->task5_status = json_encode([$id]);
        } else {
            $task5_status = json_decode($this->task5_status, true);
            $task5_status[] = $id;
            $this->task5_status = json_encode($task5_status);
        }
        $this->save();
    }

    /**
     * @return array
     */
    public function getTask5Status()
    {
        if (is_null($this->task5_status)) {
            return [];
        } else {
            return json_decode($this->task5_status, true);
        }
    }

    /**
     * @return array
     */
    public function getTask7List()
    {
        $task7_nft_address_list = $this->task7_nft_address_list;
        if (is_null($task7_nft_address_list)) return [];

        return explode(',', $task7_nft_address_list);
    }

    /**
     * @return array
     */
    public function getTask8List()
    {
        $task8_friend_list = $this->task8_friend_list;
        if (is_null($task8_friend_list)) return [];

        return explode(',', $task8_friend_list);
    }

    /**
     * @return array
     */
    public function getTask10List()
    {
        $task10_list = $this->task10_list;
        if (is_null($task10_list)) return [];

        return explode(',', $task10_list);
    }

    /**
     * @return array
     */
    public function getTask11List()
    {
        $task11_list = $this->task11_list;
        if (is_null($task11_list)) return [];

        return explode(',', $task11_list);
    }

    /**
     * @param $ids array
     */
    public function addTask7List($ids)
    {
        $old = $this->getTask7List();
        $new = array_merge($old, $ids);

        $this->task7_nft_address_list = join(',', $new);
        $this->save();
    }

    /**
     * @param $ids array
     */
    public function addTask8List($ids)
    {
        $old = $this->getTask8List();
        $new = array_merge($old, $ids);

        $this->task8_friend_list = join(',', $new);
        $this->save();
    }

    /**
     * @param $ids array
     */
    public function addTask10List($ids)
    {
        $old = $this->getTask10List();
        $new = array_merge($old, $ids);

        $this->task10_list = join(',', $new);
        $this->save();
    }

    /**
     * @param $ids array
     */
    public function addTask11List($ids)
    {
        $old = $this->getTask11List();
        $new = array_merge($old, $ids);

        $this->task11_list = join(',', $new);
        $this->save();
    }
}

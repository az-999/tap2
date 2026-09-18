<?php

namespace App\Models;

use App\Service\BaseVarDumper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

/**
 * @property int    id
 * @property string name
 * @property int    price
 * @property int    type
 * @property int    group
 * @property int    status
 * @property int    is_active
 * @property string link
 * @property string icon
 * @property string checker
 * @property string checker_options
 * @property string language_filter
 * @property string language_filter_except
 * @property string geo_target
 * @property string geo_target_except
 * @property int    checker_front
 * @property int    sort_index
 * @property int    has_one_pay             Фильр по платежеспособным пользователям, 0 - задание показывается всем, 1 - задание показывается тем пользователям, у кого стоит флаг user_telegram.has_one_pay = 1
 * @property int    limit
 * @property int    dead_line_at
 * @property int    design_id
 * @property int    partner_id
 * @property int    phone_type
 * @property int    is_hide
 * @property int    is_premium
 * @property int    life_time
 * @property int    life_time_start_at
 * @property int    has_wallet              Фильтр по кошельку 0 - задание показываетя всем, 1 - задание показывается если у пользователя установлен кошелек
  */
class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'type',
        'group',
        'status',
        'is_active',
        'link',
        'icon',
        'checker',
        'checker_options',
        'sort_index',
        'limit',
        'dead_line_at',
        'checker_front',
        'design_id',
        'partner_id',
        'phone_type',
        'is_hide',
        'is_premium',
        'language_filter',
        'language_filter_except',
        'life_time',
        'life_time_start_at',
        'geo_target',
        'geo_target_except',
        'has_wallet',
        'has_one_pay',
    ];

    protected $table = 'task';

    public $timestamps = false;

    public static function getAll()
    {
        $all = config('app.task-list');
        $count = Cache::get('task_list_count');
        $ret = [];
        if (!is_null($count)) {
            foreach ($all as $task) {
                $is_active = 1;
                if (isset($task['limit'])) {
                    if (isset($count[$task['id']])) {
                        if ($count[$task['id']] > $task['limit'] ) {
                            $is_active = 0;
                        }
                    }
                }
                $task['is_active'] = $is_active;
                $ret[] = $task;
            }
        } else {
            $ret = $all;
        }

        return $ret;
    }

    public static function getAll2()
    {
        $rows = Task::getAllFromCache();
        $rows2 = [];

        foreach ($rows as $row) {
            $i = $row;
            $i['category'] = $row['group'] == 1 ? 'default' : 'cols';
            $i['grant'] = $row['price'];
            $i['url'] = $row['link'];
            unset($i['link']);
            unset($i['group']);
            unset($i['price']);
            unset($i['checker']);
            unset($i['checker_options']);
            unset($i['sort_index']);
            unset($i['limit']);
            unset($i['dead_line_at']);
            unset($i['status']);
            unset($i['is_hide']);
            $rows2[] = $i;
        }

        return $rows2;
    }

    public static function getAllFromCache()
    {
        $cache = Cache::get('task_list');
        if (is_null($cache)) {
            $rows = Task::query()->where('is_hide', 0)->orderBy('sort_index')->get()->toArray();
            $rows2 = [];
            foreach ($rows as $r) {
                if ($r['language_filter']) {
                    $r['language_filter'] = explode(',', $r['language_filter']);
                } else {
                    $r['language_filter'] = [];
                }
                if (!is_null($r['language_filter_except'])) {
                    $r['language_filter_except'] = explode(',', $r['language_filter_except']);
                } else {
                    $r['language_filter_except'] = [];
                }
                if ($r['geo_target']) {
                    $r['geo_target'] = explode(',', $r['geo_target']);
                } else {
                    $r['geo_target'] = [];
                }
                if ($r['geo_target_except']) {
                    $r['geo_target_except'] = explode(',', $r['geo_target_except']);
                } else {
                    $r['geo_target_except'] = [];
                }
                $rows2[] = $r;
            }
            Cache::put('task_list', $rows2);
        } else {
            $rows = $cache;
        }

        return $rows;
    }

    public static function clearCache()
    {
        Cache::forget('task_list');
    }
}


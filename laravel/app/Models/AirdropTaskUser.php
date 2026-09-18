<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int    id
 * @property int    tg_id       TGID пользователя
 * @property int    task_id     airdrop_task.id
 * @property int    index       порядковый индекс задачи, если их несколько
 * @property int    amount      Кол-во накопленных поинтов за таск
 * @property string data        Данные по выполнению задачи
 */
class AirdropTaskUser extends Model {

    use HasFactory;

    protected $fillable = [
        'tg_id',
        'task_id',
        'index',
        'amount',
        'data',
    ];

    protected $table = 'airdrop_task_user';

    public $timestamps = false;
}

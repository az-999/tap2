<?php

namespace App\Models;

use App\Service\BaseArrayHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 * @property int    id
 * @property int    tg_id
 * @property string address        hex 0:
 * @property int    amount         сколько монет MMPRO нужно начислить в соответствии с курсом.
 * @property string txid           hex
 * @property int    created_at
 * @property float  kurs_ton
 * @property float  kurs_mmpro
 * @property int    ton             Сколько тонов пользователь скинул
 * @property int    status          статус
 */
class MmproToken extends Model
{
    const  STATUS_SUCCESS = 1;
    const  STATUS_FAIL = 2;
    const  STATUS_ORDER = 0;

    use HasFactory;

    protected $table = 'mmpro_token';

    protected $fillable = [
        'tg_id',
        'address',
        'amount',
        'txid',
        'created_at',
        'kurs_ton',
        'kurs_mmpro',
        'ton',
        'status',
    ];

    public $timestamps = false;

}

<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int    id
 * @property int    created_at
 * @property int    tg_id
 * @property int    status      статус модерации 1 - успешно, 2 - не успешно (в поле description описание)
 * @property string nik
 * @property string description описание причины отказа
 */
class AirdropWhitebitRequest extends Model
{
    CONST STATUS_SUCCESS = 1;
    CONST STATUS_REJECT = 2;
    CONST STATUS_CLAIMED = 3;

    use HasFactory;

    protected $fillable = [
        'nik',
        'created_at',
        'status',
        'nik',
        'description',
        'tg_id',
    ];

    protected $table = 'airdrop_whitebit_request';

    public $timestamps = false;

}

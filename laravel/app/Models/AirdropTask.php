<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int    id
 * @property int    amount      награда за таск
 * @property int    type        тип таска 1 - одноразовый, 2 - конечный, 3 - бесконечный
 * @property int    is_hide     флаг, скрыта задача? 1 - скрыта и не показывается, 0 - показывается
 * @property int    count       Кол-во заданий возможных если type=2
 * @property string name        Название
 * @property string description Описание
 * @property string instruction Инструкция
 * @property string checker
 * @property string checker_options
 */
class AirdropTask extends Model {

    use HasFactory;

    protected $fillable = [
        'amount',
        'type',
        'name',
        'count',
        'description',
        'instruction',
        'is_hide',
        'checker',
        'checker_options',
    ];

    protected $table = 'airdrop_task';

    public $timestamps = false;

    public static function clearCache()
    {

    }
}

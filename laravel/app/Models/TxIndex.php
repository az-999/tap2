<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $hash
 * @property int $lt
 **/
class TxIndex extends Model {
    use HasFactory;

    public $timestamps = false;

    protected $table = 'tx_index';

    protected $fillable = ['hash', 'lt'];

    public static function getLast() {
        return self::orderBy('id', 'desc')->first();
    }

    public static function isExists($hash, $lt) {
        return self::where('hash', $hash)->where('lt', $lt)->exists();
    }

    public static function add($hash, $lt) {
        self::create(['hash' => $hash, 'lt' => $lt]);
    }
}

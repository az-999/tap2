<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

/**
 * @property int    id
 * @property string name    Название
 * @property string content Описание
 */
class Config extends Model
{
    const PREFIX = 'Config_';

    use HasFactory;

    protected $fillable = [
        'name',
        'content',
    ];

    protected $table = 'config';

    public $timestamps = false;

    public static function get($name, $default = null)
    {
        $v = Cache::get(self::PREFIX . $name);
        if ($v === false) {
            $row = self::query()->where('name', $name)->first();
            if (is_null($row)) {
                Cache::put(self::PREFIX . $name, $default);

                return $default;
            } else {
                Cache::put(self::PREFIX . $name, $row->content);

                return $row->content;
            }
        }

        return $v;
    }

    public static function set($name, $value)
    {
        self::query()->where('name', $name)->update(['content' => $value]);
        Cache::put(self::PREFIX . $name, $value);
    }
}

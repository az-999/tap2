<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int    id
 * @property int    tg_id
 * @property text   ids
 */
class AirdropKols extends Model
{

    use HasFactory;

    protected $fillable = [
        'tg_id',
        'ids',
    ];

    protected $table = 'airdrop_kols';

    public $timestamps = false;

    /**
     * @param $td_id
     * @return \App\Models\AirdropKols
     */
    public static function findByTgId($td_id)
    {
        return self::query()->where('tg_id', $td_id)->first();
    }

    /**
     * @param $tg_id
     * @return \App\Models\AirdropKols
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

    public function getIds()
    {
        if (is_null($this->ids)) {
            return [];
        }

        return explode(',', $this->ids);
    }

    public function addIds($ids)
    {
        $new = array_merge($this->getIds(), $ids);

        $this->ids = join(',', $new);
        $this->save();

        return true;
    }
}

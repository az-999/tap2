<?php

namespace App\Models;

use App\Service\BaseArrayHelper;
use Catchain\Ton\Address\Address;
use DB;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 * @property int    $id
 * @property int    $tg_id
 * @property int    $nft_id
 * @property string $nft_address
 * @property string $sale_address
 * @property string $sale_price
 * @property int    $created_at
 * @property int    $deployed_at
 * @property int    $completed_at
 * @property int    $status
 * @property string $name
 * @property string $description
 * @property string $image
 * @property string $owner
 * @property string $collection_name
 * @property string $collection_address
 */
class NftSale extends Model
{
    use HasFactory;

    const SALE_CREATED = 0;
    const SALE_ACTIVE = 1;
    const SALE_COMPLETED = 2;
    const SALE_CANCELLED = 3;
    const SALE_REJECTED = 4;

    protected $table = 'nft_sale';

    protected $fillable = [
        'tg_id',
        'nft_id',
        'nft_address',
        'sale_address',
        'sale_price',
        'created_at',
        'deployed_at',
        'completed_at',
        'status',
        'name',
        'description',
        'image',
        'owner',
        'collection_name',
        'collection_address',
    ];

    public $timestamps = false;

    public static function list($offset, $count, $sortBy = 'nft_id', $sortOrder = 'desc', $address = '', $name = null)
    {
        $c = self::query()
            ->select('*', DB::raw('CAST(`sale_price` AS DECIMAL(10,8)) AS `sale_price_sort`'))
            ->where('status', self::SALE_ACTIVE);

        if ($address && $address != '') {
            $c = $c->where('owner', $address);
        }
        if ($sortBy === 'sale_price') {
            $sortBy = 'sale_price_sort';
        } else if ($sortBy === '') {
            $sortBy = 'nft_id';
        }
        if ($sortOrder === '') {
            $sortOrder = 'desc';
        }
        if ($name) {
            $c->where('name', 'like', '%' . $name . '%');
        }

        return $c->orderBy($sortBy, $sortOrder)->skip($offset)->limit($count)->get()->toArray();
    }

    public static function isNftOnSale($address) {
        $a = Address::parse($address);

        return self::where('nft_address', 'in', [
                $a->toString(true, true, true, false),
                $a->toString(true, true, false, false),
            ])->where('status', self::SALE_ACTIVE)->exists();
    }
}

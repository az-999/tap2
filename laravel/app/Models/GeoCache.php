<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 * @property int    ip
 * @property string country
 */
class GeoCache extends Model {

    use HasFactory;
    protected $connection = 'mysql_log';

    protected $fillable = [
        'ip',
        'country',
    ];

    protected $table = 'geo_cache';

    public $timestamps = false;
}

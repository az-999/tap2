<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 * @property string name
 * @property string key
 * @property int    ref_id
 * @property string code
 */
class Partner extends Model {

    use HasFactory;

    protected $fillable = [
        'name',
        'key',
        'ref_id',
        'code',
    ];

    protected $table = 'partners';

    public $timestamps = false;
}

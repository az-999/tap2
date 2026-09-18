<?php

namespace App\Service\ip;

use App\Models\GeoCache;
use Illuminate\Support\Facades\Http;

/**
 * https://ip-api.com/docs/api:json
 */
class IpApiCom
{

    public static function convert($ip)
    {
        $response = Http::get('http://ip-api.com/json/' . $ip);
        $body = json_decode($response->body(), true);

        if (isset($body['countryCode'])) {
            return $body['countryCode'];
        } else {
            return null;
        }
    }
}

<?php

namespace App\Service\ip;

use App\Models\GeoCache;

class Main
{
    /**
     * @param string $ip_string
     * @param string $class
     * @return string|null
     */
    public static function convert($ip_string, $class)
    {
        $ipInt = ip2long($ip_string);

        /** @var \App\Models\GeoCache $row */
        $row = GeoCache::query()->where('ip', $ipInt)->first();

        if (!$row) {
            $country = $class::convert($ip_string);
            $row = GeoCache::query()->create([
                'country' => strtolower($country),
                'ip'      => $ipInt,
            ]);
        }

        return strtoupper($row->country);
    }
}

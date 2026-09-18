<?php

namespace App\Service\checker;

use App\Service\VarDumper;
use Extraton\TonClient\Exception\LogicException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 *
 */
class Meerkat
{
    public $apiKey = '698c1e3f-dd65-4e12-8542-68fbaec2ee5c';
    public $user_id;
    public $url = 'https://tma.timesoul.com/partner-api/user/{telegram_id}';

    public function __construct($params)
    {
        foreach ($params as $key => $value) {
            $this->$key = $value;
        }
    }

    public static function getInstance($params = [])
    {
        return new self($params);
    }

    /**
     * @return bool
     */
    public function check()
    {
        $url = $this->url;
        $url = str_replace('{telegram_id}', $this->user_id, $url);
        $response = Http::acceptJson()
            ->get($url, ['token' => $this->apiKey]);

        if ($response->status() != 200) {
            Log::error('Http error \App\Service\checker\Meerkat '. VarDumper::dumpAsString($this), ['\App\Service\checker\Meerkat']);
            return false;
        }

        $data = json_decode($response->body(), true);

//        return $data['registered'];
        return $data['completedTasks'];
    }
}

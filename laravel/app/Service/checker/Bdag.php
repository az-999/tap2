<?php

namespace App\Service\checker;

use App\Service\VarDumper;
use Extraton\TonClient\Exception\LogicException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 *
 */
class Bdag
{
    public $apiKey = 'tapminermU9zon71qd7aon3zNG9Kr042FEa9LSyLlzyJrp564vroXv5lQPMgaJxUHFEslLHScMjnyMpsGbkR9Xfj6MMImDGdaA4HxHuVRM9uDpirtnQ03bbXQH8Xu8kS';
    public $headerPartner = 'mmpro';
    public $user_id;
    public $url = 'https://api.tapper.apitransfer.space/v1/integrations/checks/{telegram_id}/';

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
        $response = Http::withHeaders(['x-api-key' => $this->apiKey])
            ->withHeader('x-api-partner', $this->headerPartner)
            ->acceptJson()
            ->get($url);

        if ($response->status() != 200) {
            Log::error('Http error \App\Service\checker\Booms '. VarDumper::dumpAsString($this), ['\App\Service\checker\Booms']);
            return false;
        }

        $data = json_decode($response->body(), true);

        return $data['is_active'];
    }
}

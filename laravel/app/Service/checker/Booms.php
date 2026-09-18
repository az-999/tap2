<?php

namespace App\Service\checker;

use App\Service\VarDumper;
use Extraton\TonClient\Exception\LogicException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 *
 */
class Booms
{
    public $token;
    public $user_id;
    public $url = 'https://api.booms.io/v1/auth/protected/user/status';

    public function __construct($params)
    {
        foreach ($params as $key => $value) {
            $this->$key = $value;
        }
    }

    /**
     * @return bool
     */
    public function check()
    {
        $response = Http::withHeaders(['X-Api-Key' => $this->token])
            ->acceptJson()
            ->withBody(json_encode(['tg_user_id' => $this->user_id]))
            ->post($this->url);

        if ($response->status() != 200) {
            Log::error('Http error \App\Service\checker\Booms '. VarDumper::dumpAsString($this), ['\App\Service\checker\Booms']);
            return false;
        }

        $data = json_decode($response->body(), true);

        return $data['status'];
    }
}

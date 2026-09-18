<?php

namespace App\Service;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class TonhubAPI
{
    const SANDBOX_URL = 'https://sandbox.tonhubapi.com';
    const PRODUCTION_URL = 'https://tonhubapi.com';

    private string $url;

    public function __construct($sandbox = true)
    {
        $this->url = $sandbox ? self::SANDBOX_URL : self::PRODUCTION_URL;
    }

    public function getAddressInformation($address)
    {
        $client = new Client();
        $url =  $this->url . '/getAddressInformation?address=' . $address;
        Log::info($url);
        $response = $client->request('GET', $url);
        $body = json_decode($response->getBody(), true);
        Log::info($body);
        if (!$body['ok']) {
            throw new \Exception($body['error']);
        }

        return $body['result'];
    }

    public function getTransactions($address, $limit = 1000, $lt = "0", $hash = "")
    {
        $client = new Client();
        $url = $this->url . '/getTransactions?address=' . $address . '&limit=' . $limit . '&archived=1';
        if ($lt !== "0" && $hash !== "") {
            $url .= '&lt=' . $lt . '&hash=' . bin2hex(base64_decode($hash));
        }

        $response = $client->request('GET', $url);
        $body = json_decode($response->getBody(), true);
        if (!$body['ok']) {
            throw new \Exception($body['description']);
        }

        return $body['result'];
    }
}

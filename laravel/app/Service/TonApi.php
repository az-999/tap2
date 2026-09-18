<?php

namespace App\Service;


use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;
use Log;

class TonApi
{
    const TESTNET_URL = 'https://testnet.tonapi.io/v2';
    const MAINNET_URL = 'https://tonapi.io/v2';

    private $client;
    private $uri;

    public function __construct($testnet = true)
    {
        $this->client = new Client([
            'base_uri' => $testnet ? self::TESTNET_URL : self::MAINNET_URL,
        ]);
        $this->uri = $testnet ? 'https://testnet.tonapi.io' : 'https://tonapi.io';
    }


    /**
     * @param bool $testnet
     * @return TonApi
     */
    public static function getInstance($testnet = false)
    {
        return new TonApi($testnet);
    }

    public function getAccount($address)
    {
        $response = $this->client->request('GET', 'v2/blockchain/accounts/' . $address , [
            'query' => [
                'address' => $address,
            ],
            'headers' => [
                'Authorization' => 'Bearer ' . config('app.tonapi-key'),

            ],
        ]);

        return json_decode($response->getBody(), true);
    }

    public function getTransaction($hash)
    {
        $response = $this->client->request('GET', 'v2/blockchain/transactions/' . $hash, [
            'headers' => [
                'Authorization' => 'Bearer ' . config('app.tonapi-key'),
            ],
        ]);

        return json_decode($response->getBody(), true);
    }

    public function _get($path, $params = [])
    {
        $uri = $this->uri;
        $response = Http::withHeader('Authorization', 'Bearer ' . config('app.tonapi-key'))
            ->get($uri . '/' .$path, $params);

        return $response;
    }

    public function get($path, $params = [])
    {
        $response = $this->_get($path, $params);

        return json_decode($response->body(), true);
    }

    public function getTransactionByMessageHash($hash)
    {
        $response = $this->client->request('GET', 'v2/blockchain/messages/' . $hash . '/transaction', [
            'headers' => [
                'Authorization' => 'Bearer ' . config('app.tonapi-key'),
            ],
        ]);

        return json_decode($response->getBody(), true);
    }


    public function getTransactions($address, $limit = 100, $beforeLt = 0, $afterLt = 0, $order = 'desc')
    {
        $uri = 'v2/blockchain/accounts/' . $address . '/transactions?limit=' . $limit;
        if ($beforeLt > 0) {
            $uri .= '&before_lt=' . $beforeLt;
        }

        if ($afterLt > 0) {
            $uri .= '&after_lt=' . $afterLt;
        }

        if ($order === 'desc') {
            $uri .= '&sort_order=desc';
        } else {
            $uri .= '&sort_order=asc';
        }

        $response = $this->client->request('GET', $uri, [
        'headers' => [
            'Authorization' => 'Bearer ' . config('app.tonapi-key'),
        ]]);

        return json_decode($response->getBody(), true);
    }

    public function getNfts($address, $collection = null)
    {
        $query = null;
        if ($collection) {
            $query = [
                'collection' => $collection,
            ];
        }
        $response = $this->client->request('GET', '/v2/accounts/' . $address . '/nfts', [
            'query' => $query,
            'headers' => [
                'Authorization' => 'Bearer ' . config('app.tonapi-key'),
            ],
        ]);

        return json_decode($response->getBody(), true);
    }

    public function getNft($address)
    {
        $response = $this->client->request('GET', '/v2/nfts/' . $address, [
        'headers' => [
            'Authorization' => 'Bearer ' . config('app.tonapi-key'),
        ]]);

        return json_decode($response->getBody(), true);
    }

    public function getTraces($txid) {
        $response = $this->client->request('GET', '/v2/traces/' . $txid . '', [
            'headers' => [
                'Authorization' => 'Bearer ' . config('app.tonapi-key'),
            ],
        ]);

        return json_decode($response->getBody(), true);
    }

    public function getNftsBulk($addresses) {
        $response = $this->client->request('POST', '/v2/nfts/_bulk', [
            'headers' => [
                'Authorization' => 'Bearer ' . config('app.tonapi-key'),
            ],
            'json' => [
                'account_ids' => $addresses
            ]
        ]);

        return json_decode($response->getBody(), true);
    }

    public function getMintedNftsImages($txid) {
        $trace = $this->getTraces($txid);
        Log::info('getMintedNfts: trace: ' . VarDumper::dumpAsString($trace));
        $addresses = $this->resolveNftAddresses($trace);
        Log::info('getMintedNfts: addresses: ' . VarDumper::dumpAsString($addresses));
        $nfts = $this->getNftsBulk($addresses);
        Log::info('getMintedNfts: nfts: ' . VarDumper::dumpAsString($nfts));
        if (!isset($nfts['nft_items'])) {
            return [];
        }

        $metadatas = [];
        foreach ($nfts['nft_items'] as $nft) {
            Log::info('getMintedNfts: nft: ' . VarDumper::dumpAsString($nft));
            if (!isset($nft['metadata'])) {
                continue;
            }

            if (!isset($nft['metadata']['image'])) {
                continue;
            }

            $metadatas[] = $nft['metadata']['image'];
        }

        Log::info('getMintedNfts: metadatas: ' . VarDumper::dumpAsString($metadatas));

        return $metadatas;
    }

    private function resolveNftAddresses($trace) {
        $arr = [];
        if (!empty($trace['interfaces']) && $trace['interfaces'][0] == 'nft_item') {
            $arr[] = $trace['transaction']['in_msg']['destination']['address'];
        }

        if (!empty($trace['children'])) {
            foreach ($trace['children'] as $child) {
                $arr = array_merge($arr, $this->resolveNftAddresses($child));
            }
        }

        return $arr;
    }
}

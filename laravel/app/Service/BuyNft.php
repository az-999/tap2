<?php
namespace App\Service;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;
use \Illuminate\Support\Facades\Log;

class BuyNft
{
    public $url;
    public $jwt;
    public $address;
    public $id;
    public $hash;

    public function __construct($url, $jwt, $address, $id)
    {
        $this->url = $url;
        $this->jwt = $jwt;
        $this->address = $address;
        $this->id = $id;
        $this->signData();
    }

    public function signData()
    {
        $data = [
            'address' => $this->address,
            'nft_id'  => $this->id,
            'time'    => ceil(time() / 60),
        ];

        ksort($data);
        $str = '';
        foreach ($data as $key => $value) {
            $str .= $key.'='.$value . '&';
        }

        $str = rtrim($str, '&');
        Log::info('sign: ' . $str . ' ' . config('app.sign.key'));
        $this->hash = hash_hmac('sha256', $str, config('app.sign.key'));
    }

    public function send()
    {
        $client = new Client();
        Log::info('buy: ' . $this->url . '/buy');
        $response = $client->request('POST', $this->url . '/buy', [
            'headers' => [
                'Authorization' => 'Bearer '.$this->jwt,
            ],
            'json' => [
                'address' => $this->address,
                'nft_id'  => $this->id,
                'hash'    => $this->hash,
            ],
        ]);
        return $response;
    }

    public function buyBumpticket() {
        $client = new Client();
        Log::info('putNftOnSale: ' . $this->url . '/bumpticket/buy');
        $response = $client->request('GET', $this->url . '/bumpticket/buy', [
            'headers' => [
                'Authorization' => 'Bearer '.$this->jwt,
            ],
        ]);
        $result = json_decode($response->getBody(), true);
        if ($response->getStatusCode() == 200) {
            return $result;
        }

        throw new \Exception($result['message']);
    }

    public function putNftOnSale($address, $price, $owner)
    {
        $client = new Client();
        Log::info('putNftOnSale: ' . $this->url . '/sale/put');
        $response = $client->request('POST', $this->url . '/sale/put', [
            'headers' => [
                'Authorization' => 'Bearer '.$this->jwt,
            ],
            'json' => [
                'address' => $address,
                'price'   => $price,
                'owner'   => $owner,
            ],
        ]);
        $result = json_decode($response->getBody(), true);
        if ($response->getStatusCode() == 200) {
            return $result;
        }

        throw new \Exception($result['message']);
    }

    /**
     * Get stake payload
     * @param \App\Models\Stake $stake
     * @throws \Exception
     * @return mixed
     */
    public function stake($stake) {
        $client = new Client();
        Log::info('stake: ' . $this->url . '/stake');
        $response = $client->request('POST', $this->url . '/stake', [
            'headers' => [
                'Authorization' => 'Bearer '.$this->jwt,
            ],
            'json' => [
                'owner' => $stake->owner,
                'amount' => $stake->amount,
                'out_amount' => $stake->out_amount,
                'mint_count' => $stake->mint_count,
                'duration' => $stake->duration,
                'max_claims' => $stake->max_claims,
            ],
        ]);
        $result = json_decode($response->getBody(), true);
        if ($response->getStatusCode() == 200) {
            return $result;
        }

        throw new \Exception($result['message']);
    }

    public function claim($address, $owner, $id) {
        $client = new Client();
        Log::info('stake: ' . $this->url . '/claim');
        $response = $client->request('POST', $this->url . '/claim', [
            'headers' => [
                'Authorization' => 'Bearer '.$this->jwt,
            ],
            'json' => [
                'address' => $address,
                'owner_address' => $owner,
                'id' => (string)$id,
            ],
        ]);
        $result = json_decode($response->getBody(), true);
        if ($response->getStatusCode() == 200) {
            return $result;
        }

        throw new \Exception($result['message']);
    }

    public function restake($address, $owner, $id) {
        $client = new Client();
        Log::info('stake: ' . $this->url . '/restake');
        $response = $client->request('POST', $this->url . '/restake', [
            'headers' => [
                'Authorization' => 'Bearer '.$this->jwt,
            ],
            'json' => [
                'address' => $address,
                'owner_address' => $owner,
                'id' => (string)$id
            ],
        ]);
        $result = json_decode($response->getBody(), true);
        if ($response->getStatusCode() == 200) {
            return $result;
        }

        throw new \Exception($result['message']);
    }

    public function stakeWithdraw($address, $owner, $id) {
        $client = new Client();
        Log::info('stake: ' . $this->url . '/stake/withdraw');
        $response = $client->request('POST', $this->url . '/stake/withdraw', [
            'headers' => [
                'Authorization' => 'Bearer '.$this->jwt,
            ],
            'json' => [
                'address' => $address,
                'owner_address' => $owner,
                'id' => (string)$id
            ],
        ]);
        $result = json_decode($response->getBody(), true);
        if ($response->getStatusCode() == 200) {
            return $result;
        }

        throw new \Exception($result['message']);
    }

    public function cancelNftSale()
    {
        $client = new Client();
        Log::info('putNftOnSale: ' . $this->url . '/sale/cancel');
        $response = $client->request('POST', $this->url . '/sale/cancel', [
            'headers' => [
                'Authorization' => 'Bearer '.$this->jwt,
            ],
            'json' => [],
        ]);
        $result = json_decode($response->getBody(), true);
        if ($response->getStatusCode() == 200) {
            return $result;
        }

        throw new \Exception($result['message']);
    }

    public function changeNftSalePrice($price)
    {
        $client = new Client();
        Log::info('putNftOnSale: ' . $this->url . '/sale/change-price');
        $response = $client->request('POST', $this->url . '/sale/change-price', [
            'headers' => [
                'Authorization' => 'Bearer '.$this->jwt,
            ],
            'json' => [
                'price' => $price,
            ],
        ]);
        $result = json_decode($response->getBody(), true);
        if ($response->getStatusCode() == 200) {
            return $result;
        }

        throw new \Exception($result['message']);
    }

    public function buyNftOnSale()
    {
        $client = new Client();
        Log::info('putNftOnSale: ' . $this->url . '/sale/buy');
        $response = $client->request('POST', $this->url . '/sale/buy', [
            'headers' => [
                'Authorization' => 'Bearer '.$this->jwt,
            ],
            'json' => [
            ],
        ]);
        $result = json_decode($response->getBody(), true);
        if ($response->getStatusCode() == 200) {
            return $result;
        }

        throw new \Exception($result['message']);
    }

    public function nftIssue($txns)
    {
        $client = new Client();
        Log::info('nftIssue: ' . $this->url . '/nft/issue');
        Log::info(VarDumper::export($txns));
        Log::info(VarDumper::export($this->jwt));

        $response = $client->request('POST', $this->url . '/nft/issue', [
            'headers' => [
                'Authorization' => 'Bearer '.$this->jwt,
            ],
            'json' => $txns,
        ]);
        $result = json_decode($response->getBody(), true);
        if ($response->getStatusCode() == 200) {
            return $result;
        }

        throw new \Exception($result['message']);
    }

    public function checkIssue($queryId)
    {
        $client = new Client();
        Log::info('$queryId: ' . $queryId);
        Log::info('checkIssue: ' . $this->url . '/nft/check');
        $response = $client->request('POST', $this->url . '/nft/check', [
            'headers' => [
                'Authorization' => 'Bearer '.$this->jwt,
            ],
            'json' => [
                'queryId' => (string)$queryId,
            ],
        ]);
        $result = json_decode($response->getBody(), true);

        if ($response->getStatusCode() != 200) {
            throw new \Exception($result['message']);
        }

        return $result;
    }


    public function sendTokens($list)
    {
        $client = new Client();
        Log::info('sendTokens: ' . $this->url . '/tokens/send');
        $response = $client->request('POST', $this->url . '/tokens/send', [
            'headers' => [
                'Authorization' => 'Bearer '.$this->jwt,
            ],
            'json' => $list,
        ]);
        $result = json_decode($response->getBody(), true);

        if ($response->getStatusCode() != 200) {
            throw new \Exception($result['message']);
        }

        return $result;
    }


    public function provideLiquidity($address, $amount)
    {
        $client = new Client();
        Log::info('sendTokens: ' . $this->url . '/providelp');
        $response = $client->request('POST', $this->url . '/providelp', [
            'headers' => [
                'Authorization' => 'Bearer '.$this->jwt,
            ],
            'json' => [
                'jetton_address' => $address,
                'amount' => $amount
            ],
        ]);
        $result = json_decode($response->getBody(), true);

        if ($response->getStatusCode() != 200) {
            throw new \Exception($result['message']);
        }

        return $result;
    }

    public function getStakeDetails($address, $id = null, $owner_address = null)
    {
        $client = new Client();
        Log::info('sendTokens: ' . $this->url . '/stake/details', [
            'address' => $address,
            'id' => $id,
            'owner_address' => $owner_address
        ]);
        
        $requestData = [
            'address' => $address
        ];
        
        if ($id !== null) {
            $requestData['id'] = $id;
        }
        if ($owner_address !== null) {
            $requestData['owner_address'] = $owner_address;
        }
        
        $response = $client->request('POST', $this->url . '/stake/details', [
            'headers' => [
                'Authorization' => 'Bearer '.$this->jwt,
            ],
            'json' => $requestData,
        ]);
        $result = json_decode($response->getBody(), true);

        Log::info('Received response from stake details', [
            'result' => $result
        ]);

        if ($response->getStatusCode() != 200) {
            throw new \Exception($result['message']);
        }

        return $result;
    }

    public function post($path, $data)
    {
        Log::info(VarDumper::dumpAsString([$path, $data]));

        $client = new Client();
        $response = $client->request('POST', $this->url . $path, [
            'headers' => [
                'Authorization' => 'Bearer '.$this->jwt,
            ],
            'json' => $data,
        ]);
        $result = json_decode($response->getBody(), true);

        Log::info(VarDumper::dumpAsString($result));

        if ($response->getStatusCode() != 200) {
            throw new \Exception($result['message']);
        }

        return $result;
    }
}

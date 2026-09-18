<?php

namespace App\Service;


use Catchain\Ton\Address\Address;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


/**
 * Проверяет что все переданные NFT принадлежат одной коллекции
 * уникальные
 * входят в массив всех запчастей по имени
 */
class ValidatorNft
{
    public static function getInstance()
    {
        return new self();
    }

    public function run($params2, $wallet, $collection)
    {
        $params = $this->prepareParams($params2);

        $original_name_list = [
            'Cabin Module',
            'Ship Nose',
            'Tail Section',
            'Engine Unit',
            'Left Wing',
            'Right Wing',
        ];

        if (true) { // проверка что все NFT уникальные
            $d = array_unique(array_values($params));
            if (count($d) < 6) {
                return [
                    'code'    => 422,
                    'message' => 'Не уникальные NFT',
                ];
            }
        }

        $result = Http::get('https://tonapi.io/v2/accounts/'.$wallet.'/nfts', [
            'collection'         => $collection,
            'limit'              => 1000,
            'offset'             => 0,
            'indirect_ownership' => 'false',
        ]);
        $data = json_decode($result->body(), true);

        { // проверка что есть все запчасти
            $name_list = [];
            foreach ($params as $k => $v) {
                $address_hex = Address::parse($v)->toString(false);
                $nft = $this->getNft($data['nft_items'], $address_hex);
                if (is_null($nft)) {
                    return [
                        'code'    => 423,
                        'message' => 'Нет NFT в кошельке '.$v,
                    ];
                }
                $name_list[] = $this->getNameNft($nft);
            }
        }

        if (!$this->compareNames($name_list, $original_name_list)) {
            return [
                'code'    => 424,
                'message' => 'Не верные имена запчастей',
            ];
        }

        return [
            'code'=> 200,
        ];
    }

    /**
     * @param $params2
     * @param $wallet
     * @param $collection
     * @return array
     * @throws \Exception
     */
    public function checkGetGemsSale($params2, $list = ['nft1','nft2','nft3','nft4','nft5','nft6'])
    {
        $params = $this->prepareParams($params2, $list);

        $errors = [];
        foreach ($params as $k => $v) {
            $result = \App\Service\TonApi::getInstance()->_get('v2/nfts/'.urlencode($v));
            if ($result->status() == 200) {
                $data = json_decode($result->body(), true);
                if (isset($data['sale'])) {
                    $c = Address::parse($data['collection']['address'])->toString(true, true, true, false);
                    $nft = Address::parse($v)->toString(true, true, true, false);

                    $errors[] = [
                        'address_hex'    => $v,
                        'address_base58' => $nft,
                        'url_getgems'    => 'https://getgems.io/collection/' . $c . '/' . $nft,
                        'metadata'       => $data['metadata'],
                        'previews'       => $data['previews'],
                    ];
                }
            }
        }

        if (count($errors) > 0) {
            return [
                'status'  => false,
                'message' => 'nft on GetGems market on sale',
                'errors'  => $errors,
            ];
        }

        return [
            'status'  => true,
        ];
    }

    private function prepareParams($params, $list = ['nft1','nft2','nft3','nft4','nft5','nft6'])
    {
        $ret = [];
        foreach ($params as $k => $v) {
            if (in_array($k, $list)) {
                $ret[$k] = Address::parse($v)->toString(false);
            }
        }

        return $ret;
    }

    /**
     * @param array $data
     * @param string $address_hex
     * @return bool
     */
    public function hasNft($data, $address_hex)
    {
        foreach ($data as $nft) {
            if ($nft['address'] == $address_hex) return true;
        }

        return false;
    }

    /**
     * @param array $data
     * @param string $address_hex
     * @return bool
     */
    public function compareNames($array1, $array2)
    {
        foreach ($array1 as $a1) {
            if (!in_array($a1, $array2)) return false;
        }

        return true;
    }


    public function getNameNft($nft)
    {
        foreach ($nft['metadata']['attributes'] as $item) {
            if ($item['trait_type'] == 'Module') {
                return $item['value'];
            };
        }

        return null;
    }

    /**
     * @param array $data
     * @param string $address_hex
     * @return bool
     */
    public function getNft($data, $address_hex)
    {
        foreach ($data as $nft) {
            if ($nft['address'] == $address_hex) return $nft;
        }

        return null;
    }
}

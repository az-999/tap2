<?php

namespace App\Http\Controllers;

use App\Models\LogBalance;
use App\Models\NftHistory;
use App\Models\NftSale;
use App\Models\UserNft;
use App\Service\BaseArrayHelper;
use App\Service\BuyNft;
use App\Service\Captcha;
use App\Service\VarDumper;
use Catchain\Ton\Address\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NftShipController extends Controller
{
    private $apiton;

    public function __construct()
    {
        $token = hash('sha256', config('jwt.secret'));
        $nftUrl = config('app.nft-url');
        $this->apiton = new BuyNft($nftUrl, $token, null, null);
    }

    public function kraft(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $params = $request->validate([
            'nft1'       => ['required', 'string'],
            'nft2'       => ['required', 'string'],
            'nft3'       => ['required', 'string'],
            'nft4'       => ['required', 'string'],
            'nft5'       => ['required', 'string'],
            'nft6'       => ['required', 'string'],
            'ship_level' => ['required', 'integer'],
        ]);


        // Проверка на выставление на продажу GetGems
        if (true) {
            $result = \App\Service\ValidatorNft::getInstance()->checkGetGemsSale($params);
            if (!$result['status']) {
                return response()->json($result, 400);
            }
        }

        try {
            $response = $this->apiton->post('/nft-ship/kraft', $params);

            $response['address'] = config('app.ship_kraft_collection');
            $response['value'] = '0.5';

            // Прибавляю созданных кораблей
            $user->ship_craft_count++;
            $user->save();

            return response()->json($response);
        } catch (\Exception $e) {
            return $this->error(500, [
                $e->getMessage(),
                explode("\n",$e->getTraceAsString()),
            ]);
        }
    }

    public function upgrade(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $params = $request->validate([
            'nft1'       => ['required', 'string'],
            'nft2'       => ['required', 'string'],
            'nft3'       => ['required', 'string'],
            'nft4'       => ['required', 'string'],
            'nft5'       => ['required', 'string'],
            'nft6'       => ['required', 'string'],
            'nft7'       => ['required', 'string'],
            'ship_level' => ['required', 'integer'],
        ]);

        // Проверка на выставление на продажу GetGems
        if (true) {
            $result = \App\Service\ValidatorNft::getInstance()->checkGetGemsSale($params, ['nft1','nft2','nft3','nft4','nft5','nft6','nft7']);
            if (!$result['status']) {
                return response()->json($result, 400);
            }
        }

        try {
            $response = $this->apiton->post('/nft-ship/upgrade', $params);

            $response['address'] = config('app.ship_kraft_collection');
            $response['value'] = '0.6';

            // Прибавляю улучшений корабля
            $user->ship_upgrade_count++;
            $user->save();

            return response()->json($response);
        } catch (\Exception $e) {
            return $this->error(500, [
                $e->getMessage(),
                explode("\n",$e->getTraceAsString()),
            ]);
        }
    }

    public function union(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $params = $request->validate([
            'nft1'       => ['required', 'string'],
            'nft2'       => ['required', 'string'],
            'nft3'       => ['required', 'string'],
            'nft4'       => ['required', 'string'],
            'nft5'       => ['required', 'string'],
            'nft6'       => ['required', 'string'],
            'nft7'       => ['required', 'string'],
            'ship_level' => ['required', 'integer'],
        ]);

        // Проверка на выставление на продажу GetGems
        if (true) {
            $result = \App\Service\ValidatorNft::getInstance()->checkGetGemsSale($params, ['nft1','nft2','nft3','nft4','nft5','nft6','nft7']);
            if (!$result['status']) {
                return response()->json($result, 400);
            }
        }

        try {
            $response = $this->apiton->post('/nft-ship/upgrade', $params);

            $response['address'] = config('app.ship_kraft_collection');
            $response['value'] = '1';

            // Прибавляю объединений кораблей
            $user->ship_union_count++;
            $user->save();

            return response()->json($response);
        } catch (\Exception $e) {
            return $this->error(500, [
                $e->getMessage(),
                explode("\n",$e->getTraceAsString()),
            ]);
        }
    }

    private function error(int $code, $message) {
        return response()->json([
            'code'      => $code,
            'message'   => $message
        ], 400);
    }
}

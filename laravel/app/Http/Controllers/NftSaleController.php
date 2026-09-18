<?php

namespace App\Http\Controllers;

use App\Models\LogBalance;
use App\Models\NftHistory;
use App\Models\NftSale;
use App\Models\UserNft;
use App\Service\BaseArrayHelper;
use App\Service\BuyNft;
use App\Service\Captcha;
use Catchain\Ton\Address\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class NftSaleController extends Controller
{
    private $apiton;

    public function __construct()
    {
        $token = hash('sha256', config('jwt.secret'));
        $nftUrl = config('app.nft-url');
        $this->apiton = new BuyNft($nftUrl, $token, null, null);
    }

    public function index(Request $request)
    {
        $params = $request->validate([
            'next'    => ['integer'],
            'limit'   => ['integer'],
            'sort'    => ['string'],
            'address' => ['string'],
            'name'    => ['string'],
        ]);

        $sortBy = 'created_at';
        $sortOrder = 'asc';
        if (isset($params['sort'])) {
            $sortArr = explode('-', $params['sort']);
            $sortBy = $sortArr[0];
            $sortOrder = $sortArr[1];
        }
        $name = null;
        if (isset($params['name'])) {
            $name = $params['name'];
        }

        if (!isset($params['address'])) {
            $params['address'] = '';
        }

        $items = NftSale::list($params['next'], $params['limit'], $sortBy, $sortOrder, $params['address'], $name);
        $next = -1;
        if (count($items) == $params['limit']) {
            $next = $params['next'] + $params['limit'];
        }

        return response()->json([
            'items' => $items,
            'next'  => $next
        ]);
    }

    public function putOnSale(Request $request)
    {
        $params = $request->validate([
            'nft_id'             => ['integer', 'required'],
            'price'              => ['string', 'required'],
            'nft_address'        => ['string', 'required'],
            'owner'              => ['string', 'required'],
            'name'               => ['string', 'required'],
            'description'        => ['string'],
            'image'              => ['string', 'required'],
            'collection_address' => ['string', 'required'],
            'collection_name'    => ['string', 'required'],
        ]);

        $user = \App\Http\Middleware\FarmAuth::$user;
        $isOnSale = NftSale::isNftOnSale($params['nft_address']);
        if ($isOnSale) {
            return $this->error(555, 'NFT is already on sale, please contact support');
        }


        try {
            $response = $this->apiton->putNftOnSale($params['nft_address'], $params['price'], $params['owner']);
            $item = NftSale::create([
                'tg_id'              => $user->chat_id,
                'nft_id'             => $params['nft_id'],
                'nft_address'        => $params['nft_address'],
                'sale_address'       => '',
                'sale_price'         => $params['price'],
                'status'             => NftSale::SALE_CREATED,
                'name'               => $params['name'],
                'description'        => isset($params['description'])? $params['description'] : '',
                'image'              => $params['image'],
                'owner'              => $params['owner'],
                'collection_address' => $params['collection_address'],
                'collection_name'    => $params['collection_name'],
            ]);

            return response()->json([
                'item'       => $item,
                'payload'    => $response['body'],
                'to_address' => $params['nft_address'],
                'value'      => config('app.marketplace-fee'),
            ]);
        } catch (\Exception $e) {
            return $this->error(500, $e->getMessage());
        }
    }

    public function putOnSaleConfirm(Request $request) {
        $params = $request->validate([
            'id' => ['integer', 'required'],
            'sale_address' => ['string', 'required'],
            'user_address' => ['string', 'required'],
            'txid' => ['string', 'required'],
        ]);

        if (!Address::isValid($params['sale_address'])) {
            return $this->error(555, 'Invalid sale address');
        }

        $user = \App\Http\Middleware\FarmAuth::$user;
        $item = NftSale::find($params['id']);
        if (!$item) {
            return $this->error(404, 'Not found');
        }

        if ($item->tg_id != $user->chat_id) {
            return $this->error(403, 'Forbidden');
        }

        if ($item->status != NftSale::SALE_CREATED) {
            return $this->error(400, 'Wrong status');
        }

        $item->sale_address = Address::parse($params['sale_address'])->toString(true, true, false, false);
        if (!$item->sale_address || $item->sale_address == '') {
            return $this->error(555, 'Invalid sale address parsed');
        }

        $item->deployed_at = date('Y-m-d H:i:s');
        $item->status = NftSale::SALE_ACTIVE;
        $item->save();

        NftHistory::create([
            'nft_id' => $item->nft_id,
            'nft_address' => $item->nft_address,
            'action' => NftHistory::ACT_PUT_ON_MARKET,
            'to_address' => $item->sale_address,
            'from_address' => $params['user_address'],
            'txid' => $params['txid'],
            'price' => $item->sale_price,
        ]);

        return response()->json([
            'item' => $item
        ]);
    }

    public function putOnSaleReject(Request $request) {
        $params = $request->validate([
            'id' => ['integer', 'required'],
        ]);

        $user = \App\Http\Middleware\FarmAuth::$user;
        $item = NftSale::find($params['id']);
        if (!$item) {
            return $this->error(404, 'Not found');
        }

        if ($item->tg_id != $user->chat_id) {
            return $this->error(403, 'Forbidden');
        }

        if ($item->status != NftSale::SALE_CREATED) {
            return $this->error(400, 'Wrong status');
        }

        $item->delete();
        return response()->json([
            'success' => true,
            'item' => $item
        ]);
    }

    public function getSaleByAddress(Request $request)
    {
        $params = $request->validate([
            'address' => ['string', 'required'],
        ]);

        $item = NftSale::where('nft_address', $params['address'])->where('status', NftSale::SALE_ACTIVE)->first();
        if (!$item) {
            return $this->error(404, 'Not found');
        }

        return response()->json([
            'item' => $item
        ]);
    }

    public function getCancelPayload(Request $request)
    {
        $params = $request->validate([
            'address' => ['string', 'required'],
        ]);

        try {
            $response = $this->apiton->cancelNftSale();
            return response()->json([
                'payload' => $response['body'],
                'to_address' => $params['address'],
                'value' => config('app.marketplace-fee'),
            ]);
        } catch (\Exception $e) {
            return $this->error(500, $e->getMessage());
        }
    }

    public function cancelNftSale(Request $request)
    {
        $params = $request->validate([
            'id' => ['integer', 'required'],
        ]);

        $user = \App\Http\Middleware\FarmAuth::$user;
        $item = NftSale::find($params['id']);
        if (!$item) {
            return $this->error(404, 'Not found');
        }

        if ($item->tg_id != $user->chat_id) {
            return $this->error(403, 'Forbidden');
        }

        try {
            $response = $this->apiton->cancelNftSale();
            return response()->json([
                'payload' => $response['body'],
                'to_address' => $item->sale_address,
                'name' => $item->name,
                'value' => config('app.marketplace-fee'),
            ]);
        } catch (\Exception $e) {
            return $this->error(500, $e->getMessage());
        }
    }

    public function cancelNftSaleConfirm(Request $request)
    {
        $params = $request->validate([
            'id' => ['integer', 'required'],
            'owner' => ['string', 'required'],
            'txid' => ['string', 'required'],
        ]);

        $user = \App\Http\Middleware\FarmAuth::$user;
        $item = NftSale::find($params['id']);
        if (!$item) {
            return $this->error(404, 'Not found');
        }

        if ($item->tg_id != $user->chat_id) {
            return $this->error(403, 'Forbidden');
        }

        if ($item->status != NftSale::SALE_ACTIVE) {
            return $this->error(400, 'Wrong status');
        }

        $item->status = NftSale::SALE_CANCELLED;
        $item->completed_at = date('Y-m-d H:i:s');
        $item->save();

        NftHistory::create([
            'nft_id' => $item->nft_id,
            'nft_address' => $item->nft_address,
            'to_address' => $params['owner'],
            'from_address' => $item->sale_address,
            'action' => NftHistory::ACT_CANCEL_SALE,
            'txid' => $params['txid'],
            'price' => $item->sale_price,
        ]);

        return response()->json([
            'item' => $item
        ]);
    }

    public function changeNftSalePrice(Request $request)
    {
        $params = $request->validate([
            'id' => ['integer', 'required'],
            'price' => ['string', 'required'],
        ]);

        $user = \App\Http\Middleware\FarmAuth::$user;
        $item = NftSale::find($params['id']);
        if (!$item) {
            return $this->error(404, 'Not found');
        }

        if ($item->tg_id != $user->chat_id) {
            return $this->error(403, 'Forbidden');
        }

        if ($item->status != NftSale::SALE_ACTIVE) {
            return $this->error(400, 'Wrong status');
        }

        try {
            $response = $this->apiton->changeNftSalePrice($params['price']);
            return response()->json([
                'payload' => $response['body'],
                'to_address' => $item->sale_address,
                'value' => config('app.marketplace-fee'),
            ]);
        } catch (\Exception $e) {
            return $this->error(500, $e->getMessage());
        }
    }

    public function changeNftSalePriceConfirm(Request $request)
    {
        $params = $request->validate([
            'id'    => ['integer', 'required'],
            'price' => ['string', 'required'],
            'txid'  => ['string', 'required'],
        ]);

        $user = \App\Http\Middleware\FarmAuth::$user;
        $item = NftSale::find($params['id']);
        if (!$item) {
            return $this->error(404, 'Not found');
        }

        if ($item->tg_id != $user->chat_id) {
            return $this->error(403, 'Forbidden');
        }

        if ($item->status != NftSale::SALE_ACTIVE) {
            return $this->error(400, 'Wrong status');
        }

        $item->sale_price = $params['price'];
        $item->save();

        NftHistory::create([
            'nft_id'       => $item->nft_id,
            'nft_address'  => $item->nft_address,
            'to_address'   => $item->sale_address,
            'from_address' => $item->sale_address,
            'action'       => NftHistory::ACT_PRICE_CHANGE,
            'txid'         => $params['txid'],
            'price'        => $params['price'],
        ]);

        return response()->json([
            'item' => $item
        ]);
    }

    public function buyNft(Request $request)
    {
        $params = $request->validate([
            'id' => ['integer', 'required'],
        ]);

        $item = NftSale::find($params['id']);
        if (!$item) {
            return $this->error(404, 'Not found');
        }

        try {
            $response = $this->apiton->buyNftOnSale();
            return response()->json([
                'payload'    => $response['body'],
                'to_address' => $item->sale_address,
                'value'      => config('app.marketplace-fee') + ((float)$item->sale_price * 1000000000),
            ]);
        } catch (\Exception $e) {
            return $this->error(500, $e->getMessage());
        }
    }

    public function buyNftConfirm(Request $request)
    {
        $params = $request->validate([
            'id'        => ['integer', 'required'],
            'txid'      => ['string', 'required'],
            'new_owner' => ['string', 'required'],
        ]);

        $item = NftSale::find($params['id']);
        if (!$item) {
            return $this->error(404, 'Not found');
        }

        if ($item->status != NftSale::SALE_ACTIVE) {
            return $this->error(400, 'Wrong status');
        }

        $item->status = NftSale::SALE_COMPLETED;
        $item->completed_at = date('Y-m-d H:i:s');
        $item->save();

        NftHistory::create([
            'nft_id'       => $item->nft_id,
            'nft_address'  => $item->nft_address,
            'to_address'   => $params['new_owner'],
            'from_address' => $item->sale_address,
            'action'       => NftHistory::ACT_SELL,
            'txid'         => $params['txid'],
            'price'        => $item->sale_price,
        ]);

        return response()->json([
            'item' => $item
        ]);
    }

    public function fixSale(Request $request)
    {
        $params = $request->validate([
            'id' => ['integer', 'required'],
        ]);

        $item = NftSale::find($params['id']);
        if (!$item) {
            return $this->error(404, 'Not found');
        }

        $item->status = NftSale::SALE_REJECTED;
        $item->completed_at = date('Y-m-d H:i:s');
        $item->save();

        return response()->json([
            'item' => $item
        ]);
    }

    public function getHistory(Request $request) {
        $params = $request->validate([
            'address' => ['string', 'required'],
            'next' => ['integer'],
            'limit' => ['integer'],
        ]);

        $items = NftHistory::listByAddress($params['address'], $params['next'], $params['limit']);
        $next = -1;
        if (count($items) == $params['limit']) {
            $next = $items[count($items) - 1]['id'];
        }

        return response()->json([
            'items' => $items,
            'next' => $next
        ]);
    }

    public function collections() {
        return response()->json([
            'collections' => config('app.nft_collection_list')
        ]);
    }

    private function error(int $code, string $message) {
        return response()->json([
            'code'      => $code,
            'message'   => $message
        ], 400);
    }
}

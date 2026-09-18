<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::post('/loginJwt', [\App\Http\Controllers\AuthController::class, 'loginJwt']);
Route::post('/loginWeb', [\App\Http\Controllers\AuthController::class, 'loginWeb']);
Route::post('/auth', [\App\Http\Controllers\AuthController::class, 'auth']);

Route::group(['middleware' => \App\Http\Middleware\ApiAuth::class, 'prefix' => 'auth'], function ($router) {
    Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
    Route::post('user', [\App\Http\Controllers\AuthController::class, 'user']);
    Route::post('logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    Route::post('refresh', [\App\Http\Controllers\AuthController::class, 'refresh']);
});

Route::middleware([\App\Http\Middleware\AppStoreTracker::class])->group(function () {
    Route::get('/app-store-tracker/success-callback', [\App\Http\Controllers\AppStoreTrackerController::class, 'successСallback']);
});

Route::middleware([\App\Http\Middleware\ApiAuth::class])->group(function () {
    Route::post('/farming', [\App\Http\Controllers\FarmingController::class, 'index']);
    Route::post('/friends', [\App\Http\Controllers\FriendsController::class, 'index']);

    Route::post('/auth/clear-cache', [\App\Http\Controllers\AuthController::class, 'clearCache']);
});

Route::middleware(
    [
        \App\Http\Middleware\ApiAuth::class,
//        \App\Http\Middleware\ValidateHash::class,
    ]
)->group(function () {

    Route::post('/start', [\App\Http\Controllers\StartController::class, 'index']);

    Route::post('/farming/start', [\App\Http\Controllers\FarmingController::class, 'start']);
    Route::post('/farming/finish', [\App\Http\Controllers\FarmingController::class, 'finish']);
    Route::post('/farming/moon-claim', [\App\Http\Controllers\FarmingController::class, 'moonClaim']);
    Route::post('/farming/unblock', [\App\Http\Controllers\FarmingController::class, 'unblock']);

    Route::post('/friends/claim', [\App\Http\Controllers\FriendsController::class, 'claim']);

    Route::post('/product-list/buy', [\App\Http\Controllers\ProductListController::class, 'buy']);
    Route::post('/product-list/delete', [\App\Http\Controllers\ProductListController::class, 'delete']);

    Route::post('/task-list', [\App\Http\Controllers\TaskListController::class, 'index']);
    Route::post('/task-list/clear', [\App\Http\Controllers\TaskListController::class, 'clear']);
    Route::post('/task-list/complete', [\App\Http\Controllers\TaskListController::class, 'complete']);
    Route::post('/task-list/drop-all', [\App\Http\Controllers\TaskListController::class, 'dropAll']);
    Route::post('/task-list/claim', [\App\Http\Controllers\TaskListController::class, 'claim']);

    Route::post('/rating', [\App\Http\Controllers\RatingController::class, 'index']);

    Route::post('/wallet', [\App\Http\Controllers\WalletController::class, 'index']);

    Route::post('/trustwallet', [\App\Http\Controllers\TrustwalletController::class, 'index']);

    Route::post('/nft', [\App\Http\Controllers\NftController::class, 'index']);
    Route::post('/nft/buy', [\App\Http\Controllers\CaptchaController::class, 'getChallenge']);
    Route::post('/nft/verify', [\App\Http\Controllers\CaptchaController::class, 'verify']);
    Route::post('/nft/check', [\App\Http\Controllers\NftController::class, 'checkStatus']);
    Route::post('/nft/current', [\App\Http\Controllers\NftController::class, 'getCurrentNft']);
    Route::post('/nft/sent', [\App\Http\Controllers\NftController::class, 'onTxSuccess']);
    Route::post('/nft/reject', [\App\Http\Controllers\NftController::class, 'onTxError']);
    Route::post("/nft/my-nfts", [\App\Http\Controllers\NftController::class, 'myNfts']);

    Route::post('/nft/market/collections', [\App\Http\Controllers\NftSaleController::class, 'collections']);
    Route::post('/nft/market', [\App\Http\Controllers\NftSaleController::class, 'index']);
    Route::post('/nft/market/put', [\App\Http\Controllers\NftSaleController::class, 'putOnSale']);
    Route::post('/nft/market/put/confirm', [\App\Http\Controllers\NftSaleController::class, 'putOnSaleConfirm']);
    Route::post('/nft/market/put/reject', [\App\Http\Controllers\NftSaleController::class, 'putOnSaleReject']);
    Route::post('/nft/market/get', [\App\Http\Controllers\NftSaleController::class, 'getSaleByAddress']);
    Route::post('/nft/market/cancel/payload', [\App\Http\Controllers\NftSaleController::class, 'getCancelPayload']);
    Route::post('/nft/market/cancel', [\App\Http\Controllers\NftSaleController::class, 'cancelNftSale']);
    Route::post('/nft/market/cancel/confirm', [\App\Http\Controllers\NftSaleController::class, 'cancelNftSaleConfirm']);
    Route::post('/nft/market/change/price', [\App\Http\Controllers\NftSaleController::class, 'changeNftSalePrice']);
    Route::post('/nft/market/change/price/confirm', [\App\Http\Controllers\NftSaleController::class, 'changeNftSalePriceConfirm']);
    Route::post('/nft/market/buy', [\App\Http\Controllers\NftSaleController::class, 'buyNft']);
    Route::post('/nft/market/buy/confirm', [\App\Http\Controllers\NftSaleController::class, 'buyNftConfirm']);
    Route::post('/nft/market/history', [\App\Http\Controllers\NftSaleController::class, 'getHistory']);
    Route::post('/nft/market/fix', [\App\Http\Controllers\NftSaleController::class, 'fixSale']);

    Route::post('/nft/mint/register', [\App\Http\Controllers\NftController::class, 'onTxAccepted']);
    Route::post('/nft/mint/check', [\App\Http\Controllers\NftController::class, 'getMintStatus']);

    Route::post('/nft-ship/kraft', [\App\Http\Controllers\NftShipController::class, 'kraft']);
    Route::post('/nft-ship/upgrade', [\App\Http\Controllers\NftShipController::class, 'upgrade']);
    Route::post('/nft-ship/union', [\App\Http\Controllers\NftShipController::class, 'union']);
    Route::post('/nft-ship/collection-list', [\App\Http\Controllers\NftShipController::class, 'collectionList']);

    Route::post('/grant-day/claim', [\App\Http\Controllers\GrantDayController::class, 'claim']);
    Route::post('/grant-day/reset', [\App\Http\Controllers\GrantDayController::class, 'reset']);
    Route::post('/grant-day/prize', [\App\Http\Controllers\GrantDayController::class, 'prize']);

    Route::post('/grant', [\App\Http\Controllers\GrantController::class, 'index']);
    Route::post('/grant/accept', [\App\Http\Controllers\GrantController::class, 'accept']);
    Route::post('/grant/reject', [\App\Http\Controllers\GrantController::class, 'reject']);

    Route::post('/pirate/info', [\App\Http\Controllers\PirateController::class, 'info']);
    Route::post('/pirate/start', [\App\Http\Controllers\PirateController::class, 'start']);
    Route::post('/pirate/finish', [\App\Http\Controllers\PirateController::class, 'finish']);
    Route::post('/pirate/buy', [\App\Http\Controllers\PirateController::class, 'buy']);
    Route::post('/pirate/buy-info', [\App\Http\Controllers\PirateController::class, 'buyInfo']);
    Route::post('/pirate/oferta-accept', [\App\Http\Controllers\PirateController::class, 'ofertaAccept']);

    Route::post('/mmpro-token/buy', [\App\Http\Controllers\MmproTokenController::class, 'buy']);
    Route::post('/mmpro-token/check', [\App\Http\Controllers\MmproTokenController::class, 'check']);
    Route::post('/mmpro-token/info', [\App\Http\Controllers\MmproTokenController::class, 'info']);

    Route::post('/lootboxes', [\App\Http\Controllers\LootboxController::class, 'index']);
    Route::post('/lootboxes/list', [\App\Http\Controllers\LootboxController::class, 'list']);
    Route::post('/lootboxes/stake', [\App\Http\Controllers\LootboxController::class, 'stake']);
    Route::post('/lootboxes/stake/confirm', [\App\Http\Controllers\LootboxController::class, 'stakeConfirm']);
    Route::post('/lootboxes/stake/error', [\App\Http\Controllers\LootboxController::class, 'stakeError']);
    Route::post('/lootboxes/claim', [\App\Http\Controllers\LootboxController::class, 'claim']);
    Route::post('/lootboxes/claim/confirm', [\App\Http\Controllers\LootboxController::class, 'claimConfirm']);
    Route::post('/lootboxes/restake', [\App\Http\Controllers\LootboxController::class, 'restake']);
    Route::post('/lootboxes/restake/confirm', [\App\Http\Controllers\LootboxController::class, 'restakeConfirm']);
    Route::post('/lootboxes/withdraw', [\App\Http\Controllers\LootboxController::class, 'withdraw']);
    Route::post('/lootboxes/withdraw/confirm', [\App\Http\Controllers\LootboxController::class, 'withdrawConfirm']);
    Route::post('/lootboxes/sync', [\App\Http\Controllers\LootboxController::class, 'sync']);

    Route::post('/airdrop/start', [\App\Http\Controllers\AirdropController::class, 'start']);

});

Route::middleware(
    [
        \App\Http\Middleware\ApiAuth::class,
        \App\Http\Middleware\Airdrop::class,
    ]
)->group(function () {
    Route::post('/airdrop', [\App\Http\Controllers\AirdropController::class, 'index']);
    Route::post('/airdrop/complete', [\App\Http\Controllers\AirdropController::class, 'complete']);
    Route::post('/airdrop/complete-ship3', [\App\Http\Controllers\AirdropController::class, 'completeShip3']);
    Route::post('/airdrop/complete-kols', [\App\Http\Controllers\AirdropController::class, 'completeKols']);
    Route::post('/airdrop/complete-daily', [\App\Http\Controllers\AirdropController::class, 'completeDaily']);
    Route::post('/airdrop/complete-task6', [\App\Http\Controllers\AirdropController::class, 'completeTask6']);
    Route::post('/airdrop/complete-task7', [\App\Http\Controllers\AirdropController::class, 'completeTask7']);
    Route::post('/airdrop/complete-task8', [\App\Http\Controllers\AirdropController::class, 'completeTask8']);
    Route::post('/airdrop/complete-task9', [\App\Http\Controllers\AirdropController::class, 'completeTask9']);
    Route::post('/airdrop/complete-task10', [\App\Http\Controllers\AirdropController::class, 'completeTask10']);
    Route::post('/airdrop/complete-task11', [\App\Http\Controllers\AirdropController::class, 'completeTask11']);
    Route::post('/airdrop/complete-task12', [\App\Http\Controllers\AirdropController::class, 'completeTask12']);
    Route::post('/airdrop/complete-task13', [\App\Http\Controllers\AirdropController::class, 'completeTask13']);
    Route::post('/airdrop/white-bit-nik', [\App\Http\Controllers\AirdropController::class, 'whiteBitNik']);
    Route::post('/airdrop/white-bit-claim', [\App\Http\Controllers\AirdropController::class, 'whiteBitClaim']);
    Route::post('/airdrop/save-ship-craft', [\App\Http\Controllers\AirdropController::class, 'saveShipCraft']);
    Route::post('/airdrop/rating', [\App\Http\Controllers\AirdropController::class, 'rating']);
    Route::post('/airdrop/result', [\App\Http\Controllers\AirdropController::class, 'result']);
});


<?php

use App\Models\UserTelegram;
use App\Service\VarDumper;
use Catchain\Ton\Address\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Telegram\Bot\Laravel\Facades\Telegram;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return 'Tap api: ' . env('APP_ENV');
});


Route::get('/test2', [\App\Http\Controllers\web\TestController::class, 'index']);
Route::get('/test/task317', [\App\Http\Controllers\web\TestController::class, 'task317']);
Route::get('/test3', [\App\Http\Controllers\web\TestController::class, 'index2']);
Route::get('/ships100', [\App\Http\Controllers\web\TestController::class, 'ships100']);
Route::get('/ton-address', [\App\Http\Controllers\web\TonAddressController::class, 'index']);

Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index']);
Route::get('/dashboard3', [\App\Http\Controllers\DashboardController::class, 'dashboard3']);

Route::get('/401', [\App\Http\Controllers\DashboardController::class, 'error401']);
Route::get('/403', [\App\Http\Controllers\DashboardController::class, 'error403']);
Route::get('/login', [\App\Http\Controllers\DashboardController::class, 'login']);

Route::middleware([\App\Http\Middleware\WebAuth::class])->group(function () {
    Route::get('/dashboard/upload', [\App\Http\Controllers\DashboardController::class, 'upload']);
    Route::post('/dashboard/upload-result', [\App\Http\Controllers\DashboardController::class, 'uploadResult']);

    Route::get('/dashboard/partner-list', [\App\Http\Controllers\DashboardController::class, 'partnerList']);
    Route::get('/dashboard/task-list', [\App\Http\Controllers\DashboardController::class, 'taskList']);
    Route::get('/dashboard/task-list-community', [\App\Http\Controllers\DashboardController::class, 'taskListCommunity']);
    Route::get('/dashboard/task-list-kols', [\App\Http\Controllers\DashboardController::class, 'taskListKols']);

    Route::get('/dashboard/task-add', [\App\Http\Controllers\DashboardController::class, 'taskAdd']);
    Route::post('/dashboard/task-add-post', [\App\Http\Controllers\DashboardController::class, 'taskAddPost']);

    Route::get('/dashboard/task-edit', [\App\Http\Controllers\DashboardController::class, 'taskEdit']);
    Route::post('/dashboard/task-edit-post', [\App\Http\Controllers\DashboardController::class, 'taskEditPost']);

    Route::post('/dashboard/reset-cache', [\App\Http\Controllers\DashboardController::class, 'resetCache']);
    Route::post('/dashboard/update-limit', [\App\Http\Controllers\DashboardController::class, 'updateLimit']);

    Route::get('/dashboard/app-config', [\App\Http\Controllers\DashboardController::class, 'appConfig']);
    Route::get('/dashboard/add-partner', [\App\Http\Controllers\DashboardController::class, 'addPartner']);
    Route::post('/dashboard/add-partner-post', [\App\Http\Controllers\DashboardController::class, 'addPartnerPost']);
    Route::post('/dashboard/partner-delete', [\App\Http\Controllers\DashboardController::class, 'partnerDelete']);

    Route::get('/dashboard/user-send', [\App\Http\Controllers\DashboardController::class, 'userSend']);
    Route::get('/dashboard/user-send-all', [\App\Http\Controllers\DashboardController::class, 'userSendAll']);
    Route::post('/dashboard/user-send-all-post', [\App\Http\Controllers\DashboardController::class, 'userSendAllPost']);

    Route::get('/dashboard/clear-cache', [\App\Http\Controllers\DashboardController::class, 'clearCache']);
    Route::get('/dashboard/stat', [\App\Http\Controllers\DashboardController::class, 'stat']);
    Route::get('/dashboard/feestats', [\App\Http\Controllers\DashboardController::class, 'feeStats']);
    Route::get('/dashboard/stat-group', [\App\Http\Controllers\DashboardController::class, 'statGroup']);
    Route::post('/dashboard/stat-post', [\App\Http\Controllers\DashboardController::class, 'statPost']);
    Route::get('/dashboard/users', [\App\Http\Controllers\DashboardController::class, 'users']);
    Route::get('/dashboard/user', [\App\Http\Controllers\DashboardController::class, 'user']);
    Route::get('/dashboard/user-stat', [\App\Http\Controllers\DashboardController::class, 'userStat']);
    Route::get('/dashboard/users-blocked', [\App\Http\Controllers\DashboardController::class, 'usersBlocked']);
    Route::post('/dashboard/user-block-post', [\App\Http\Controllers\DashboardController::class, 'userBlockPost']);

    Route::post('/dashboard/clear-cache', [\App\Http\Controllers\DashboardController::class, 'clearCache']);


    Route::get('/dashboard/market', [\App\Http\Controllers\DashboardController::class, 'market']);
    Route::get('/dashboard/stat', [\App\Http\Controllers\DashboardController::class, 'stat']);
    Route::get('/dashboard/stat-market', [\App\Http\Controllers\DashboardController::class, 'statMarket']);
    Route::get('/dashboard/stat-ships', [\App\Http\Controllers\DashboardController::class, 'statShips']);
    Route::get('/dashboard/nft-functional', [\App\Http\Controllers\DashboardController::class, 'nftFunctional']);
    Route::post('/dashboard/nft-functional-post', [\App\Http\Controllers\DashboardController::class, 'nftFunctionalPost']);

    Route::post('/dashboard/toggle-task', [\App\Http\Controllers\DashboardController::class, 'toggleTask']);
    Route::post('/dashboard/task-hide-toggle', [\App\Http\Controllers\DashboardController::class, 'taskHideToggle']);
    Route::post('/get-stats', [\App\Http\Controllers\DashboardController::class, 'getStats']);
    Route::post('/add-user-balance', [\App\Http\Controllers\DashboardController::class, 'addUserBalance']);
    Route::post('/get-wallet-balance', [\App\Http\Controllers\DashboardController::class, 'getWalletBalance']);

    Route::get('/dashboard/export-mmpro', [\App\Http\Controllers\DashboardController::class, 'exportMmpro']);
    Route::get('/dashboard/server', [\App\Http\Controllers\DashboardController::class, 'server']);

    Route::get('/dashboard/airdrop', [\App\Http\Controllers\DashboardController::class, 'airdrop']);
    Route::get('/dashboard/airdrop-request-list', [\App\Http\Controllers\DashboardController::class, 'airdropRequestList']);
    Route::get('/dashboard/airdrop-task-add', [\App\Http\Controllers\DashboardController::class, 'airdropTaskAdd']);
    Route::post('/dashboard/airdrop-task-add-post', [\App\Http\Controllers\DashboardController::class, 'airdropTaskAddPost']);
    Route::get('/dashboard/airdrop-task-edit', [\App\Http\Controllers\DashboardController::class, 'airdropTaskEdit']);
    Route::post('/dashboard/airdrop-task-edit-post', [\App\Http\Controllers\DashboardController::class, 'airdropTaskEditPost']);
    Route::post('/dashboard/airdrop-request-success', [\App\Http\Controllers\DashboardController::class, 'airdropRequestSuccess']);
    Route::post('/dashboard/airdrop-request-reject', [\App\Http\Controllers\DashboardController::class, 'airdropRequestReject']);

    Route::get('/logout', [\App\Http\Controllers\DashboardController::class, 'logout']);
});

Route::get('/telegram-widget', [\App\Http\Controllers\DashboardController::class, 'telegramWidget']);

Route::get('/captcha', [\App\Http\Controllers\CaptchaController::class, 'index']);
Route::post('/captcha/check', [\App\Http\Controllers\CaptchaController::class, 'check']);

Route::prefix('telegram')
    ->name('telegram.')
    ->withoutMiddleware([\App\Http\Middleware\VerifyCsrfToken::class])
    ->group(function () {
        Route::post('webhook', [\App\Http\Controllers\TelegramController::class, 'webhook'])->name('webhook-handle');
    });

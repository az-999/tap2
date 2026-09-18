<?php

namespace App\Http\Controllers;

use App\Http\Middleware\Airdrop;
use App\Models\AirdropTask;
use App\Models\AirdropUser;
use App\Models\AirdropWhitebitRequest;
use App\Models\LogBalance;
use App\Models\MintQueue;
use App\Models\MmproToken;
use App\Models\NftHistory;
use App\Models\NftSale;
use App\Models\Partner;
use App\Models\Session;
use App\Models\SessionArchive;
use App\Models\Task;
use App\Models\Transaction;
use App\Models\User;
use App\Models\UserGrant;
use App\Models\UserProfit;
use App\Models\UserTask;
use App\Models\UserTelegram;
use App\Models\WalletStats;
use App\Service\BaseStringHelper;
use App\Service\BaseVarDumper;
use App\Service\TonApi;
use Aws\S3\S3Client;
use Catchain\Ton\Address\Address;
use DateTimeImmutable;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\VarDumper\VarDumper;
use Telegram\Bot\Laravel\Facades\Telegram;

class DashboardController extends Controller
{
    /** @var UserTelegram */
    public $user;

    public $statsFetcher;

    const feeStatTypes = [
        'mint' => 'Минт',
        'burn' => 'Сжигание НФТ (сборка корабля)',
        'payment' => 'Входящие транзакции/оплата за минт',
        'royalty' => 'Роялти',
        'royalty_getgems' => 'Роялти с GetGems',
        'unknown' => 'Другой',
    ];

    public function __construct(Request $request)
    {
        $this->statsFetcher = new \App\Service\StatsFetcher();
    }

    public function index(Request $request)
    {
        if (\Illuminate\Support\Facades\Auth::check()) {
            return redirect('/dashboard/task-list-kols?sort=id&order=desc');
        } else {
            return redirect('401');
        }
    }


    /**
     * @param $tonapi TonApi
     */
    private function getBalance($tonapi, $address)
    {
        $result = $tonapi->getAccount($address);
        return $result['balance'] / 1000000000;
    }

    public function feeStats(Request $request)
    {
        $rawStats = WalletStats::getStatsSummary();
        $bounds = WalletStats::getBounds();
        $data = [];
        $walletsDesc = [];
        $tonapi = new TonApi(false);
        $wallets = config('app.watch-addresses');
        foreach ($wallets as $wallet) {
            $walletsDesc[$wallet['address']] = $wallet['name'];
        }
        foreach ($rawStats as $row) {
            if (!isset($data[$row['address']])) {
                $data[$row['address']] = ['name' => isset($walletsDesc[$row['address']]) ? $walletsDesc[$row['address']] : $row['address'], 'types' => []];
            }

            $data[$row['address']]['balance'] = $this->getBalance($tonapi, $row['address']);

            if (!isset($data[$row['address']][$row['type']])) {
                $data[$row['address']]['types'][$row['type']] = [];
            }

            $data[$row['address']]['types'][$row['type']] = [
                'name'   => isset(self::feeStatTypes[$row['type']]) ? self::feeStatTypes[$row['type']] : $row['type'],
                'value'  => $row['total_value'],
                'fees'   => $row['total_fees'],
                'income' => $row['total_income'],
                'locked' => $row['total_locked'],
                'count'  => $row['count'],
            ];
        }

        $cb = [];
        foreach(config('app.check-balance') as $item) {
            $cb[] = [
                'address' => $item['address'],
                'name' => $item['name'],
                'balance' => $this->getBalance($tonapi, $item['address']),
            ];
        }

        return view('dashboard/feestats', [
            'stats' => $data,
            'from' => $bounds['date_from'],
            'to' => $bounds['date_to'],
            'balances' => $cb
        ]);
    }

    public function stat(Request $request)
    {
        return view('dashboard/stat');
    }

    public function statShips(Request $request)
    {
        return view('dashboard/stat-ships');
    }

    public function statMarket(Request $request)
    {
        $d1 = date('Y-m-d');

        $dayTon = NftHistory::query()->where('action', 1)->selectRaw('sum(price) as s1')->whereRaw("date(created_at) = '$d1'")->first();
        $allTon = NftHistory::query()->where('action', 1)->selectRaw('sum(price) as s1')->first();


        $data = [
            'day' => [
                'count' => NftHistory::query()->where('action', 2)->whereRaw("date(created_at) = '$d1'")->count(),
                'ton'   => $dayTon['s1'],
            ],
            'all' => [
                'count' => NftHistory::query()->where('action', 2)->count(),
                'ton'   => $allTon['s1'],
            ],
        ];

        return view('dashboard/stat-market', $data);
    }

    public function statGroup(Request $request)
    {
        $data = $request->validate([
            'id' => 'required|integer',
        ]);

        $items = explode(',', $data['id']);

        return view('dashboard/stat-group', ['items' => $items]);
    }

    public function statPost(Request $request)
    {
        $data = $request->validate([
            'query' => 'required|string',
            'id'    => 'required|string',
        ]);


        $count = 0;
        if (BaseStringHelper::startsWith($data['id'], 'ship')) {
            $q1 = json_decode($data['query'], true);

            $query = MintQueue::query();
            foreach ($q1 as $i) {
                $query->where($i[0], $i[1]);
            }
            $count = $query->count();
        }
        if (BaseStringHelper::startsWith($data['id'], 'stat')) {
            $query = json_decode($data['query'], true);
            $class = \App\Service\Stat::getInstance();
            $function = $data['id'];
            if (method_exists($class, $function)) {
                $count = $class->$function($query);
            }
        }

        return response()->json([
            'count' => $count,
            'id'    => $data['id'],
        ]);
    }

    public function userSend(Request $request)
    {
        $data = [
            'bot_name'  => config('telegram.bots.mybot.name'),
            'is_auth'   => \Illuminate\Support\Facades\Auth::check(),
            'dev'       => false,
        ];

        $data['show_header'] = false;
        $data['show_main_dashboard'] = false;
        $data['show_simple_dashboard'] = true;

        if ($data['is_auth']) {
            $data['access'] = in_array(\Illuminate\Support\Facades\Auth::user()->chat_id, config('app.stat_user_list'));
        }

        return view('dashboard/user-send', $data);
    }

    public function userSendAll(Request $request)
    {
        return view('dashboard/user-send-all');
    }

    public function usersBlocked(Request $request)
    {
        $users = UserTelegram::query()->where('is_blocked', 1)->get();

        return view('dashboard/users-blocked', ['users' => $users]);
    }

    public function users(Request $request)
    {
        return view('dashboard/users');
    }

    public function user(Request $request)
    {
        $data = $request->validate([
            'id'    => 'integer|nullable',
            'token' => 'string|nullable',
        ]);

        if (isset($data['id'])) {
            $user = UserTelegram::findByTgId($data['id']);
        }
        if (isset($data['token'])) {
            $user = UserTelegram::query()->where('token', $data['token'])->first();
        }

        return view('dashboard/user', ['user' => $user]);
    }

    public function userStat(Request $request)
    {
        $data = $request->validate([
            'id'   => 'required|integer',
        ]);

        $user = UserTelegram::findByTgId($data['id']);
        $marketSum = NftSale::query()->where('tg_id', $data['id'])->where('status', 2)->selectRaw('sum(sale_price) as s1')->first();
        if (is_null($marketSum['s1'])) $marketSum['s1'] = 0;
        $mintShipDetailsSum = MintQueue::query()
            ->where('tg_id', $data['id'])
            ->where('nft_id',  6)
            ->whereIn('item_id',  [1,2,3,4,5])
            ->where('status', MintQueue::STATUS_COMPLETED)
            ->selectRaw('sum(amount) as s1')
            ->first();

        $passSum = MintQueue::query()
            ->where('tg_id', $data['id'])
            ->where('nft_id', 7)
            ->where('status', MintQueue::STATUS_COMPLETED)
            ->selectRaw('sum(amount) as s1')
            ->first();


        if (is_null($marketSum['s1'])) $marketSum['s1'] = 0;

        $stat = [
            'mint_ship_details' => [
                'count' => MintQueue::query()
                    ->where('tg_id', $data['id'])
                    ->whereIn('nft_id', [1,2,3,4,5])
                    ->where('status', MintQueue::STATUS_COMPLETED)
                    ->count(),
                'sum'   => $mintShipDetailsSum['s1'] / 1000000000,
            ],
            'pass' => [
                'count' => MintQueue::query()
                    ->where('tg_id', $data['id'])
                    ->where('nft_id', 7)
                    ->where('status', MintQueue::STATUS_COMPLETED)
                    ->count(),
                'sum'   => $passSum['s1'] / 1000000000,
            ],
            'market' => [
                'count' => NftSale::query()->where('tg_id', $data['id'])->where('status', 2)->count(),
                'sum'   => $marketSum['s1'],
            ],
            'task' => [
                'count' => \App\Models\UserTask::query()->where('chat_id', $user->chat_id)->count(),
            ],
        ];
        return view('dashboard/user-stat', ['user' => $user, 'stat' => $stat]);
    }


    public function userBlockPost(Request $request)
    {
        $data = $request->validate([
            'id'      => 'required|integer',
            'value'   => 'required|integer',
        ]);

        $user = UserTelegram::findByTgId($data['id']);
        $user->is_blocked = $data['value'];
        $user->save();

        return response()->json(['code' => 200]);
    }

    public function market(Request $request)
    {
        $d1 = date('Y-m-d');

        $dayTon = NftSale::query()->where('status', 2)->selectRaw('sum(sale_price) as s1')->whereRaw("date(created_at) = '$d1'")->first();
        $allTon = NftSale::query()->where('status', 2)->selectRaw('sum(sale_price) as s1')->first();

        $data = [
            'day' => [
                'count' => NftSale::query()->where('status', 2)->whereRaw("date(created_at) = '$d1'")->count(),
                'ton'   => $dayTon['s1'],
            ],
            'all' => [
                'count' => NftSale::query()->where('status', 2)->count(),
                'ton'   => $allTon['s1'],
            ],
        ];

        return view('dashboard/market', $data);
    }

    public function nftFunctional(Request $request)
    {
        $data = [
            'market'    => [
                'name'  => 'Market',
                'value' => Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'market', 1),
            ],
            'bumpstore' => [
                'name'  => 'Bump Store',
                'value' => Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'bumpstore', 1),
            ],
            'staking' => [
                'name'  => 'Staking',
                'value' => Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'staking', 1),
            ],
            'shipkraft' => [
                'name'  => 'Spaceship - Craft',
                'value' => Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'shipkraft', 1),
            ],
            'shiplevelup' => [
                'name'  => 'Spaceship - Level Up',
                'value' => Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'shiplevelup', 1),
            ],
            'shipcombine' => [
                'name'  => 'Spaceship - Combine',
                'value' => Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'shipcombine', 1),
            ],
            'ogpass' => [
                'name'  => 'OG Pass',
                'value' => Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'ogpass', 1),
            ],
            'spaceshipparts' => [
                'name'  => 'Spaceship Parts',
                'value' => Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'spaceshipparts', 1),
            ],
            'pirate' => [
                'name'  => 'Метки и Защита',
                'value' => Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'pirate', 1),
            ],
            'voucher' => [
                'name'  => 'Ваучеры',
                'value' => Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'voucher', 1),
            ],
            'mmprotoken' => [
                'name'  => 'MMpro Token',
                'value' => Cache::get('\App\Http\Controllers\DashboardController::nftFunctional:' . 'mmprotoken', 1),
            ],
        ];

        return view('dashboard/nft-functional', ['data' => $data]);
    }

    public function nftFunctionalPost(Request $request)
    {
        $data = $request->validate([
            'module'   => 'required|string',
            'value'    => 'required|string',
        ]);

        $module = $data['module'];
        $value = $data['value'];
        Cache::put('\App\Http\Controllers\DashboardController::nftFunctional:' . $module, $value);

        return [];
    }

    public function userSendAllPost(Request $request)
    {
        $data = $request->validate([
            'tg_id_list' => 'required|string',
            'amount'     => 'required|integer',
            'comment'    => 'string',
        ]);

        $users = $data['tg_id_list'];
        $usersList = explode(',', $users);
        $idList = [];
        foreach ($usersList as $u) {
            $item = trim($u);
            if (preg_match('/\D/', $item) == 0) {
                // это tg_id
                $idList[] = $item;
            }
        }
        $notFound = [];
        $Found = [];
        $author_id = \Illuminate\Support\Facades\Auth::user()->chat_id;
        foreach ($idList as $tg_id) {
            $u = UserTelegram::where('chat_id', $tg_id)->first();
            if (is_null($u)) {
                $notFound[] = $tg_id;
                continue;
            } else {
                $Found[] = $tg_id;
            }

            $profit = UserGrant::create([
                'tg_id'     => $tg_id,
                'author_id' => $author_id,
                'amount'    => $data['amount'],
                'time'      => time(),
                'comment'   => $data['comment'] ?? '',
            ]);
        }

        if (count($notFound) > 0) {
            return  response()->json([
                'success'  => false,
                'message' => 'Начисление сделано для: '.count($Found).'. Не найдены ' . join(', ', $notFound),
            ]);
        }

        return response()->json([
            'success'  => true,
        ]);
    }

    public function appConfig(Request $request)
    {
        \App\Service\VarDumper::dump(config('app'));
    }

    public function error401(Request $request)
    {
        return view('401', ['dev' => false, 'bot_name' => config('telegram.bots.mybot.name')]);
    }

    public function error403(Request $request)
    {
        return view('403', ['dev' => false, 'bot_name' => config('telegram.bots.mybot.name')]);
    }

    public function taskList(Request $request)
    {
        return view('dashboard/task-list');
    }

    public function taskListCommunity(Request $request)
    {
        return view('dashboard/task-list-community');
    }

    public function taskListKols(Request $request)
    {
        return view('dashboard/task-list-kols');
    }

    public function taskAdd(Request $request)
    {
        $data = [
            'bot_name'  => config('telegram.bots.mybot.name'),
            'dev'       => false,
        ];

        $data['show_header'] = false;
        $data['show_main_dashboard'] = false;
        $data['show_simple_dashboard'] = true;

        return view('dashboard/task-add', $data);
    }

    public function airdrop(Request $request)
    {
        return view('dashboard/airdrop');
    }

    public function airdropRequestList(Request $request)
    {
        return view('dashboard/airdrop-request-list');
    }

    public function airdropTaskAdd(Request $request)
    {
        return view('dashboard/airdrop-task-add');
    }

    public function airdropTaskEdit(Request $request)
    {
        $data = $request->validate([
            'id'   => 'required|integer',
        ]);

        $data = [
            'model'  => AirdropTask::query()->find($data['id']),
        ];

        return view('dashboard/airdrop-task-edit', $data);
    }


    public function airdropTaskEditPost(Request $request)
    {
        $data = $request->validate([
            'id'          => 'required|integer',
            'name'        => 'required|string',
            'description' => 'required|string',
            'amount'      => 'required|string',
            'icon'        => 'nullable|string',
            'type'        => 'nullable|integer',
            'count'       => 'nullable|string',
            'instruction' => 'nullable|string',
        ]);

        $task = AirdropTask::query()->find($data['id']);
        foreach ($data as $key => $value) {
            $task->$key = $value;
        }
        $res = $task->save();

        AirdropTask::clearCache();

        return response()->json([
            'code' => 200,
        ]);
    }

    public function airdropTaskAddPost(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string',
            'description' => 'required|string',
            'amount'      => 'required|string',
            'icon'        => 'nullable|string',
            'type'        => 'nullable|integer',
            'count'       => 'nullable|string',
            'instruction' => 'nullable|string',
        ]);

        if (in_array($data['type'], [1,3])) {
            $data['count'] = 0;
        }

        $task = new AirdropTask();
        foreach ($data as $key => $value) {
            $task->$key = $value;
        }
        $res = $task->save();

        Task::clearCache();

        return response()->json([
            'code' => 200,
        ]);
    }


    public function addPartner(Request $request)
    {
        $data = [
            'bot_name'  => config('telegram.bots.mybot.name'),
            'dev'       => false,
        ];

        $data['show_header'] = false;
        $data['show_main_dashboard'] = false;
        $data['show_simple_dashboard'] = true;

        return view('dashboard/add-partner', $data);
    }

    public function taskEdit(Request $request)
    {
        $data = $request->validate([
            'id'   => 'required|integer',
        ]);
        $p = Task::query()->find($data['id']);
        $life_timeDec = ($p->life_time + (is_null($p->life_time_start_at)? 0 : time() - $p->life_time_start_at)) / (60*60);
        $min = (int)$life_timeDec;
        $sec = (int)(($life_timeDec - $min) * 60);
        $min = ($min < 10) ? '0' . $min : $min;
        $sec = ($sec < 10) ? '0' . $sec : $sec;

        $data = [
            'dev'       => false,
            'model'     => $p,
            'life_time' => $min.':'.$sec,
        ];

        return view('dashboard/task-edit', $data);
    }

    public function taskEditPost(Request $request)
    {
        $data = $request->validate([
            'id'                     => 'required|integer',
            'group'                  => 'required|integer',
            'name'                   => 'required|string',
            'link'                   => 'required|string',
            'price'                  => 'required|string',
            'icon'                   => 'nullable|string',
            'partner_id'             => 'nullable|integer',
            'checker'                => 'nullable|string',
            'checker_options'        => 'nullable|integer',
            'language_filter'        => 'nullable|string',
            'language_filter_except' => 'nullable|string',
            'is_premium'             => 'nullable|integer',
            'geo_target'             => 'nullable|string',
            'geo_target_except'      => 'nullable|string',
        ]);

        switch ($data['checker']) {
            case 'App\Service\TelegramChecker':
                if (isset($data['checker_options'])) {
                    if ($data['checker_options']) {
                        $data['checker_options'] = json_encode(['chat_id' => (int)$data['checker_options']]);
                    }
                }
                break;
            case 'App\Service\TrueChecker':
                $data['checker_options'] = '{"chat_id":1}';
                break;
            default:
                $data['checker_options'] = '';
                break;
        }

        $task = Task::query()->find($data['id']);
        foreach ($data as $key => $value) {
            $task->$key = $value;
        }
        $res = $task->save();

        Task::clearCache();

        return response()->json([
            'code' => 200,
        ]);
    }

    public function taskAddPost(Request $request)
    {
        $data = $request->validate([
            'name'                   => 'required|string',
            'link'                   => 'required|string',
            'price'                  => 'required|string',
            'language_filter'        => 'nullable|string',
            'language_filter_except' => 'nullable|string',
            'group'                  => 'required|integer',
            'icon'                   => 'nullable|string',
            'checker'                => 'required|string',
            'checker_options'        => 'nullable|string',
            'limit'                  => 'nullable|integer',
            'partner_id'             => 'nullable|integer',
            'is_premium'             => 'nullable|integer',
            'geo_target'             => 'nullable|string',
            'geo_target_except'      => 'nullable|string',
        ]);

        $data['type'] = 1;
        $data['status'] = 1;
        $data['is_active'] = 0;
        $data['is_hide'] = 1;

        if (isset($data['checker_options'])) {
            if ($data['checker_options']) {
                $data['checker_options'] = json_encode(['chat_id' => $data['checker_options']]);
            } else {
                $data['checker_options'] = json_encode(['chat_id' => 1]);
            }
        } else {
            $data['checker_options'] = json_encode(['chat_id' => 1]);
        }

        $task = new Task();
        foreach ($data as $key => $value) {
            $task->$key = $value;
        }
        $res = $task->save();
        $task->sort_index = $task->id;
        $res = $task->save();

        Task::clearCache();

        return response()->json([
            'code' => 200,
        ]);
    }


    public function addPartnerPost(Request $request)
    {
        $data = $request->validate([
            'name'   => 'required|string',
            'ref_id' => 'nullable|integer',
        ]);
        $data['key'] = 1;

        $i = Partner::create($data);

        return response()->json(['code' => 200]);
    }

    public function partnerList(Request $request)
    {
        $data = [
            'bot_name'  => config('telegram.bots.mybot.name'),
            'is_auth'   => \Illuminate\Support\Facades\Auth::check(),
            'dev'       => false,
        ];

        $data['show_header'] = false;
        $data['show_main_dashboard'] = false;
        $data['show_simple_dashboard'] = true;

        if ($data['is_auth']) {
            $data['access'] = in_array(\Illuminate\Support\Facades\Auth::user()->chat_id, config('app.stat_user_list'));
        }

        return view('dashboard/partner-list', $data);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        return redirect('/dashboard');
    }

    public function dashboard3(Request $request)
    {
        if (config('app.env') != 'prod') {
            $fields = $request->validate([
                'id' => 'integer',
            ]);
            if (!isset($fields['id'])) {
                // $fields['id'] = 122605414;
                $fields['id'] = 930168893;
            }
            if (!$fields['id']) {
                $fields['id'] = 930168893;
                // $fields['id'] = 122605414;
            }
            $u = UserTelegram::query()->where('chat_id', $fields['id'])->first();
            Auth::login($u);

            return redirect('dashboard');
        }
    }

    public function addUserBalance(Request $request)
    {
        $data = $request->validate([
            'tg_id' => 'required|integer',
            'amount' => 'required|integer',
            'comment' => 'string',
        ]);

        $u = UserTelegram::where('chat_id', $data['tg_id'])->first();
        if (is_null($u)) {
            return response()->json(['message' => 'Не найден пользователь', 'success' => false]);
        }

        $profit = UserGrant::create([
            'tg_id'     => $data['tg_id'],
            'author_id' => \Illuminate\Support\Facades\Auth::user()->chat_id,
            'amount'    => $data['amount'],
            'time'      => time(),
            'comment'   => $data['comment'] ?? '',
        ]);

        return response()->json([
            'success' => true,
            'id'      => $profit->id,
            'tg_id'   => $profit->tg_id,
            'author'  => $profit->author_id,
            'value'   => $profit->amount,
            'time'    => $profit->time,
            'comment' => $profit->comment,
            'log_id'  => null,
        ]);
    }

    public function server(Request $request)
    {
        \App\Service\VarDumper::dump([
            $_SERVER,
            $request->headers
        ]);
    }

    public function toggleTask(Request $request)
    {
        $data = $request->validate([
            'id' => 'required|integer',
        ]);

        /** @var Task $task */
        $task = Task::query()->find($data['id']);
        if ($task->is_active == 1) {
            // скрываю
            $task->is_active = 0;

            if ($task->is_hide == 0) {
                $life_time = time() - $task->life_time_start_at;
                $task->life_time += $life_time;
                $task->life_time_start_at = null;

            } else {
                // ничего не делаю
            }

        } else {
            // показываю
            $task->is_active = 1;

            if ($task->is_hide == 0) {
                $task->life_time_start_at = time();
            } else {
                // ничего не делаю
            }
        }
        $task->save();

        sleep(1);
        Task::clearCache();

        return response()->json([
            'success' => true,
        ]);
    }

    public function taskHideToggle(Request $request)
    {
        $data = $request->validate([
            'id' => 'required|integer',
        ]);

        /** @var \App\Models\Task $task */
        $task = Task::query()->find($data['id']);
        if ($task->is_hide == 1) {
            // показываю
            $task->is_hide = 0;

            if ($task->is_active == 1) {
                $task->life_time_start_at = time();
            } else {
                // ничего не делаю
            }

        } else {
            // скрываю
            $task->is_hide = 1;

            if ($task->is_active == 1) {
                // остановливаю
                $life_time = time() - $task->life_time_start_at;
                $task->life_time += $life_time;
                $task->life_time_start_at = null;
            } else {
                // ничего не делаю
            }
        }
        $task->save();

        sleep(1);
        Task::clearCache();

        return response()->json([
            'success' => true,
        ]);
    }

    public function partnerDelete(Request $request)
    {
        $data = $request->validate([
            'id' => 'required|integer',
        ]);

        Task::query()->where('partner_id', $data['id'])->update(['partner_id' => null]);
        $Partner = Partner::query()->find($data['id']);
        $Partner->delete();

        return response()->json([
            'success' => true,
        ]);
    }

    public function updateLimit(Request $request)
    {
        $data = $request->validate([
            'id'    => 'required|integer',
            'value' => 'required|integer',
        ]);

        $task = Task::query()->find($data['id']);
        $task->limit = $data['value'];
        $task->save();

        Task::clearCache();

        return response()->json([
            'success' => true,
        ]);
    }

    public function resetCache(Request $request)
    {
        Task::clearCache();

        return response()->json([
            'success' => true,
        ]);
    }

    public function clearCache(Request $request)
    {
        $data = $request->validate([
            'id'   => 'required|integer',
        ]);

        $user = UserTelegram::findByTgId($data['id']);

        if (is_null($user)) {
            return response()->json(['code' => 404], 404);
        }
        Cache::forget('user.'.$user->id);
        Cache::forget('user.chat_id.'.$user->chat_id);

        return response()->json(['code' => 200]);
    }

    public function getWalletBalance(Request $request) {
        $data = $request->validate([
            'address' => 'string|required',
        ]);

        $tonapi = new TonApi(false);
        $balance = $this->getBalance($tonapi, $data['address']);

        return response()->json(['success' => true, 'balance' => $balance]);
    }

    public function getStats(Request $request)
    {
        $req = $request->validate([
            'target' => 'string|required',
        ]);

        switch ($req['target']) {
            case 'wallet-count':
                $count = $this->statsFetcher->getWalletCount();
                return response()->json(['success' => true, 'count' => $count]);

            case 'users-count':
                $count = $this->statsFetcher->getUsersCount();
                return response()->json(['success' => true, 'count' => $count]);

            case 'tasks-count':
                $req = $request->validate([
                    'task_id' => 'integer|required',
                ]);

                $count = $this->statsFetcher->getTasksCount($req['task_id']);
                return response()->json(['success' => true, 'count' => $count]);

            case 'partner-count':
                $req = $request->validate([
                    'id' => 'integer|required',
                ]);

                $count = $this->statsFetcher->getPartnerCount($req['id']);
                return response()->json(['success' => true, 'count' => $count]);

            default:
                return response()->json(['success' => false, 'message' => 'Неизвестная команда']);
        }
    }

    public function exportMmpro(Request $request)
    {
        $txList = [];
        $list = MmproToken::query()->where('status', 1)->get()->toArray();
        foreach ($list as $i) {
            $txid = $i['txid'];
            if (!isset($txList[$txid])) {
                $txList[$txid] = [
                    'address' => Address::parse($i['address'])->toString(true, true,true),
                    'amount'  => $i['amount'],
                ];
            }
        }
        $addressList = [];
        foreach ($txList as $tx) {
            $address = $tx['address'];
            if (!isset($addressList[$address])) {
                $addressList[$address] = $tx['amount'];
            } else {
                $addressList[$address] += $tx['amount'];
            }
        }
        $rows = [];
        foreach ($addressList as $address => $amount) {
            $rows[] = "$address, $amount";
        }
        $fileName = time() . '.csv';
        $path = '/application/storage/framework/cache/' . $fileName;
        file_put_contents($path, join(PHP_EOL, $rows));

        return response()->download($path, $fileName);
    }

    public function telegramWidget(Request $request)
    {
        $data = $request->validate([
            'hash'       => 'string|required',
            'auth_date'  => 'string',
            'photo_url'  => 'string',
            'username'   => 'string',
            'last_name'  => 'string',
            'first_name' => 'string',
            'id'         => 'string|required',
        ]);

        $token = config('telegram.bots.admin.token');

        try {
            $auth_data = self::checkTelegramAuthorization($data, $token);
            self::saveTelegramUserData($auth_data);

        } catch (\Throwable $e) {
            throw new \Exception($e->getMessage());
        }

        $u = UserTelegram::where('chat_id', $auth_data['id'])->first();
        if (is_null($u)) {
            throw new Exception('Не найден пользователь');
        }
        Auth::login($u);

        return redirect('/dashboard');
    }

    public static function checkTelegramAuthorization($auth_data, $token)
    {
        $check_hash = $auth_data['hash'];
        unset($auth_data['hash']);
        $data_check_arr = [];
        foreach ($auth_data as $key => $value) {
            $data_check_arr[] = $key . '=' . $value;
        }
        sort($data_check_arr);
        $data_check_string = implode("\n", $data_check_arr);

        $secret_key = hash('sha256', $token, true);
        $hash = hash_hmac('sha256', $data_check_string, $secret_key);
        if (strcmp($hash, $check_hash) !== 0) {
            throw new \Exception('Data is NOT from Telegram');
        }
        if ((time() - $auth_data['auth_date']) > 86400) {
            throw new \Exception('Data is outdated');
        }
        return $auth_data;
    }

    public static function  saveTelegramUserData($auth_data)
    {
        $auth_data_json = json_encode($auth_data);

        setcookie('tg_user', $auth_data_json);
    }


    public function upload(Request $request)
    {
        return view('dashboard/upload');
    }

    public function airdropRequestSuccess(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $data = $request->validate([
            'id'   => 'integer|string',
        ]);

        // Добавляю заявку
        $row = AirdropWhitebitRequest::query()->find($data['id']);

        $row->status = AirdropWhitebitRequest::STATUS_SUCCESS;
        $row->save();

        return response()->json([
            'code' => 200,
        ]);
    }

    public function airdropRequestReject(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $data = $request->validate([
            'id'   => 'integer|string',
        ]);

        // Добавляю заявку
        $row = AirdropWhitebitRequest::query()->find($data['id']);

        $row->status = AirdropWhitebitRequest::STATUS_REJECT;
        $row->save();

        return response()->json([
            'code' => 200,
        ]);
    }

    public function uploadResult(Request $request)
    {
        $c = file_get_contents($_FILES['file']['tmp_name']);
        $pathinfo = pathinfo($_FILES['file']['name']);
        $bucketName = "tap-static";
        $region = "nl-ams";

        $s3 = new S3Client([
            'region'      => $region,
            'endpoint'    => 'https://s3.nl-ams.scw.cloud',
            'credentials' => [
                'key'    => env('AWS_ACCESS_KEY_ID'),
                'secret' => env('AWS_SECRET_ACCESS_KEY'),
            ],
        ]);

        $timeZone = "UTC";

        date_default_timezone_set($timeZone);

        $file_name = 'partner/'.date('Ymd') . '_' . str()->random() . '.' . $pathinfo['extension'];

        $result = $s3->putObject([
            'Bucket'      => $bucketName,
            'Key'         => $file_name,
            'Body'        => $c,
            'ACL'         => 'public-read',
            'ContentType' => 'image/' . $pathinfo['extension'],
        ]);

        return view('dashboard/upload-result', ['url' => $result['ObjectURL']]);
    }
}

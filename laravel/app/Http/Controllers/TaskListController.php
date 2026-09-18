<?php

namespace App\Http\Controllers;

use App\Models\LogBalance;
use App\Models\LogError;
use App\Models\Session;
use App\Models\Task;
use App\Models\Transaction;
use App\Models\UserTask;
use App\Models\UserTelegram;
use App\Service\BaseArrayHelper;
use App\Service\BaseVarDumper;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Symfony\Component\VarDumper\VarDumper;


/**
 *
 */
class TaskListController extends Controller
{
    /** @var UserTelegram */
    public $user;

    private function getTaskList()
    {
        return Task::getAllFromCache();
    }

    public function __construct(Request $request)
    {
        $this->user = \App\Http\Middleware\FarmAuth::$user;
    }

    public function index(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $fields = $request->validate([
            'language' => ['string'],
            'is_premium' => ['integer'],
        ]);

        $taskList = Task::getAll2();

        Log::info(\App\Service\VarDumper::dumpAsString($taskList[0]), ['\App\Http\Controllers\TaskListController::index']);

        $completed = UserTask::where('chat_id', $user->chat_id)->select('task_id', 'claimed_at', 'is_claimed')->get()->toArray();
        $keys = Arr::keyBy($completed, 'task_id');

        $new = [];
        foreach ($taskList as $task) {
            $n = $task;

            if (!$this->validate2($task, $fields)) {
                continue;
            }

            // заменяю ссылкку если она динамическая
            if (Str::position($n['url'], '{telegram_id}') !== false) {
                $n['url'] = Str::replace('{telegram_id}', $user->chat_id, $n['url']);
            }
            if (Str::position($n['url'], '{token}') !== false) {
                $n['url'] = Str::replace('{token}', \App\Http\Middleware\ApiAuth::$token, $n['url']);
            }

            // ставлю статус таска
            if (isset($keys[$task['id']])) {
                $userTask = $keys[$task['id']];

                if ($userTask['is_claimed'] == 1) {
                    $n['status'] = 'granted';
                    $n['claimed_at'] = $userTask['claimed_at'];
                } else {
                    $n['status'] = 'possible';
                }

            } else {
                $n['status'] = 'possible';
            }

            $new[] = $n;
        }


        return response()->json($new);
    }

    /**
     * Возвращает флаг: Выдавать пользователю таск `$task` при натройках пользователя `$fields`?
     *
     * @param array $task
     * @param array $fields
     * @return bool
     */
    public function validate2($task, $fields)
    {
        $language = isset($fields['language']) ? $fields['language'] : '';
        $is_premium = isset($fields['is_premium']) ? $fields['is_premium'] : 0;
        $user = \App\Http\Middleware\FarmAuth::$user;

        // таргет по Премиум аккаунту
        if ($task['is_premium'] == 1) {
            if ($is_premium == 0) return false;
        }

        // таргет по языку
        if ($language) {
            try {
                if (is_array($task['language_filter'])) {
                    if (count($task['language_filter']) > 0) {
                        if (in_array($language, $task['language_filter']) == false) return false;
                    }
                }
                if (is_array($task['language_filter_except'])) {
                    if (count($task['language_filter_except']) > 0) {
                        if (in_array($language, $task['language_filter_except']) == true) return false;
                    }
                }
            } catch (\Throwable $e) {
                Log::info(\App\Service\VarDumper::dumpAsString([
                    $task,
                    $e->getMessage(),
                    $e->getTraceAsString(),
                ]));
                return false;
            }
        }

        // таргет по платежеспособным
        try {
            if ($task['has_one_pay'] > 0) {
                if ($user->has_one_pay == UserTelegram::HAS_ONE_PAY_ORDER) {
                    return false;
                } else {
                    if ($user->has_one_pay != UserTelegram::HAS_ONE_PAY_YES_TRANSACTION) return false;
                }
            }
        } catch (\Throwable $e) {
            Log::info(\App\Service\VarDumper::dumpAsString([
                $e->getMessage(),
                $e->getTraceAsString(),
            ]));
        }


        // таргет по кошельку
        try {
            if ($task['has_wallet'] > 0) {
                if (is_null($user->token)) return false;
            }
        } catch (\Throwable $e) {
            Log::info(\App\Service\VarDumper::dumpAsString([
                $e->getMessage(),
                $e->getTraceAsString(),
            ]));
        }

        // GeoTarget
        try {
            if (is_array($task['geo_target'])) {
                if (count($task['geo_target']) > 0) {
                    $country_user = self::getUserCountry();
                    if (is_null($country_user)) return false;
                    if (in_array($country_user, $task['geo_target']) == false) return false;
                }
            }
            if (is_array($task['geo_target_except'])) {
                if (count($task['geo_target_except']) > 0) {
                    $country_user = self::getUserCountry();
                    if (is_null($country_user)) return false;
                    if (in_array($country_user, $task['geo_target_except']) == true) return false;
                }
            }
        } catch (\Throwable $e) {

        }

        return true;
    }

    /**
     * @return string
     */
    public static function getUserIP()
    {
        $default = '178.176.218.65';
        if (!isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            return $default;
        }
        $str = $_SERVER['HTTP_X_FORWARDED_FOR'];
        $arr = explode(',', $str);
        if (count($arr) < 2) return $default;

        return trim($arr[0]);
    }

    /**
     * @return string|null
     */
    public static function getUserCountry()
    {
        if (isset($_SERVER['HTTP_CF_IPCOUNTRY'])) {
            return strtoupper($_SERVER['HTTP_CF_IPCOUNTRY']);
        }
        $ip = self::getUserIP();
        if (strpos($ip, '.') === false) {
            return null;
        }
        $country = \Illuminate\Support\Facades\Session::get('\App\Http\Controllers\TaskListController::getUserCountry');
        if (!$country) {
            $country = \App\Service\ip\Main::convert($ip,'\App\Service\ip\IpApiCom');
            \Illuminate\Support\Facades\Session::put('\App\Http\Controllers\TaskListController::getUserCountry', $country);
        }

        return strtoupper($country);
    }

    public static function logDB($string)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;
        if ($user->chat_id == 122605414) {
            LogError::add($string);
        }
    }

    public function clear(Request $request)
    {
        $user = \App\Http\Middleware\FarmAuth::$user;
        Cache::forget('task_list');

        return response()->json(['code' => 200]);
    }

    public function complete(Request $request)
    {
        $fields = $request->validate([
            'id' => ['required'],
        ]);
        $user = \App\Http\Middleware\FarmAuth::$user;

        // Валидация
        $userTask = UserTask::where('chat_id', $user->chat_id)->where('task_id', $fields['id'])->first();
        if (!is_null($userTask)) {
            if ($userTask->is_claimed == 1) {
                return response()->json([
                    'code'     => 400,
                    'message'  => 'Эта задача уже выполнена',
                ], 400);
            }
        }

        $taskList = $this->getTaskList();
        $keys = Arr::keyBy($taskList, 'id');
        $task = $keys[$fields['id']];

        if ($task['is_active'] == 0) {
            return response()->json([
                'code'     => 400,
                'message'  => 'Эта задача не активна',
            ], 400);
        }

        {   // Проверяю задание
            $checker_options = json_decode($task['checker_options'], 1);
            $className = $task['checker'];

            // генерирую объект для проверки
            switch ($className) {
                case \App\Service\AppStoreTrackerChecker::class:
                case \App\Service\checker\TrustWallet::class:
                    $checkerObject = new $className([
                        'user_task' => $userTask,
                        'user_id'   => $user->chat_id,
                    ]);
                    break;

                case \App\Service\TelegramChecker::class:
                case \App\Service\TelegramBoostChecker::class:
                    $checkerObject = new $className($checker_options['chat_id'], $user->chat_id);
                    break;

                default:
                    $params = BaseArrayHelper::merge($checker_options, ['user_id' => $user->chat_id]);
                    $checkerObject = new $className($params);
                    break;

            }

            try {
                $result = $checkerObject->check();
            } catch (\Throwable $e) {
                unset($task['checker']);
                $task['status'] = 'possible';

                return response()->json([
                    'balance' => $user->balance,
                    'task'    => $task,
                ]);
            }
        }

        unset($task['checker']);
        $task['grant'] = $task['price'];
        unset($task['price']);

        // Если не выполнил?
        if (!$result) {
            $task['status'] = 'possible';

            return response()->json([
                'balance' => $user->balance,
                'task'    => $task,
            ]);
        } else {
            $task['status'] = 'granted';
        }

        if (!$userTask) {
            UserTask::create([
                'chat_id'    => $user->chat_id,
                'task_id'    => $fields['id'],
                'is_claimed' => 1,
                'claimed_at' => time(),
            ]);
        } else {
            $userTask->is_claimed = 1;
            $userTask->claimed_at = time();
            $userTask->save();
        }

        $price = $task['grant'];
        $user->balanceAdd($price, LogBalance::TYPE_TASK);

        return response()->json([
            'balance' => $user->balance,
            'task'    => $task,
        ]);
    }

    public function dropAll(Request $request)
    {
        if (config('app.env') != 'prod') {
            $user = \App\Http\Middleware\FarmAuth::$user;

            UserTask::where('chat_id', $user->chat_id)->delete();

            return response()->json([]);
        }
    }

}

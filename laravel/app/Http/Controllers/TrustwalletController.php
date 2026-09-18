<?php

namespace App\Http\Controllers;

use App\Models\Session;
use App\Models\Transaction;
use App\Models\Trustwallet;
use App\Models\UserTask;
use App\Models\UserTelegram;
use App\Service\BaseVarDumper;
use App\Service\TelegramLogger;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\VarDumper\VarDumper;
use Illuminate\Support\Collection;

class TrustwalletController extends Controller
{
    public function index(Request $request)
    {
        /** @var UserTelegram  $user1 */
        $user1 = \App\Http\Middleware\FarmAuth::$user;

        $fields = $request->validate([
            'address' => ['required', 'string'],
        ]);

        $task_id = 89;
        $w = UserTask::query()
            ->where('chat_id', $user1['chat_id'])
            ->where('task_id', $task_id)
            ->first();

        if (is_null($w)) {
            UserTask::query()->create([
                'task_id'    => $task_id,
                'chat_id'    => $user1['chat_id'],
                'is_claimed' => 0,
            ]);
        }

        return response()->json([
            'code'     => 200,
        ]);
    }

}

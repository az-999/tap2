<?php

namespace App\Http\Controllers;
use App\Models\UserTask;
use App\Models\UserTelegram;
use App\Service\VarDumper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/**
 * Контроллер для приема call-back
 */
class AppStoreTrackerController extends Controller
{
    public $taskList = [
        '36025c198335d1bcf3a7' => 67,
        'b4553a6c965781b039c3' => 68,
        'b7977d6e8186d85724ec' => 90,
        '6791db24ec0fad3feb24' => 646,
        '46a067beaae87e098b6c' => 647,
    ];


    public function successСallback(Request $request)
    {
        Log::info(VarDumper::dumpAsString($request));
        try {
            $data = $request->validate([
                'key' => 'required|string',
                'id'  => 'required|integer',
            ]);

            if (!isset($this->taskList[$data['key']])) {
                return response()->json([
                    'code'     => 400,
                    'message'  => 'Не найден таск по ключу',
                ], 400);
            }
            $task_id = $this->taskList[$data['key']];

            $userTask = UserTask::where('chat_id', $data['id'])->where('task_id', $task_id)->first();
            if (is_null($userTask)) {
                $userTask = UserTask::create([
                    'chat_id' => $data['id'],
                    'task_id' => $task_id,
                ]);
            };

        } catch (\Throwable $e) {
            return response()->json([
                'code'     => 400,
                'message'  => $e->getMessage(),
            ], 400);
        }

        return response()->json(['success' => true]);
    }

}

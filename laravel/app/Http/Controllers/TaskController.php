<?php

namespace App\Http\Controllers;
use App\Models\UserTask;
use App\Models\UserTelegram;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public $partner;

    public function __construct(Request $request) {
        $this->partner = \App\Http\Middleware\PartnerAuth::$partner;
    }

    public function validateTask(Request $request)
    {
        try {
            $data = $request->validate([
                'tg_id' => 'required|integer',
                'task_id' => 'required|integer',
            ]);

            if (UserTask::where('chat_id', $data['tg_id'])->where('task_id', $data['task_id'])->exists()) {
                return response()->json(['success' => true, 'exists' => true]);
            }
        } catch (\Throwable $e) {
            return response()->json([
                'code'     => 400,
                'message'  => $e->getMessage(),
            ], 400);
        }

        return response()->json(['success' => true, 'exists' => false]);
    }

    public function validateYescoin(Request $request)
    {
        try {
            $data = $request->validate([
                'tg_id' => 'required|integer',
            ]);

            if (UserTelegram::where('chat_id', $data['tg_id'])->where('ref_id', 8)->exists()) {
                return response()->json(['success' => true, 'exists' => true]);
            }
        } catch (\Throwable $e) {
            return response()->json([
                'code'     => 400,
                'message'  => $e->getMessage(),
            ], 400);
        }

        return response()->json(['success' => true, 'exists' => false]);
    }
}

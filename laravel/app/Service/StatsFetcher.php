<?php
namespace App\Service;

use App\Models\Partner;
use App\Models\UserTask;
use App\Models\UserTelegram;

class StatsFetcher
{

    public function getWalletCount(): int
    {
        return UserTelegram::query()->whereNotNull('token')->count();
    }

    public function getUsersCount(): int
    {
        return \Illuminate\Support\Facades\Cache::store('memcached')->get('\App\Console\Commands\calc_all_users::all_users:memcached') ?? 0;
    }

    public function getTasksCount(int $taskId): int
    {
        return UserTask::where('task_id', $taskId)->count();
    }

    public function getPartnerCount(int $id): int
    {
        $p = Partner::query()->find($id);
        return UserTelegram::where('ref_id', $p->ref_id)->count();
    }
}

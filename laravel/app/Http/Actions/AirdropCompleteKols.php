<?php

namespace App\Http\Actions;

use App\Http\Middleware\Airdrop;
use App\Models\AirdropKols;
use App\Models\UserTask;
use App\Service\VarDumper;

class AirdropCompleteKols
{


    public function run()
    {
        $user = \App\Http\Middleware\FarmAuth::$user;

        $kols = AirdropKols::findOrCreate($user->chat_id);

        // Проверяю нету ли $data['id'] в массиве $kols->ids
        $ids_airdrop = $kols->getIds();

        $ids_kols = UserTask::query()
            ->where('chat_id', $user->chat_id)
            ->select('task_id')
            ->pluck('task_id')
            ->toArray()
        ;

        $intersect = self::arrayIntersect($ids_airdrop, $ids_kols);

        $count = count($intersect['add']);
        $kols->addIds($intersect['add']);

        Airdrop::$AirdropUser->balance_ap += $count;
        Airdrop::$AirdropUser->task4_total_earned += $count;
        Airdrop::$AirdropUser->save();

        return response()->json([
            'balance_ap'   => Airdrop::$AirdropUser->balance_ap,
            'grant'        => $count,
            'total_earned' => Airdrop::$AirdropUser->task4_total_earned,
        ]);
    }


    /**
     * @param array $a1 - новые
     * @param array $a2 - старые
     * @return array[]
     */
    public static function arrayIntersect($a1, $a2)
    {
        $add = [];
        $delete = [];
        $update = [];
        foreach ($a2 as $i) {
            if (!in_array($i,$a1)) {
                $add[] = $i;
            }
        }
        foreach ($a1 as $i) {
            if (!in_array($i,$a2)) {
                $delete[] = $i;
            }
        }
        foreach ($a1 as $i) {
            if (in_array($i,$a2)) {
                $update[] = $i;
            }
        }

        return [
            'add'    => $add,
            'update' => $update,
            'delete' => $delete,
        ];
    }

}

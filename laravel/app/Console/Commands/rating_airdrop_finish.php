<?php

namespace App\Console\Commands;

use App\Models\AirdropUser;
use App\Models\Config;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class rating_airdrop_finish extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:rating_airdrop_finish';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $content = file_get_contents('/application/app/airdrop_user.csv');
        $arr = explode("\n", $content);
        $c = 0;
        foreach ($arr as $r) {
            if ($c == 0) {
                $c++;
                continue;
            }
            $arr2 = explode(";", $r);
            try {
                $tg_id = $arr2[0];
                $balance_bp = str_replace(",",'.',$arr2[4]);
                $rating = $arr2[5];
                AirdropUser::query()->where('tg_id', $tg_id)->update([
                    'balance_bp' => $balance_bp,
                    'rating'     => $rating,
                ]);
                $c++;
                Log::info($c);
            } catch (\Throwable $e) {
                Log::info($e->getMessage());
            }
        }
    }

    public function handle2()
    {
        $rows = Cache::get('\App\Console\Commands\rating_airdrop::getRatingDb:all');

        $total_amount = 20000000;
        $count = count($rows);
        $parts = [10,20,30,40];
        $count1 = (int)($count * ($parts[0] / 100));
        $count2 = (int)($count * ($parts[1] / 100));
        $count3 = (int)($count * ($parts[2] / 100));
        $count4 = $count - $count1 - $count2 - $count3;

        $sum1 = 0;
        $sumBp1 = $total_amount * 0.25;
        for ($i = 0; $i < $count1; $i++) {
            $balance_ap = $rows[$i]['balance_ap'];
            Log::info($i);
            $sum1 += $balance_ap;
        }
        for ($i = 0; $i < $count1; $i++) {
            $balance_ap = $rows[$i]['balance_ap'];
            $balance_bp = $sumBp1 * ($balance_ap / $sum1);
            AirdropUser::query()->where('tg_id', $rows[$i]['tg_id'])->update([
                'rating'     => $i+1,
                'balance_bp' => $balance_bp,
            ]);
            $rows[$i]['balance_bp'] = $balance_bp;
            $rows[$i]['group'] = 1;
        }

        $sum2 = 0;
        $sumBp2 = $total_amount * 0.25;
        for ($i = $count1; $i < $count1 + $count2; $i++) {
            $balance_ap = $rows[$i]['balance_ap'];
            Log::info($i);
            $sum2 += $balance_ap;
        }
        for ($i = $count1; $i < $count1 + $count2; $i++) {
            $balance_ap = $rows[$i]['balance_ap'];
            $balance_bp = $sumBp2 * ($balance_ap / $sum2);
            AirdropUser::query()->where('tg_id', $rows[$i]['tg_id'])->update([
                'rating'     => $i+1,
                'balance_bp' => $balance_bp,
            ]);
            $rows[$i]['balance_bp'] = $balance_bp;
            $rows[$i]['group'] = 2;
        }

        $sum3 = 0;
        $sumBp3 = $total_amount * 0.25;
        for ($i = $count1 + $count2; $i < $count1 + $count2 + $count3; $i++) {
            $balance_ap = $rows[$i]['balance_ap'];
            Log::info($i);
            $sum3 += $balance_ap;
        }
        for ($i = $count1 + $count2; $i < $count1 + $count2 + $count3; $i++) {
            $balance_ap = $rows[$i]['balance_ap'];
            $balance_bp = $sumBp3 * ($balance_ap / $sum3);
            AirdropUser::query()->where('tg_id', $rows[$i]['tg_id'])->update([
                'rating'     => $i+1,
                'balance_bp' => $balance_bp,
            ]);
            $rows[$i]['balance_bp'] = $balance_bp;
            $rows[$i]['group'] = 3;
        }

        $sum4 = 0;
        $sumBp4 = $total_amount * 0.25;
        for ($i = $count1 + $count2 + $count3; $i < $count; $i++) {
            $balance_ap = $rows[$i]['balance_ap'];
            Log::info($i);
            $sum4 += $balance_ap;
        }
        for ($i = $count1 + $count2 + $count3; $i < $count; $i++) {
            $balance_ap = $rows[$i]['balance_ap'];
            $balance_bp = $sumBp4 * ($balance_ap / $sum4);
            AirdropUser::query()->where('tg_id', $rows[$i]['tg_id'])->update([
                'rating'     => $i+1,
                'balance_bp' => $balance_bp,
            ]);
            $rows[$i]['balance_bp'] = $balance_bp;
            $rows[$i]['group'] = 4;
        }

//        $this->export_to_file($rows);

        Cache::put('\App\Console\Commands\rating_airdrop::getRatingDb:allBP', $rows);
        Config::set('season1_is_end', 1);
    }

    private function export_to_file($rows)
    {
        $rows2 = [];
        foreach ($rows as $r) {
            $rows2[] = join(';', $r);
        }

        $content = join("\n", $rows2);
        file_put_contents('/application/storage/framework/cache/'.time().'.csv',$content);
    }
}

<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Stringable;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
         $schedule->command('app:pirate_queue')->everyMinute();

         $schedule->command('app:booster')->everyMinute();
         $schedule->command('app:rating_calculate')->dailyAt('03:00')->runInBackground();
         $schedule->command('app:calc_all_users')->hourly()->runInBackground();
         $schedule->command('app:check_task_limit')->everyFiveMinutes();
         $schedule->command('app:sender')->everyFiveMinutes()->withoutOverlapping();
         $schedule->command('mint')->everyFiveMinutes()->withoutOverlapping();
         $schedule->command('app:user_has_ope_pay')->everyMinute()->withoutOverlapping()->runInBackground();
         $schedule->command('app:pirate')->dailyAt('00:00')->runInBackground();
         $schedule->command('app:rating_airdrop')->dailyAt('12:00')->runInBackground();

//         $schedule->command('fetchstats')->everyMinute()->withoutOverlapping();
//         $schedule->command('app:save_log_balance')->everyFiveMinutes();
//         $schedule->command('app:add_balance')->everySecond();

    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}


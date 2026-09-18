<?php

namespace App\Console\Commands;

use App\Models\Stake;
use App\Models\UserTelegram;
use App\Service\BaseArrayHelper;
use App\Service\TonApi;
use App\Service\VarDumper;
use Catchain\Ton\Address\Address;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class fix_stake extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fix_stake';

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
        /**
         * [owner,stake_contract,amount,month],
         */
        $data = [
            ['UQADF9gq5GScMBNT11MIoDg35BSQf4m_tZy9o_VIKNeFkR6P','EQA_REmw6YxDvUvQ4vu3VnyxKRP50AGLLOf8T2nlJXchCdlw',1000,1,],
            ['UQADF9gq5GScMBNT11MIoDg35BSQf4m_tZy9o_VIKNeFkR6P','EQDCIbqtwPhc2O_6g23Af5AhoTD_KGG2jbU6MyUcOydebZLb',1000,3,],
            ['UQAdLOQPUBdwWCdyw72bjdj5OBpSXsKmnaKYyAGDGDBZmgqQ','EQACgr32J3nTQPnQOmhTNaftOVYntinKpPZL6sC2rhXV8zHY',1000,1,],
            ['UQAJsPtr01n5CZKTVwkdahVOmS59i8UAAqI5aQM006rlGUEF','EQCs6v1osUokyPfKGDtLOVWbXMj6-PCHZTI6YShHCOO1I3g8',1000,1,],
            ['UQAjXJoUTeidlVW7fdY6OxO2Q-rECRinMp8PcH-rrxRMFuzM','EQCNYSUtDBeFaZF40fHFHYcTdKmoPTtVUFRbRmHoc-UQY0z-',1000,1,],
            ['UQAnyPTNzJqU-bbdn3Al3vSUB74xZa73PqxN6c1KEYk2DiqS','EQBmaeMY6gEr1yxrwQBgFrr_9U7HtVoPgyDADMfWZWQ5m5Sk',1000,1,],
            ['UQAs5_tvKNMrufDRP7Y7gQHJz3uUTQZRTorIbdWMB8LKiV8z','EQCR57YZ1wlmUHdzI17OYvYm-Mg7osQ8ClEdlaItrzNgcXQo',1000,6,],
            ['UQAW8TQcVXtWm-ZGdPKMSE4y9nXcEur4xiYucV9Cfg7TT3CO','EQDMzm857Zo8mLzDge9cfEu-SYVe9qGRwckw_DzK8oR_3ljY',10000,6,],
            ['UQAW8TQcVXtWm-ZGdPKMSE4y9nXcEur4xiYucV9Cfg7TT3CO','EQDTHi2VFrjTDu8BuMlZKaTOQ1-NhfhXI6-NJ37EtqgJ0CVK',10000,6,],
            ['UQAW8TQcVXtWm-ZGdPKMSE4y9nXcEur4xiYucV9Cfg7TT3CO','EQC5VeA08m-X7Tsr6gdm0bOIvB6z0wOlLlDcVFRrd3n0iR9f',10000,6,],
            ['UQAyl6Up7_dnqfY6uYbsACt3H75It7JLZSlatQ2rnntZdOmk','EQDvhMMsFbqvg6uG8cdiwaZIiqliWk8lJlW4OnHIY50K8b40',1000,6,],
            ['UQB6OPb_ShBnCXlwcX1-ZpE9tB979xTPPGu1UFVqFBrdFJfd','EQDjpWHGxYNJoLbnsOVWXV6N-gBfSZda6CVJCb3hC_pia6lH',10000,1,],
            ['UQB8xqp3Ukh1cInoEV-xSdhAGZRWmzsjxYU7Z5yEwaOkxIOL','EQBXEsgsefO83sqBP9r7b0MjE4GFb_8LAJb39do7WT4Awbib',1000,6,],
            ['UQBgTJkyQKm83qs9xadG6bDj3qe6wlgeWiEpgDekK5yQfr-6','EQAbD0epLcsLmfWsZ8Fe2JYTy2UHRuQHjTHqC4frTdZ7fpgH',10000,1,],
            ['UQBH5_oYS7s1DGRLWr96zG8yPEvVESoTD8xjgtEs2xH-K_GF','EQBgqOLVCu_fGAzyj9-eTZuGgAmP4GtMTho4t4PyKrig63b4',50000,1,],
            ['UQBQJfEAoFxqcFPXyjt1pILjXLmy5-C6zl6RG9u05iw9ONUx','EQDaFubUTlrK-eMd5nrTgcqFFQQ-1YYn2506BLCXGjNvxZIQ',1000,1,],
            ['UQBt-iahm8KPIjsqXY-raDthSzt9x7q755pLr2KDx7LNlJco','EQAl03f5ixsuz_7FRCFRIT7BcbnA_UgrWtqiGusKeX-3Wzhd',1000,6,],
            ['UQBVeQ7-pdru6FA0g-mHqzsNiRevC7ZMHv6U8yw77_Aw6hVN','EQAADFNZolEwNsTaLNtOnhGHUprsCdwh9_29IfgbkIielxWU',1000,6,],
            ['UQBVeQ7-pdru6FA0g-mHqzsNiRevC7ZMHv6U8yw77_Aw6hVN','EQBngBf9msLXdKNcxeI0pj1CsGPiwRH9DNuCOcgJBkUzwZK_',1000,6,],
            ['UQBVeQ7-pdru6FA0g-mHqzsNiRevC7ZMHv6U8yw77_Aw6hVN','EQB-J7DzakUTJ-kWVVqQU4p2nWnVViQurXNAgg2IQlKnt7Ub',1000,6,],
            ['UQC0qtogPkooJHmjjYcEafWnHEBYOVyq9ZUEW3jA25Ea9BKm','EQDBy-b3vLIl3p-jvUJfontOvQxPfr73EVRWrN-5pparugMh',50000,6,],
            ['UQCawB9GTTAdizJxfmSoatK6VFIuASHP3u7c3XiGP3kB0cLl','EQCghPM8n-oLIkgkfIFLd7s20kJHK08-RdpAcV-iZkN5_kyz',1000,1,],
            ['UQCBEnjFiFhkLAtZ0spCeVCRiQp5iAvnqLGNZoSqMXed7iuU','EQDIAuyVhejg9mfPtRg8keYEbDpQKzIZHqFTqGLJCqH39Oaz',1000,1,],
            ['UQCcjsMfOUXrJmpCJBol5t_qSmD5ZIaIXHYKhTjolQZspZNP','EQAxj96vjkM8LKdSMP4XSz-MYKUkybhnQ14iPqobjPFaMYok',1000,6,],
            ['UQCcjsMfOUXrJmpCJBol5t_qSmD5ZIaIXHYKhTjolQZspZNP','EQDyz2TI7bvYQbNfUFtdX8Lfhq2jqajTwNSJ7Exp7t1IAHbb',1000,6,],
            ['UQCcjsMfOUXrJmpCJBol5t_qSmD5ZIaIXHYKhTjolQZspZNP','EQAsUTmqAm85pj6i0h8D9wp-DBx2cLZ5tg7TQ1I53BCvVAaW',1000,6,],
            ['UQCcjsMfOUXrJmpCJBol5t_qSmD5ZIaIXHYKhTjolQZspZNP','EQBjkZQI_V098jaghkMvuqb4diHq5X4ruoZ15AdL0GW0j-TC',1000,6,],
            ['UQCcjsMfOUXrJmpCJBol5t_qSmD5ZIaIXHYKhTjolQZspZNP','EQDPTt4tpAs7iHq42YBR8kn-FYnXoFHHvYfcizLocQD9B-df',1000,6,],
            ['UQCgC98VxeSrOXLDt_RlYU2Reu28xxyxE4UKFsrvEXfGw2fC','EQC7jABcObHK3oU-yuEiNfJRvuEEXUDMK-d1mtZjq23cTAJR',1000,6,],
            ['UQCILTQakzvuWq7EmJbP_IU3_xy3rUuoAkeDrYUJnZ15NByh','EQBIoHiQWR2WK8TFMXDjFtPxLbnmOTgyqBxQhFqAJmEZL7Xc',10000,6,],
            ['UQCILTQakzvuWq7EmJbP_IU3_xy3rUuoAkeDrYUJnZ15NByh','EQBvUGQlgvQvG-hBIRxuO5VF4ntKf6DpGkasj2cWzlq0hkp6',1000,6,],
            ['UQCILTQakzvuWq7EmJbP_IU3_xy3rUuoAkeDrYUJnZ15NByh','EQCI5sXx7rwxZRqlWnb2ZSxeJPrYTkR1KBMaNBMNaRZushLX',1000,6,],
            ['UQCILTQakzvuWq7EmJbP_IU3_xy3rUuoAkeDrYUJnZ15NByh','EQDQ-XBv4uaMdRAhdQH6s19MUxLtifZG2wXeq9ZDC63kWOpz',1000,6,],
            ['UQCNofcr_oLJIjJ2clILQXowkIor8KHl67ftiN8Xf_HGc-sk','EQBdK8eOov788yShPRh1NEbVuy_81H1y5aVzYNGblbguiovm',1000,1,],
            ['UQCNofcr_oLJIjJ2clILQXowkIor8KHl67ftiN8Xf_HGc-sk','EQACCRs82yLpBtyoUZefu0BypEyfupcsBhI39ZRA_-BOyD3n',1000,1,],
            ['UQCsEoxmNv7l1ZYOUKgWzY3yNvHLMWAOiJ7_K9qQ8ZC1c1l_','EQBmm8erO07YetvT7WdK1-sxOT2gpGfXmOPG7Cz_w2sKFPfF',1000,3,],
            ['UQCur8ZTlD6QfhF3sNryD6L93VctaeKprlm7hKr7RMFXAVtf','EQCFu-SYRqK6rotB3eZXZAzLv2t32Mzc_iI03F8y62yeMbgQ',1000,6,],
            ['UQCv2FMv77oaZCo-4L9qjph71rnbj24Ur2aK_Waut4DwIAhM','EQDpurJTYTXiYDNdrJBcATIBDm6JFTtKWQrhwlKD8zvs7AqG',1000,3,],
            ['UQD_rsZUqO8OYAjONn0yl0pJZZtBz273JVk7sCUI0VDwmuc8','EQAA4FRrooW5EeRfcHykC1YvgdxxvCbBKbh8-7AQSKvKsvAx',1000,1,],
            ['UQD8klzKk7DGr0RKayhGyjKQ5INTPZBW0VzNqM7DfbYvOHGk','EQDRs-ZGCv_AZrtDhBh_kQMqlKm1_GV_Orrhht6cIM68knz3',1000,1,],
            ['UQDDWt9OsBNqqpeLXln-FHJXu4Btp14ftup4Hw2tYb5-iyDA','EQBUxIN338n1oiucOaeRnRIhhbtof1V2vMMCXpMTq0mcd1mm',1000,1,],
            ['UQDhzRdS79QVil3Eosm21uD8QKVdJ8JufoSSSSkAaKDfemAd','EQC1P5LX1_BThjfrv5Oq7us4KX64H6muIGpiSB_gv-rJrtG3',1000,3,],
            ['UQDlEWBwaiUu2gobKkk-K2ir1pMAI2vx2cggfQcvpVreUTn2','EQBY-lSOioOSrOo1d3gKKuVI6HpXGTnyKXRWppi-nIKzt4Hm',1000,6,],
            ['UQDMw4DX_z1TGwRbJYJoejeReEpdttE2FKgYqAt_SSEl3htP','EQCisqA0RCe_Ma55kdjRSVCwfY5DOpQqEZBk0wox8vadjrrD',1000,1,],
            ['UQDoxJKVNakvv_m9XGPrsVrJN4QjJPZ26nl-C78skMiUdkqw','EQDvDxOm-hT38FyiuxchDnICMmgWrOtmAQi5m8URXxcW1s_v',1000,1,],
            ['UQDRJnrJFcMDj9r1llnmHY75L7HwecYGDq3pEZLx9N-CWVSt','EQC77VPMiGwwqXuK628MAIZ-W6xj0iGvKO07xf0JKiXxQZoi',1000,6,],
            ['UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m','EQDOPjCLKiaxhv2ZnZBGj6pvsL6JXNckIpYYlaSltzbr0ZXd',10000,6,],
            ['UQDwePTDhfJmVM02ZXhEHvBVRhXOvNXBpBTzglzVt0wNx6W5','EQB-D9d2KnfJRicAAYysz_gdA73MQsezDfXuUCLULwBCrEw7',1000,6,],
            ['UQDXIo0yu0OzRKGmVLMjyQRSL2NCzPvoeWaLbd9i5F3p_vPI','EQBcghMnQyxMA2_9_66Nt9iubA6KhXi7kD2rl_e9A16eiKIs',1000,3,],
        ];

        // Из диминой таблицы
        $users = [
            'UQADF9gq5GScMBNT11MIoDg35BSQf4m_tZy9o_VIKNeFkR6P',
            'UQAdLOQPUBdwWCdyw72bjdj5OBpSXsKmnaKYyAGDGDBZmgqQ',
            'UQAJsPtr01n5CZKTVwkdahVOmS59i8UAAqI5aQM006rlGUEF',
            'UQAjXJoUTeidlVW7fdY6OxO2Q-rECRinMp8PcH-rrxRMFuzM',
            'UQAnyPTNzJqU-bbdn3Al3vSUB74xZa73PqxN6c1KEYk2DiqS',
            'UQAs5_tvKNMrufDRP7Y7gQHJz3uUTQZRTorIbdWMB8LKiV8z',
            'UQAW8TQcVXtWm-ZGdPKMSE4y9nXcEur4xiYucV9Cfg7TT3CO',
            'UQAyl6Up7_dnqfY6uYbsACt3H75It7JLZSlatQ2rnntZdOmk',
            'UQB6OPb_ShBnCXlwcX1-ZpE9tB979xTPPGu1UFVqFBrdFJfd',
            'UQB8xqp3Ukh1cInoEV-xSdhAGZRWmzsjxYU7Z5yEwaOkxIOL',
            'UQBgTJkyQKm83qs9xadG6bDj3qe6wlgeWiEpgDekK5yQfr-6',
            'UQBH5_oYS7s1DGRLWr96zG8yPEvVESoTD8xjgtEs2xH-K_GF',
            'UQBQJfEAoFxqcFPXyjt1pILjXLmy5-C6zl6RG9u05iw9ONUx',
            'UQBt-iahm8KPIjsqXY-raDthSzt9x7q755pLr2KDx7LNlJco',
            'UQBVeQ7-pdru6FA0g-mHqzsNiRevC7ZMHv6U8yw77_Aw6hVN',
            'UQC0qtogPkooJHmjjYcEafWnHEBYOVyq9ZUEW3jA25Ea9BKm',
            'UQCawB9GTTAdizJxfmSoatK6VFIuASHP3u7c3XiGP3kB0cLl',
            'UQCBEnjFiFhkLAtZ0spCeVCRiQp5iAvnqLGNZoSqMXed7iuU',
            'UQCcjsMfOUXrJmpCJBol5t_qSmD5ZIaIXHYKhTjolQZspZNP',
            'UQCgC98VxeSrOXLDt_RlYU2Reu28xxyxE4UKFsrvEXfGw2fC',
            'UQCILTQakzvuWq7EmJbP_IU3_xy3rUuoAkeDrYUJnZ15NByh',
            'UQCNofcr_oLJIjJ2clILQXowkIor8KHl67ftiN8Xf_HGc-sk',
            'UQCsEoxmNv7l1ZYOUKgWzY3yNvHLMWAOiJ7_K9qQ8ZC1c1l_',
            'UQCur8ZTlD6QfhF3sNryD6L93VctaeKprlm7hKr7RMFXAVtf',
            'UQCv2FMv77oaZCo-4L9qjph71rnbj24Ur2aK_Waut4DwIAhM',
            'UQD_rsZUqO8OYAjONn0yl0pJZZtBz273JVk7sCUI0VDwmuc8',
            'UQD8klzKk7DGr0RKayhGyjKQ5INTPZBW0VzNqM7DfbYvOHGk',
            'UQDDWt9OsBNqqpeLXln-FHJXu4Btp14ftup4Hw2tYb5-iyDA',
            'UQDhzRdS79QVil3Eosm21uD8QKVdJ8JufoSSSSkAaKDfemAd',
            'UQDlEWBwaiUu2gobKkk-K2ir1pMAI2vx2cggfQcvpVreUTn2',
            'UQDMw4DX_z1TGwRbJYJoejeReEpdttE2FKgYqAt_SSEl3htP',
            'UQDoxJKVNakvv_m9XGPrsVrJN4QjJPZ26nl-C78skMiUdkqw',
            'UQDRJnrJFcMDj9r1llnmHY75L7HwecYGDq3pEZLx9N-CWVSt',
            'UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m',
            'UQDwePTDhfJmVM02ZXhEHvBVRhXOvNXBpBTzglzVt0wNx6W5',
            'UQDXIo0yu0OzRKGmVLMjyQRSL2NCzPvoeWaLbd9i5F3p_vPI'
        ];

        // ИЗ БД меньше
        $users2 = [
            'UQADF9gq5GScMBNT11MIoDg35BSQf4m_tZy9o_VIKNeFkR6P',
            'UQAdLOQPUBdwWCdyw72bjdj5OBpSXsKmnaKYyAGDGDBZmgqQ',
            'UQAJsPtr01n5CZKTVwkdahVOmS59i8UAAqI5aQM006rlGUEF',
            'UQAjXJoUTeidlVW7fdY6OxO2Q-rECRinMp8PcH-rrxRMFuzM',
            'UQAnyPTNzJqU-bbdn3Al3vSUB74xZa73PqxN6c1KEYk2DiqS',
            'UQAs5_tvKNMrufDRP7Y7gQHJz3uUTQZRTorIbdWMB8LKiV8z',
            'UQAW8TQcVXtWm-ZGdPKMSE4y9nXcEur4xiYucV9Cfg7TT3CO',
            'UQAyl6Up7_dnqfY6uYbsACt3H75It7JLZSlatQ2rnntZdOmk',
            'UQB8xqp3Ukh1cInoEV-xSdhAGZRWmzsjxYU7Z5yEwaOkxIOL',
            'UQBgTJkyQKm83qs9xadG6bDj3qe6wlgeWiEpgDekK5yQfr-6',
            'UQBH5_oYS7s1DGRLWr96zG8yPEvVESoTD8xjgtEs2xH-K_GF',
            'UQBQJfEAoFxqcFPXyjt1pILjXLmy5-C6zl6RG9u05iw9ONUx',
            'UQBt-iahm8KPIjsqXY-raDthSzt9x7q755pLr2KDx7LNlJco',
            'UQBVeQ7-pdru6FA0g-mHqzsNiRevC7ZMHv6U8yw77_Aw6hVN',
            'UQC0qtogPkooJHmjjYcEafWnHEBYOVyq9ZUEW3jA25Ea9BKm',
            'UQCawB9GTTAdizJxfmSoatK6VFIuASHP3u7c3XiGP3kB0cLl',
            'UQCBEnjFiFhkLAtZ0spCeVCRiQp5iAvnqLGNZoSqMXed7iuU',
            'UQCcjsMfOUXrJmpCJBol5t_qSmD5ZIaIXHYKhTjolQZspZNP',
            'UQCgC98VxeSrOXLDt_RlYU2Reu28xxyxE4UKFsrvEXfGw2fC',
            'UQCILTQakzvuWq7EmJbP_IU3_xy3rUuoAkeDrYUJnZ15NByh',
            'UQCsEoxmNv7l1ZYOUKgWzY3yNvHLMWAOiJ7_K9qQ8ZC1c1l_',
            'UQCur8ZTlD6QfhF3sNryD6L93VctaeKprlm7hKr7RMFXAVtf',
            'UQCv2FMv77oaZCo-4L9qjph71rnbj24Ur2aK_Waut4DwIAhM',
            'UQD_rsZUqO8OYAjONn0yl0pJZZtBz273JVk7sCUI0VDwmuc8',
            'UQD8klzKk7DGr0RKayhGyjKQ5INTPZBW0VzNqM7DfbYvOHGk',
            'UQDDWt9OsBNqqpeLXln-FHJXu4Btp14ftup4Hw2tYb5-iyDA',
            'UQDhzRdS79QVil3Eosm21uD8QKVdJ8JufoSSSSkAaKDfemAd',
            'UQDlEWBwaiUu2gobKkk-K2ir1pMAI2vx2cggfQcvpVreUTn2',
            'UQDMw4DX_z1TGwRbJYJoejeReEpdttE2FKgYqAt_SSEl3htP',
            'UQDoxJKVNakvv_m9XGPrsVrJN4QjJPZ26nl-C78skMiUdkqw',
            'UQDRJnrJFcMDj9r1llnmHY75L7HwecYGDq3pEZLx9N-CWVSt',
            'UQDvQ7IhtrxoTYFJLieyWFOej1JoXVEY9GPjxRrkphv6T84m',
            'UQDwePTDhfJmVM02ZXhEHvBVRhXOvNXBpBTzglzVt0wNx6W5',
            'UQDXIo0yu0OzRKGmVLMjyQRSL2NCzPvoeWaLbd9i5F3p_vPI',
        ];

        $u2 = [];
        foreach ($users as $u) {
            if (!in_array($u,$users2)) $u2[] = $u;
        }

        $owner = [];
        $owner2 = [];
        foreach ($data as $i) {
            $owner[$i[0]][] = [$i[1],$i[2],$i[3]];
            $owner2[] = "'" . $i[0] . "'";
        }
        $d = new \DateTime('2024-12-25 11:15', new \DateTimeZone('UTC'));
        $tonApi = TonApi::getInstance();

        foreach ($owner as $owner_address => $list) {
            /** @var \App\Models\UserTelegram $user */
            $user = UserTelegram::query()->where('token', $owner_address)->first();
            if (!is_null($user)) {
                $exist = Stake::query()->where('owner', $owner_address)->where('created_at','<', $d->format('U'))->get()->toArray();

                $ids = BaseArrayHelper::getColumn($exist,'id');
                // Удаляю старые записи
                Stake::query()->whereIn('id', $ids)->delete();

                // формирую новые записи
                foreach ($list as $l) {
                    $response = $tonApi->get('v2/blockchain/accounts/' . $l[0] . '/transactions', ['sort_order' => 'asc', 'limit' => 100]);

                    $box = $this->getLootboxId($l);

                    Stake::query()->create([
                        'tg_id'       => $user->chat_id,
                        'lootbox_id'  => $box['id'],
                        'amount'      => $box['price'],
                        'out_amount'  => $box['reward'],
                        'mint_count'  => 1,
                        'duration'    => $box['duration'],
                        'max_claims'  => $box['max_claim'],
                        'claims'      => 0,
                        'address'     => Address::parse($l[0])->toString(false),
                        'owner'       => $owner_address,
                        'txid'        => $response['transactions'][0]['hash'],
                        'status'      => 1,
                        'created_at'  => $response['transactions'][0]['utime'],
                        'next_claim'  => $response['transactions'][0]['utime'] + $box['duration'],
                        'last_claim'  => 0,
                        'finished_at' => 0,
                        'error'       => '',
                        'end_time'    => $response['transactions'][0]['utime'] + $box['duration'],
                    ]);
                    Log::info('stake ' . $l[0] . ' added');

                }
            } else {
                Log::info('user ' . $owner_address . ' not found');
            }
        }
    }

    /**
     * @param array $l
     * @return array|null
     */
    public function getLootboxId($l)
    {
        $lootboxes = config('app.lootboxes');
        foreach ($lootboxes as $box) {
            if ($box['months'] == $l[2] && $box['price'] == $l[1]) {
                return $box;
            }
        }

        return null;
    }
}

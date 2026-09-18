<?php

use Illuminate\Support\Facades\Facade;
use Illuminate\Support\ServiceProvider;

return [

    /*
    |--------------------------------------------------------------------------
    | Application Name
    |--------------------------------------------------------------------------
    |
    | This value is the name of your application. This value is used when the
    | framework needs to place the application's name in a notification or
    | any other location as required by the application or its packages.
    |
    */

    'name' => env('APP_NAME', 'Laravel'),

    /*
    |--------------------------------------------------------------------------
    | Application Environment
    |--------------------------------------------------------------------------
    |
    | This value determines the "environment" your application is currently
    | running in. This may determine how you prefer to configure various
    | services the application utilizes. Set this in your ".env" file.
    |
    */

    'env' => env('APP_ENV', 'production'),

    /*
    |--------------------------------------------------------------------------
    | Application Debug Mode
    |--------------------------------------------------------------------------
    |
    | When your application is in debug mode, detailed error messages with
    | stack traces will be shown on every error that occurs within your
    | application. If disabled, a simple generic error page is shown.
    |
    */

    'debug' => (bool) env('APP_DEBUG', false),

    /*
    |--------------------------------------------------------------------------
    | Application URL
    |--------------------------------------------------------------------------
    |
    | This URL is used by the console to properly generate URLs when using
    | the Artisan command line tool. You should set this to the root of
    | your application so that it is used when running Artisan tasks.
    |
    */

    'url' => env('APP_URL', 'http://localhost'),

    'asset_url' => env('ASSET_URL'),

    /*
    |--------------------------------------------------------------------------
    | Application Timezone
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default timezone for your application, which
    | will be used by the PHP date and date-time functions. We have gone
    | ahead and set this to a sensible default for you out of the box.
    |
    */

    'timezone' => 'UTC',

    /*
    |--------------------------------------------------------------------------
    | Application Locale Configuration
    |--------------------------------------------------------------------------
    |
    | The application locale determines the default locale that will be used
    | by the translation service provider. You are free to set this value
    | to any of the locales which will be supported by the application.
    |
    */

    'locale' => 'en',

    /*
    |--------------------------------------------------------------------------
    | Application Fallback Locale
    |--------------------------------------------------------------------------
    |
    | The fallback locale determines the locale to use when the current one
    | is not available. You may change the value to correspond to any of
    | the language folders that are provided through your application.
    |
    */

    'fallback_locale' => 'en',

    /*
    |--------------------------------------------------------------------------
    | Faker Locale
    |--------------------------------------------------------------------------
    |
    | This locale will be used by the Faker PHP library when generating fake
    | data for your database seeds. For example, this will be used to get
    | localized telephone numbers, street address information and more.
    |
    */

    'faker_locale' => 'en_US',

    /*
    |--------------------------------------------------------------------------
    | Encryption Key
    |--------------------------------------------------------------------------
    |
    | This key is used by the Illuminate encrypter service and should be set
    | to a random, 32 character string, otherwise these encrypted strings
    | will not be safe. Please do this before deploying an application!
    |
    */

    'key' => env('APP_KEY'),

    'cipher' => 'AES-256-CBC',

    /*
    |--------------------------------------------------------------------------
    | Maintenance Mode Driver
    |--------------------------------------------------------------------------
    |
    | These configuration options determine the driver used to determine and
    | manage Laravel's "maintenance mode" status. The "cache" driver will
    | allow maintenance mode to be controlled across multiple machines.
    |
    | Supported drivers: "file", "cache"
    |
    */

    'maintenance' => [
        'driver' => 'file',
        // 'store' => 'redis',
    ],

    /*
    |--------------------------------------------------------------------------
    | Autoloaded Service Providers
    |--------------------------------------------------------------------------
    |
    | The service providers listed here will be automatically loaded on the
    | request to your application. Feel free to add your own services to
    | this array to grant expanded functionality to your applications.
    |
    */

    'providers' => ServiceProvider::defaultProviders()->merge([
        /*
         * Package Service Providers...
         */

        /*
         * Application Service Providers...
         */
        App\Providers\AppServiceProvider::class,
        App\Providers\AuthServiceProvider::class,
        // App\Providers\BroadcastServiceProvider::class,
        App\Providers\EventServiceProvider::class,
        App\Providers\RouteServiceProvider::class,
    ])->toArray(),

    /*
    |--------------------------------------------------------------------------
    | Class Aliases
    |--------------------------------------------------------------------------
    |
    | This array of class aliases will be registered when this application
    | is started. However, feel free to register as many as you wish as
    | the aliases are "lazy" loaded so they don't hinder performance.
    |
    */


    'aliases' => Facade::defaultAliases()->merge([
        // 'Example' => App\Facades\Example::class,
    ])->toArray(),

    'wallet'                 => env('APP_WALLET', 'UQChXxSvZzoGQ_5w-ncaT3Zm6x6P4LDOTa6w1WSS9AWP1BMy'), // depricated
    'nft-token'              => env('APP_NFT_TOKEN', 'TAP-TOKEN-1'),  // depricated

    'nft-price'              => env('APP_NFT_PRICE', 100000000), // Комиссия NFT
    'nft-url'                => env('APP_NFT_URL', 'https://apiton.mmbump.pro'),
    'highload'               => env('APP_HIGHLOAD_WALLET', 'UQA1ncIYvWqZ8Lba4diqFqbZ5hY0OL2QnkE3tIULrmFnELz2'), // PROD
    'marketplace'            => env('APP_MARKETPLACE', 'EQAJ-QU4xFrQRr1JCtQS7zAgCOvVDl5tkBvgwbAGOGiRd9MO'),
    'marketplace-fee'        => env('APP_MARKETPLACE_FEE', 300000000),
    'is_testnet'             => env('APP_IS_TESTNET', 0) === 1,
    'front_url'              => env('APP_FRONT_URL', 'https://mmbump.pro'),
    //'ship_module_collection' => 'EQAAefRSgWhgxV-9QbTaxHw40a4YvehIVpb7Zfl0938qgxSp',
    'ship_module_collection' => 'EQCwo-MsbrmWaMtB3Pb-egBCo2ZfZtc8vZ-xnOs8B6O-tFOi', // PROD
    'ship_kraft_collection'  => 'EQCwF7-OQiHBxKePiBFOAWwzHDTFHkJR9likOqTYFQc08OmS', // PROD

    'referal_system' => [
        'percent'        => 10,
        'percent_second' => 5,
    ],
    'pirate' => [
        'black_metka_period' => 24*60*60,
    ],
    'farming' => [
        'price'  => 1000000,
        'length' => env('BOT_FARMING_LENGTH', 60*60*6),
    ],
    'product-list' => [
        'x2' => [
            'price'  => 4000000,
            'length' => 1,
        ],
        'x3' => [
            'price'  => 30000000,
            'length' => 7,
        ],
        'x5' => [
            'price'  => 200000000,
            'length' => 30,
        ],
    ],

    'task-list' => [

    ],



    'nft-list' => [
//        [
//            "id"             => 1,
//            "nft_id"         => 1,
//            "item_id"        => 0,
//            "name"           => "Voucher Tier 1 - 10%",
//            "price"          => 1000000000,
//            'comission'      => 80000000,
//            'image'          => '/img/001.png',
//            "address_base58" => 'EQC5XhGLN5wkEQcifzsiyOpPvDfAqLBzQwsfEEZVRS7LAxGJ',
//            "address_hex"    => '0:b95e118b379c241107227f3b22c8ea4fbc37c0a8b073430b1f104655452ecb03',
//            "total_supply"   => 500,
//            "is_soldout"     => true
//        ],
//        [
//            "id"             => 2,
//            "nft_id"         => 2,
//            "item_id"        => 0,
//            "name"           => "Voucher Tier 2 - 10%",
//            "price"          => 2000000000,
//            'comission'      => 80000000,
//            'image'          => '/img/002.png',
//            "address_base58" => 'EQCLxOtUQ7ouyNdqnzxcGuChtqxcbLKqxRsRmUKsQZnjwhDb',
//            "address_hex"    => '0:8bc4eb5443ba2ec8d76a9f3c5c1ae0a1b6ac5c6cb2aac51b119942ac4199e3c2',
//            "total_supply"   => 300,
//        ],
//        [
//            "id"             => 3,
//            "nft_id"         => 3,
//            "item_id"        => 0,
//            "name"           => "Voucher Tier 3 - 10%",
//            "price"          => 3000000000,
//            'comission'      => 80000000,
//            'image'          => '/img/003.png',
//            "address_base58" => 'EQDCU3jFPifA0MoptBDqyS4Td8TKuNN4Mw1N-AW_VGHKzzFK',
//            "address_hex"    => '0:c25378c53e27c0d0ca29b410eac92e1377c4cab8d378330d4df805bf5461cacf',
//            "total_supply"   => 50,
//        ],
//        [
//            "id"             => 4,
//            "nft_id"         => 4,
//            "item_id"        => 0,
//            "name"           => "Voucher Tier 4 - 10%",
//            "price"          => 4000000000,
//            'comission'      => 80000000,
//            'image'          => '/img/004.png',
//            "address_base58" => 'EQD1NhcBmbVgNYFRMtlSDVdWcwQTmvV4YNkFSydD3FaOPQpw',
//            "address_hex"    => '0:f536170199b56035815132d9520d57567304139af57860d9054b2743dc568e3d',
//            "total_supply"   => 20,
//        ],
//        [
//            "id"             => 5,
//            "nft_id"         => 5,
//            "item_id"        => 0,
//            "name"           => "Voucher Tier 5 - 10%",
//            "price"          => 5000000000,
//            'comission'      => 80000000,
//            'image'          => '/img/005.png',
//            "address_base58" => 'EQCv9ZPdQ9LQrnlWbgQ7btD5qgyzi1uWqb9trgNmdSL1ei5l',
//            "address_hex"    => '0:aff593dd43d2d0ae79566e043b6ed0f9aa0cb38b5b96a9bf6dae03667522f57a',
//            "total_supply"   => 5,
//            "is_soldout"     => true
//        ],
        [
            "id"             => 6,
            "nft_id"         => 6,
            "item_id"        => 0,
            "name"           => "Cabin Module",
            "price"          => 1000000000,
            'comission'      => 100000000,
            'image'          => '/img/Cabin_Module.png',
            "address_base58" => 'EQCwo-MsbrmWaMtB3Pb-egBCo2ZfZtc8vZ-xnOs8B6O-tFOi',
            "address_hex"    => '0:b0a3e32c6eb99668cb41dcf6fe7a0042a3665f66d73cbd9fb19ceb3c07a3beb4',
            "total_supply"   => 1000000,
        ],
        [
            "id"             => 7,
            "nft_id"         => 6,
            "item_id"        => 1,
            "name"           => "Right Wing Module",
            "price"          => 1000000000,
            'comission'      => 100000000,
            'image'          => '/img/Right_Wing.png',
            "address_base58" => 'EQCwo-MsbrmWaMtB3Pb-egBCo2ZfZtc8vZ-xnOs8B6O-tFOi',
            "address_hex"    => '0:b0a3e32c6eb99668cb41dcf6fe7a0042a3665f66d73cbd9fb19ceb3c07a3beb4',
            "total_supply"   => 1000000,
        ],
        [
            "id"             => 8,
            "nft_id"         => 6,
            "item_id"        => 2,
            "name"           => "Left Wing Module",
            "price"          => 1000000000,
            'comission'      => 100000000,
            'image'          => '/img/Left_Wing.png',
            "address_base58" => 'EQCwo-MsbrmWaMtB3Pb-egBCo2ZfZtc8vZ-xnOs8B6O-tFOi',
            "address_hex"    => '0:b0a3e32c6eb99668cb41dcf6fe7a0042a3665f66d73cbd9fb19ceb3c07a3beb4',
            "total_supply"   => 1000000,
        ],
        [
            "id"             => 9,
            "nft_id"         => 6,
            "item_id"        => 3,
            "name"           => "Engine Unit Module",
            "price"          => 1000000000,
            'comission'      => 100000000,
            'image'          => '/img/Engine_Unit.png',
            "address_base58" => 'EQCwo-MsbrmWaMtB3Pb-egBCo2ZfZtc8vZ-xnOs8B6O-tFOi',
            "address_hex"    => '0:b0a3e32c6eb99668cb41dcf6fe7a0042a3665f66d73cbd9fb19ceb3c07a3beb4',
            "total_supply"   => 1000000,
        ],
        [
            "id"             => 10,
            "nft_id"         => 6,
            "item_id"        => 4,
            "name"           => "Ship Nose Module",
            "price"          => 1000000000,
            'comission'      => 100000000,
            'image'          => '/img/Ship_Nose.png',
            "address_base58" => 'EQCwo-MsbrmWaMtB3Pb-egBCo2ZfZtc8vZ-xnOs8B6O-tFOi',
            "address_hex"    => '0:b0a3e32c6eb99668cb41dcf6fe7a0042a3665f66d73cbd9fb19ceb3c07a3beb4',
            "total_supply"   => 1000000,
        ],
        [
            "id"             => 11,
            "nft_id"         => 6,
            "item_id"        => 5,
            "name"           => "Tail Section Module",
            "price"          => 1000000000,
            'comission'      => 100000000,
            'image'          => '/img/Tail_Section.png',
            "address_base58" => 'EQCwo-MsbrmWaMtB3Pb-egBCo2ZfZtc8vZ-xnOs8B6O-tFOi',
            "address_hex"    => '0:b0a3e32c6eb99668cb41dcf6fe7a0042a3665f66d73cbd9fb19ceb3c07a3beb4',
            "total_supply"   => 1000000,
        ],
        [
            "id"             => 12,
            "nft_id"         => 7,
            "item_id"        => 0,
            "name"           => "BUMP OG Pass",
            "price"          => 0,
            'comission'      => 1000000000,
            'image'          => '/img/BUMPOGPASS.png',
            "address_base58" => 'EQCNANRvXO-Z5GK6uLbBMqzeCOsNjxVYVHz0nT27E_yEm3cn',
            "address_hex"    => '0:8d00d46f5cef99e462bab8b6c132acde08eb0d8f1558547cf49d3dbb13fc849b',
            "total_supply"   => 1000000,
            "reward"         => 5000000000,
        ],
    ],

    'ogpass_reward' => 5000000000,

    'nft_collection_list' => [
        '0:b95e118b379c241107227f3b22c8ea4fbc37c0a8b073430b1f104655452ecb03', // EQC5XhGLN5wkEQcifzsiyOpPvDfAqLBzQwsfEEZVRS7LAxGJ tier1
        '0:8bc4eb5443ba2ec8d76a9f3c5c1ae0a1b6ac5c6cb2aac51b119942ac4199e3c2', // EQCLxOtUQ7ouyNdqnzxcGuChtqxcbLKqxRsRmUKsQZnjwhDb tier2
        '0:c25378c53e27c0d0ca29b410eac92e1377c4cab8d378330d4df805bf5461cacf', // EQDCU3jFPifA0MoptBDqyS4Td8TKuNN4Mw1N+AW/VGHKzzFK tier3
        '0:f536170199b56035815132d9520d57567304139af57860d9054b2743dc568e3d', // EQD1NhcBmbVgNYFRMtlSDVdWcwQTmvV4YNkFSydD3FaOPQpw tier4
        '0:aff593dd43d2d0ae79566e043b6ed0f9aa0cb38b5b96a9bf6dae03667522f57a', // EQCv9ZPdQ9LQrnlWbgQ7btD5qgyzi1uWqb9trgNmdSL1ei5l tier5
        '0:a5261daebcee8d8cfbeaedef4d731f108e631276983bdf14e8df6e3fd1324f16', // EQClJh2uvO6NjPvq7e9Ncx8QjmMSdpg73xTo324/0TJPFmCD MMPro BUMP Voucher Tier 1 - 10% | Batch.2
        '0:6d89c9c49bde6cfb117420067efaa6d06f739855f7667d3225d07ad40971c5ed', // EQBticnEm95s+xF0IAZ++qbQb3OYVfdmfTIl0HrUCXHF7Tzz ?
        '0:a6b396b011a5ae02918f637ce9b54e101035bf22430a793159b841c14e27bdb1', // EQCms5awEaWuApGPY3zptU4QEDW_IkMKeTFZuEHBTie9sYWF // Контракт запчастей кораблей. Часть 1
        '0:b017bf8e4221c1c4a78f88114e016c331c34c51e4251f658a43aa4d8150734f0', // EQCwF7-OQiHBxKePiBFOAWwzHDTFHkJR9likOqTYFQc08OmS // Контракт кораблей
        '0:b0a3e32c6eb99668cb41dcf6fe7a0042a3665f66d73cbd9fb19ceb3c07a3beb4', // EQCwo-MsbrmWaMtB3Pb-egBCo2ZfZtc8vZ-xnOs8B6O-tFOi // Контракт запчастей кораблей. Часть 3
        '0:14e94f583883420981324bed66d45824aa1b636df373963502b0936a5e55abd2', // EQAU6U9YOINCCYEyS-1m1FgkqhtjbfNzljUCsJNqXlWr0khA // Контракт запчастей кораблей. Часть 3 test
        '0:a2a9a1da49c6901635f59304c3c7928744e54fb79e1c9acdab607066d5483a13', // EQCiqaHaScaQFjX1kwTDx5KHROVPt54cms2rYHBm1Ug6E19e // Контракт запчастей кораблей. Часть 2
        '0:8d00d46f5cef99e462bab8b6c132acde08eb0d8f1558547cf49d3dbb13fc849b', // EQCNANRvXO-Z5GK6uLbBMqzeCOsNjxVYVHz0nT27E_yEm3cn // OG Pass
        '0:1897deaa62c76687bcde58915eecd4e139aa5d3d2fc84a79d5d803ce4fef0291', // test spaceship
        '0:7171c2291f4d6b1a996a7ba3592fe76170b6cf34ebd821e05ed9322bd378deac', // new parts
        '0:a588564f775c553a6ceb37d1f1e394895ff7d977b0d9b16427341e08333a0fa7', // new parts - prod
    ],

    'nft_item_id_by_metadata' => [
        'https://ipfs.filebase.io/ipfs/QmPeoHUk9H2HSGWUCbiyu7WSMdF4Xb4c8TPVxQ4iuXaLYH' => 6,
        'https://ipfs.filebase.io/ipfs/QmaWkXbCXZhZoc7tCEfwzCyUYSWZZPH7r4waexq2w1ho7S' => 7,
        'https://ipfs.filebase.io/ipfs/QmSnuDsyhRvy3HmrbopEBUPPHeDARN1uREpLCRzjpuEVzP' => 8,
        'https://ipfs.filebase.io/ipfs/QmdLLK29p8ZeswV3vtbJozpo5YVk8fWGXQHMWeHTVawUQi' => 9,
        'https://ipfs.filebase.io/ipfs/QmSV5MGVChKj8ktg1MsTDDW7RA4wECdkHLhg2Nn34Uj2hd' => 10,
        'https://ipfs.filebase.io/ipfs/QmSYSioHFKm8d1vhocKgsGf91d7pzUGdkpN7oiosYzKXHx' => 11,
    ],
    'tonapi-key' => 'AGJGIWXEUGA5EOYAAAAERGR2TQNBQKBZFMQUFYWUFDYCF2EOUHNGQP6BH46ISMHR76JBJBA',
    'watch-addresses' => [
        ['address' => 'UQA1ncIYvWqZ8Lba4diqFqbZ5hY0OL2QnkE3tIULrmFnELz2', 'name' => 'Highload wallet'],
        ['address' => 'UQC_WYZ_9yIMfg05y6rJeWrwEmc3tkDkdISa5IDC-ohWpWK2', 'name' => 'Алекс'],
        ['address' => 'UQChXxSvZzoGQ_5w-ncaT3Zm6x6P4LDOTa6w1WSS9AWP1BMy', 'name' => 'Старый кошелек для роялти'],
        ['address' => 'EQCwF7-OQiHBxKePiBFOAWwzHDTFHkJR9likOqTYFQc08OmS', 'name' => 'Коллекция кораблей'],
    ],
    'check-balance' => [
        ['address' => 'EQCwo-MsbrmWaMtB3Pb-egBCo2ZfZtc8vZ-xnOs8B6O-tFOi', 'name' => 'Коллекции кораблей'],
        ['address' => 'EQCNANRvXO-Z5GK6uLbBMqzeCOsNjxVYVHz0nT27E_yEm3cn', 'name' => 'OGPass'],
        ['address' => 'EQAJ-QU4xFrQRr1JCtQS7zAgCOvVDl5tkBvgwbAGOGiRd9MO', 'name' => 'Выставление на продажу'],
    ],

    // Todo: get from .env
    'max-tap-per-second' => 20,
    'sign' => [
        'key'    => env('REQ_SIGN_KEY', 'super-key'),     // signing key
        'method' => env('REQ_SIGN_METHOD', 'body'),   // header or body
    ],
    'user_cache' => 60*60,
    'lootboxes' => [
        [
            'id'        => 1,
            'name'      => 'DriveCore Alpha',
            'price'     => 1000,
            'reward'    => 12.5,
            'apy'       => 148,
            'nft_count' => 3,
            'months'    => 1,
            'duration'  => 60 * 60 * 24 * 30, // 1 month
            'max_claim' => 1,
        ],
        [
            'id'        => 2,
            'name'      => 'DriveCore Beta',
            'price'     => 1000,
            'months'    => 3,
            'reward'    => 16.7,
            'apy'       => 197,
            'nft_count' => 4,
            'duration'  => 60 * 60 * 24 * 30, // 1 month
            'max_claim' => 3,
        ],
        [
            'id'        => 3,
            'name'      => 'DriveCore Gamma',
            'price'     => 1000,
            'months'    => 6,
            'reward'    => 20.8,
            'apy'       => 246,
            'nft_count' => 5,
            'duration'  => 60 * 60 * 24 * 30, // 1 month
            'max_claim' => 6,
        ],
        [
            'id'        => 4,
            'name'      => 'DriveCore Delta',
            'price'     => 10000,
            'months'    => 1,
            'reward'    => 166.7,
            'apy'       => 109,
            'nft_count' => 20,
            'duration'  => 60 * 60 * 24 * 30, // 1 month
            'max_claim' => 1,
        ],
        [
            'id'        => 5,
            'name'      => 'DriveCore Epsilon',
            'price'     => 10000,
            'months'    => 3,
            'reward'    => 208.3,
            'apy'       => 158,
            'nft_count' => 30,
            'duration'  => 60 * 60 * 24 * 30, // 1 month
            'max_claim' => 3,
        ],
        [
            'id'        => 6,
            'name'      => 'DriveCore Zeta',
            'price'     => 10000,
            'months'    => 6,
            'reward'    => 250,
            'apy'       => 207,
            'nft_count' => 40,
            'duration'  => 60 * 60 * 24 * 30, // 1 month
            'max_claim' => 6,
        ],
        [
            'id'        => 7,
            'name'      => 'DriveCore Eta',
            'price'     => 50000,
            'months'    => 1,
            'reward'    => 1041.7,
            'apy'       => 114,
            'nft_count' => 100,
            'duration'  => 60 * 60 * 24 * 30, // 1 month
            'max_claim' => 1,
        ],
        [
            'id'        => 8,
            'name'      => 'DriveCore Theta',
            'price'     => 50000,
            'months'    => 3,
            'reward'    => 1250,
            'apy'       => 163,
            'nft_count' => 150,
            'duration'  => 60 * 60 * 24 * 30, // 1 month
            'max_claim' => 3,
        ],
        [
            'id'        => 9,
            'name'      => 'DriveCore Iota',
            'price'     => 50000,
            'months'    => 6,
            'reward'    => 1458,
            'apy'       => 212,
            'nft_count' => 200,
            'duration'  => 60 * 60 * 24 * 30, // 1 month
            'max_claim' => 6,
        ],
    ],

    // Список telegram_id кто может вызвать команду статистики в боте / stat и доступ в dashboard
    'stat_user_list' => [
        385206483,    // @aleksglad
        122605414,    // @ArhangelSky999
        947553172,    // @MaxDemkovich
        480552237,    // @anatoliiNR
        450310683,    // @pursuitcreator
        697450294,    // @swilsakov
        6101116195,   // @panteleymonsemenov
        328770915,    // @NevvTone
        1860738410,   // @Mmprotrusts
        267132556,    // @fimisha
        930168893,    // @biohazzardt
        450310683,    // @pursuitcreator
        1917583394,   // @F_Anna1
        408443821,    // @geras1mofff
        192480337,    // @Sunshine_boogie
        54456425,     // @meowcalypso
        1637766266,   // @Babinina_18
        7275013232,   // @karabazs
    ],
];

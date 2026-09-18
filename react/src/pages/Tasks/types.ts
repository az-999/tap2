export type TaskType =
  | 'telegram'
  | 'twitter'
  | 'telegram_boost'
  | 'tonkeeper_wallet'
  | 'ogc'
  | 'hexn'
  | 'wormfare'
  | 'bulls'
  | 'tonstakers_twitter'
  | 'tonstakers_telegram'
  | 'zimabank'
  | 'timeton'
  | 'vertus'
  | 'puppies'
  | 'trending'
  | 'artifica'
  | 'kolo'
  | 'nomis'
  | 'youtube'
  | 'rocket'
  | 'tiger'
  | 'noracle'
  | 'memeland-default'
  | 'memeland-telegram'
  | 'HamstersPAD'
  | 'tonbox'
  | 'seed'
  | 'nbb'
  | 'kem'
  | 'memefi'
  | 'yescoin'
  | 'BOOMCoin'
  | 'Hemera'
  | 'Cuberium'
  | 'Simple'
  | 'PiggyPiggy'
  | 'hamster'
  | 'Bitget'
  | 'Booms'
  | 'Swiss'
  | 'TimeFarm'
  | 'Mogul'
  | 'CATS'
  | 'CryptoRank'
  | 'Blocksport'
  | 'trustwallet';

export type TasksRequest = {
  hash: string;
  is_premium?: 0 | 1;
  language?: string;
};

export type Task = {
  id: number;
  type: TaskType;
  name: string;
  grant: number;
  url?: string;
  status: 'possible' | 'done' | 'granted';
  claimed_at?: number;
  category: 'default' | 'cols';
  is_active: 0 | 1;
  icon: string | null;

  /* дизайн обложки: null - по умолчанию, 1 - tonKepeer, 2 - tonStacker, 3 - bulls, 4 - MeetSafeConnect (без шагов), 5 - MeetSafeConnect (с шагами), 6 - Boom, 7 - TrustWallet, 8 - Security A.I., 9 - Tap Miner, 10 - Bull Run, 11 - monetag, 12 - SafeShield, 13 - SafeInWay  */
  design_id: number | null;

  /* фильтр для показа задачи в зависимости от модели телефона. null - показывать всем, 1 - android, 2 - iphone */
  phone_type: null | 1 | 2;

  /* стратегия проверки задания на фронте,
    - null - по умолчанию: показать ссылку, после перехода дать возможность проверить таск, отправить на BACK запрос на проверку таски и получить ответ
    - 1 - tonKeeper - проверить подключение кошелька, отправить на BACK запрос на проверку таски и получить ответ */
  checker_front: null | 1;
};

export type CheckTaskRequest = {
  id: number;
  hash: string;
};

export type CheckTaskResponse = {
  task: Omit<Task, 'type'>;
  balance: number;
};

export type DailyRewardResponse = {
  balance: number;
  day_grant_first: number;
  day_grant_day: number;
};

export type GrandPrizeResponse = {
  balance: number;
};

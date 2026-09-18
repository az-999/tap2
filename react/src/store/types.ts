import { SessionStatus } from '@/pages/Tapper/types';

export type FetchStateUnion = 'pending' | 'done' | 'error';
export type ErrorItem = {
  message: string;
  id: number;
  type?: 'info' | 'error';
};
export type HashReqArr = Record<string, number | string>[];

export type GrantReward = {
  id: number;
  amount: number;
  comment: string;
};

export type FarmInfo = {
  farm: number;
  taps: number;
  boost?: string | string; // опциональное ???
  active_booster_finish_at?: number;
};

export type PirateInfo = {
  status: SessionStatus;
  grant?: number; // награда за пиратскую миссию
  green_metka_finish_at?: number; // Момент окончания зеленой метки, если нет значения то значит нет и защиты
  black_metka_finish_at?: number; // Момент окончания пиратской миссии, если нет значения то значит нет и миссии
  black_metka_count?: 1 | 0; // если = 1, то есть черная метка, 0 - нет
  black_metka_count_grant_all?: number; // сколько заработано на пиратских миссиях за все время
  black_metka_count_all?: number; // Сколько меня ограбили всего (Stolen from you)
  shield_count?: number; //  Сколько я сохранил имея защиту с последнего захода
  shield_count_all?: number; // Сколько я сохранил имея защиту всего (Protected points)
  green_metka_modal_count: number; // Кол-во монет ограблено с последнего показа модалки (запроса фарминга / входа в приложение)
  green_metka_modal_flag: number; // Флаг последнего грабежа 0 - не было, 1 - малый (5%), 2 - средний (10%), 3 - прошло несколько дней
  star_wars_oferta: number; // Флаг Принята оферта? 1 - принята, 0 - не принята
  green_metka_modal_last_show_at: number; // когда последний раз показывалась модалка (запуск старта)
};

export type NftInfo = {
  market: number;
  bumpstore: number;
  shipkraft: number;
  shiplevelup: number;
  shipcombine: number;
  ogpass: number;
  staking: number;
  spaceshipparts: number;
  pirate: number;
  voucher: number;
  mmprotoken: number;
};

export type SessionInfo = {
  status: SessionStatus;
  start_at?: number;
  moon_time?: number;
};

export type CommonUserInfo = {
  info: FarmInfo;
  system_time: number;
  balance: number;
  balance_block: number;
  telegram_id?: number;
  day_grant_first: number | null;
  day_grant_day: number | null;
  day_grant_prize_possible: boolean;
  current_nft_id_farming: number | null;
  nft: NftInfo;
  has_wallet: 0 | 1;
  wallet: '0' | '1';
};

export type StartUserInfo = CommonUserInfo & {
  grant: GrantReward[];
  pirate: PirateInfo;
};

export type FarmingUserInfo = CommonUserInfo & {
  session: SessionInfo;
};

export type UserInfo = CommonUserInfo & {
  grant?: GrantReward[];
  pirate?: PirateInfo;
  session?: SessionInfo;
};

export type Version = {
  version: string;
  change_log: {
    version: string;
    date: string;
    update: string[];
    update_user?: string[];
  }[];
};

export type LoginResponse = {
  access_token: string;
  type: 'Bearer';
  expires_in: number;
};

export type WebLoginRequest = {
  id: number;
  first_name: string;
  auth_date: number;
  hash: string;
  last_name: string;
  photo_url: string;
  username: string;
};

export type GrantRewardResponse = {
  balance: number;
};

export type ApiResponse = {
  code: number;
  responseUrl: string;
  responseBody: string;
};

export type WalletUser = {
  username: string;
  chat_id: number;
  name_first: string;
  name_last: string;
};

export type RewardTooltip = {
  reward: number;
  prevBalance: number;
};

export type RewardTooltipWithoutBalance = {
  reward: number;
};

export type PrizeTooltip = {
  id: number;
};

export interface IBaseStore {
  /*  /!**
   * Returns fetch status
   *
   *!/
  fetchState: FetchStateUnion;

  /!**
   * Returns loading status
   *
   *!/
  isLoading: boolean;

  /!**
   * Actual app time
   *
   *!/
  timeNow: number;

  /!**
   * Returns error tooltips array
   *
   *!/
  errorTooltips?: ErrorItem[];

  /!**
   * Add values in error array.
   *
   * @param message - error message
   *
   *!/

  addErrorTooltip: (message: string) => void;

  /!**
   * Delete values in error array.
   *
   * @param message - error message
   *
   *!/
  deleteErrorTooltip: (id: number) => void;

  /!**
   * Update time now.
   *
   *!/
  updateTimeNow: () => void;

  /!**
   * Start time now.
   *
   *!/
  startNowTimer: () => void;

  /!**
   * Create HmacSHA256 string from request body.
   *
   * @param reqData - array of request values in alphabet order
   *
   *!/
  createHash: (reqData: HashReqArr) => string;*/
}

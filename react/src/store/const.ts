import { SweetAlertOptions } from 'sweetalert2';

import { SessionInfo, StartUserInfo, UserInfo } from '@/store/types';

export const API_VERSION = 'v1';

export const TELEGRAM_ID = '480552237';
export const VERIFY_TELEGRAM_DATA =
  '{"id":480552237,"first_name":"𝙰𝚗𝚊𝚝𝚘𝚕𝚒𝚒","username":"anatoliiNR","photo_url":"https://t.me/i/userpic/320/sNoUIzSlO9ijeiyiJoEOBZCiwd4Ll30nYv4cGYBwCJQ.jpg","auth_date":1723111688,"hash":"cb252944b11430fa8bafcdf2c364ddbae004752b290ddb82471ac77e5834020d"}';
// export const FARMING_PERIOD = 60 * 60 * 6;

/** моковая инитДата для бота №1*/
export const INIT_DATA =
  'query_id=AAEtpaQcAAAAAC2lpByQnGjY&user=%7B%22id%22%3A480552237%2C%22first_name%22%3A%22%F0%9D%99%B0%F0%9D%9A%97%F0%9D%9A%8A%F0%9D%9A%9D%F0%9D%9A%98%F0%9D%9A%95%F0%9D%9A%92%F0%9D%9A%92%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22anatoliiNR%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FsNoUIzSlO9ijeiyiJoEOBZCiwd4Ll30nYv4cGYBwCJQ.svg%22%7D&auth_date=1748516596&signature=TEFrgRYMYY7eIfuQr4b2poRD2D8LoUV7ADQae9YlNc7H7akEa3ewhs_sEonNe2_OV1Ore43oWR-YfnYbjvxtDw&hash=e1bf3f0c4c5bdcfdc8be5e0609f2857e10d697b094cc1bc8c6d1574ddd7b936d';

/** моковая инитДата для бота №2*/
export const SECOND_INIT_DATA =
  'query_id=AAEtpaQcAAAAAC2lpByI0s_b&user=%7B%22id%22%3A480552237%2C%22first_name%22%3A%22%F0%9D%99%B0%F0%9D%9A%97%F0%9D%9A%8A%F0%9D%9A%9D%F0%9D%9A%98%F0%9D%9A%95%F0%9D%9A%92%F0%9D%9A%92%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22anatoliiNR%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1723192096&hash=aeb468a32da8241b5a2b062a07adee08f719a0dfcd2f5a7b9e642ec6b276d18f';
export const ANIMATION_DURATION = 5000;
export const BOT_NAME_PROD = 'MMproBump_bot';
export const BOT_NAME_STAGE = 'MMBump_Stage_bot';
export const BOT_NAME = 'tap_test999_bot';
export const HIGHLOAD_WALLET_ADDRESS =
  'UQA1ncIYvWqZ8Lba4diqFqbZ5hY0OL2QnkE3tIULrmFnELz2';
export const BUMP_FUN_URL = 'https://bumpfun.mmbump.pro/';

export const DEFAULT_USER_INFO: StartUserInfo = {
  info: {
    farm: 0,
    taps: 0,
    // boost?: string | string; ???
  },
  balance: 0,
  balance_block: 0,
  system_time: 0,
  day_grant_first: 0,
  day_grant_day: null,
  current_nft_id_farming: null,
  has_wallet: 0,
  wallet: '0',
  pirate: {
    status: 'await',
    grant: 0,
    green_metka_modal_count: 0,
    green_metka_modal_flag: 0,
    star_wars_oferta: 0,
    green_metka_modal_last_show_at: 0,
  },
  nft: {
    market: 1,
    bumpstore: 1,
    shipkraft: 1,
    shiplevelup: 1,
    shipcombine: 1,
    ogpass: 1,
    staking: 1,
    spaceshipparts: 1,
    pirate: 1,
    voucher: 1,
    mmprotoken: 1,
  },
  grant: [],
  day_grant_prize_possible: false,
};

export const DEFAULT_FARMING_INFO: {
  session: SessionInfo;
} = {
  session: {
    start_at: 0,
    status: 'await',
    moon_time: 0,
  },
};

export const defaultSweetAlertOptions: Partial<SweetAlertOptions> = {
  width: 300,
  confirmButtonText: 'Buy',
  confirmButtonColor: 'rgb(51, 204, 102)',
  cancelButtonText: 'Cancel',
  cancelButtonColor: 'rgb(34, 35, 37)',
};

import request from 'supertest';

import app from './nodeServer';
import rootStore, { RootStore } from '@/store';
import {
  INIT_DATA,
  SECOND_INIT_DATA,
  VERIFY_TELEGRAM_DATA,
} from '@/store/const';
import { GrantReward } from '@/store/types';

describe('AuthStore', () => {
  let store: RootStore;

  beforeEach(() => {
    store = rootStore;
  });

  it('Проверка получения токена', async () => {
    const response = await request(app)
      .post('/loginJwt')
      .send({
        initData:
          process.env.REACT_APP_BOT_VERSION === '1'
            ? INIT_DATA
            : SECOND_INIT_DATA,
      })
      .expect('Content-Type', /json/)
      .expect(200);

    console.log('loginJwt res:', response.body);

    expect(response.body).toHaveProperty('access_token');
    expect(typeof response.body.access_token).toBe('string');
    localStorage.setItem('test-token', response.body.access_token);

    expect(response.body.type).toEqual('Bearer');

    expect(response.body).toHaveProperty('expires_in');
    expect(typeof response.body.expires_in).toBe('number');
  });

  it('Проверка получения токена на веб версии', async () => {
    const response = await request(app)
      .post('/loginWebJwt')
      .send({
        userInitData: VERIFY_TELEGRAM_DATA,
      })
      .expect('Content-Type', /json/)
      .expect(200);

    console.log('loginWebJwt res:', response.body);

    expect(response.body).toHaveProperty('access_token');
    expect(typeof response.body.access_token).toBe('string');

    expect(response.body.type).toEqual('Bearer');

    expect(response.body).toHaveProperty('expires_in');
    expect(typeof response.body.expires_in).toBe('number');
  });

  it('Проверка получения рефреш-токена', async () => {
    const response = await request(app)
      .post('/refreshJwt')
      .expect('Content-Type', /json/)
      .expect(200);

    console.log('refreshJwt res:', response.body);

    expect(response.body).toHaveProperty('access_token');
    expect(typeof response.body.access_token).toBe('string');
    localStorage.setItem('test-token', response.body.access_token);

    expect(response.body.type).toEqual('Bearer');

    expect(response.body).toHaveProperty('expires_in');
    expect(typeof response.body.expires_in).toBe('number');
  });

  it('Проверка получения базовой информации пользователя', async () => {
    const response = await request(app)
      .post('/baseUserInfo')
      .expect('Content-Type', /json/)
      .expect(200);

    console.log('baseUserInfo res:', response.body);
    const grantArray = response.body.grant;

    expect(response.body).toHaveProperty('info');
    expect(response.body.info).toHaveProperty('farm');
    expect(typeof response.body.info.farm).toBe('number');
    expect(response.body.info).toHaveProperty('taps');
    expect(typeof response.body.info.taps).toBe('number');
    response.body.info.boost !== undefined
      ? expect(['x2', 'x3', 'x5']).toContain(response.body.info.boost)
      : expect(response.body.info.boost).toBeUndefined();
    response.body.info.active_booster_finish_at !== undefined
      ? expect(typeof response.body.info.active_booster_finish_at).toBe(
          'number',
        )
      : expect(response.body.info.active_booster_finish_at).toBeUndefined();

    expect(response.body).toHaveProperty('system_time');
    expect(typeof response.body.system_time).toBe('number');

    response.body.telegram_id !== undefined
      ? expect(typeof response.body.telegram_id).toBe('number')
      : expect(response.body.info.telegram_id).toBeUndefined();

    expect(response.body).toHaveProperty('balance');
    expect(typeof response.body.balance).toBe('number');

    expect(response.body).toHaveProperty('balance_block');
    expect(typeof response.body.balance_block).toBe('number');

    response.body.day_grant_first !== undefined
      ? expect(
          response.body.day_grant_first === null ||
            typeof response.body.day_grant_first === 'number',
        ).toBe(true)
      : expect(response.body.info.day_grant_first).toBeUndefined();

    response.body.day_grant_day !== undefined
      ? expect(
          response.body.day_grant_day === null ||
            typeof response.body.day_grant_day === 'number',
        ).toBe(true)
      : expect(response.body.info.day_grant_day).toBeUndefined();

    response.body.current_nft_id_farming !== undefined
      ? expect(
          response.body.current_nft_id_farming === null ||
            typeof response.body.current_nft_id_farming === 'number',
        ).toBe(true)
      : expect(response.body.info.current_nft_id_farming).toBeUndefined();

    expect(response.body).toHaveProperty('has_wallet');
    expect(typeof response.body.has_wallet).toBe('boolean');

    expect(response.body).toHaveProperty('wallet');
    expect(typeof response.body.wallet).toBe('string');

    expect(response.body).toHaveProperty('nft');
    expect(response.body.nft).toHaveProperty('market');
    expect(typeof response.body.nft.market).toBe('number');
    expect(response.body.nft).toHaveProperty('bumpstore');
    expect(typeof response.body.nft.bumpstore).toBe('number');
    expect(response.body.nft).toHaveProperty('shipkraft');
    expect(typeof response.body.nft.shipkraft).toBe('number');
    expect(response.body.nft).toHaveProperty('shiplevelup');
    expect(typeof response.body.nft.shiplevelup).toBe('number');
    expect(response.body.nft).toHaveProperty('shipcombine');
    expect(typeof response.body.nft.shipcombine).toBe('number');

    expect(response.body).toHaveProperty('session');
    expect(response.body.session).toHaveProperty('status');
    expect(['await', 'inProgress', 'finished']).toContain(
      response.body.session.status,
    );
    response.body.session.start_at !== undefined
      ? expect(typeof response.body.session.start_at).toBe('number')
      : expect(response.body.session.start_at).toBeUndefined();
    response.body.session.moon_time !== undefined
      ? expect(typeof response.body.session.moon_time).toBe('number')
      : expect(response.body.session.moon_time).toBeUndefined();

    expect(response.body).toHaveProperty('grant');
    expect(Array.isArray(response.body.grant)).toBe(true);
    grantArray.forEach((grant: GrantReward) => {
      expect(grant).toHaveProperty('id');
      expect(typeof grant.id).toBe('number');
      expect(grant).toHaveProperty('amount');
      expect(typeof grant.amount).toBe('number');
      expect(grant).toHaveProperty('comment');
      expect(typeof grant.comment).toBe('string');
    });
  });

  it('Проверка загрузки кошелька пользователя', async () => {
    const address = process.env.USER_WALLET_ADDRESS!;
    const hash = store.createHash([{ address }]);

    const response = await request(app)
      .post('/userWallet')
      .send({
        address,
        hash,
      })
      .expect('Content-Type', /json/)
      .expect(200);

    console.log('userWallet res:', response.body);
  });

  it('Проверка получения списка наград (ручное доначисление)', async () => {
    const hash = store.createHash([]);

    const response = await request(app)
      .post('/grantExist')
      .send({ hash })
      .expect('Content-Type', /json/)
      .expect(200);

    console.log('grantExist res:', response.body);

    response.body.length > 0
      ? response.body.forEach((grant: GrantReward) => {
          expect(grant).toHaveProperty('id');
          expect(typeof grant.id).toBe('number');
          expect(grant).toHaveProperty('amount');
          expect(typeof grant.amount).toBe('number');
          expect(grant).toHaveProperty('comment');
          expect(typeof grant.comment).toBe('string');
        })
      : expect(response.body).toEqual([]);
  });
});

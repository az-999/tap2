import request from 'supertest';

import { Friend } from '@/pages/Friends/types';
import rootStore, { RootStore } from '@/store';
import app from '@/tests/nodeServer';

describe('friendsStore', () => {
  let store: RootStore;

  beforeEach(() => {
    store = rootStore;
  });

  it('получение списка друзей', async () => {
    const limit = 20,
      offset = 0;
    const hash = store.createHash([{ offset }, { limit }]);

    const response = await request(app)
      .post('/fetchFriends')
      .send({
        offset,
        limit,
        hash,
      })
      .expect('Content-Type', /json/)
      .expect(200);

    console.log('fetchFriends res:', response.body);

    response.body.list.length > 0
      ? response.body.list.forEach((item: Friend) => {
          expect(item).toHaveProperty('chat_id');
          expect(typeof item.chat_id).toBe('number');
          expect(item).toHaveProperty('name_first');
          expect(typeof item.name_first).toBe('string');
          expect(item).toHaveProperty('name_last');
          expect(typeof item.name_last).toBe('string');
          expect(item).toHaveProperty('ref_balance');
          expect(typeof item.ref_balance).toBe('number');
        })
      : expect(response.body.list).toEqual([]);
    response.body.count !== undefined
      ? expect(typeof response.body.count).toBe('number')
      : expect(response.body.info.count).toBeUndefined();
    response.body.friend_claim !== undefined
      ? expect(typeof response.body.friend_claim).toBe('number')
      : expect(response.body.info.friend_claim).toBeUndefined();
  });

  it('получение клейма за друзей', async () => {
    const hash = store.createHash([]);

    const response = await request(app)
      .post('/postFriendsClaim')
      .send({ hash })
      .expect('Content-Type', /json/)
      .expect(200);

    console.log('postFriendsClaim res:', response.body);

    expect(response.body).toHaveProperty('balance');
    expect(typeof response.body.balance).toBe('number');
    expect(response.body).toHaveProperty('sum');
    expect(typeof response.body.sum).toBe('number');
  });
});

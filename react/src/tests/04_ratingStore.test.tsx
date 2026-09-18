import request from 'supertest';

import { RatingItem } from '@/pages/Rating/types';
import rootStore, { RootStore } from '@/store';
import app from '@/tests/nodeServer';

describe('ratingStore', () => {
  let store: RootStore;

  beforeEach(() => {
    store = rootStore;
  });

  it('получение рейтинга пользователя', async () => {
    const hash = store.createHash([]);

    const response = await request(app)
      .post('/fetchRating')
      .send({ hash })
      .expect('Content-Type', /json/)
      .expect(200);

    console.log('fetchRating res:', response.body);

    expect(response.body).toHaveProperty('list');
    response.body.list.length > 0
      ? response.body.list.forEach((ratingItem: RatingItem) => {
          expect(ratingItem).toHaveProperty('chat_id');
          expect(typeof ratingItem.chat_id).toBe('number');
          expect(ratingItem).toHaveProperty('place');
          expect(typeof ratingItem.place).toBe('number');
          expect(ratingItem).toHaveProperty('name_first');
          expect(typeof ratingItem.name_first).toBe('string');
          expect(ratingItem).toHaveProperty('name_last');
          expect(typeof ratingItem.name_last).toBe('string');
          expect(ratingItem).toHaveProperty('balance_farmed');
          expect(typeof ratingItem.balance_farmed).toBe('number');
          expect(ratingItem).toHaveProperty('friends');
          expect(typeof ratingItem.friends).toBe('number');
        })
      : expect(response.body.list).toEqual([]);

    expect(response.body).toHaveProperty('my_place');
    expect(response.body.my_place).toHaveProperty('place');
    expect(
      response.body.my_place.place === null ||
        typeof response.body.my_place.place === 'number',
    ).toBe(true);
    expect(response.body.my_place).toHaveProperty('friends');
    expect(typeof response.body.my_place.friends).toBe('number');
    expect(response.body.my_place).toHaveProperty('balance_farmed');
    expect(typeof response.body.my_place.balance_farmed).toBe('number');
    expect(response.body.my_place).toHaveProperty('is_place_10');
    expect(typeof response.body.my_place.is_place_10).toBe('boolean');
    expect(response.body.my_place).toHaveProperty('place_plus');
    expect(
      response.body.my_place.place_plus === null ||
        typeof response.body.my_place.place_plus === 'number',
    ).toBe(true);
  });
});

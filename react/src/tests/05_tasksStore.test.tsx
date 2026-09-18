import request from 'supertest';

import { Task } from '@/pages/Tasks/types';
import rootStore, { RootStore } from '@/store';
import app from '@/tests/nodeServer';

describe('TasksStore', () => {
  let store: RootStore;

  beforeEach(() => {
    store = rootStore;
  });

  it('Проверка получения тасок', async () => {
    const hash = store.createHash([]);

    const response = await request(app)
      .post('/fetchTaskList')
      .send({ hash })
      .expect('Content-Type', /json/)
      .expect(200);

    console.log('fetchTaskList res:', response.body);

    response.body.length > 0
      ? response.body.forEach((task: Task) => {
          expect(task).toHaveProperty('id');
          expect(typeof task.id).toBe('number');
          expect(task).toHaveProperty('type');
          expect(typeof task.type).toBe('string');
          expect(task).toHaveProperty('name');
          expect(typeof task.name).toBe('string');
          expect(task).toHaveProperty('grant');
          expect(typeof task.grant).toBe('number');
          task.url !== undefined
            ? expect(typeof task.url).toBe('string')
            : expect(task.url).toBeUndefined();
          expect(task).toHaveProperty('status');
          expect(['possible', 'done', 'granted']).toContain(task.status);
          task.claimed_at !== undefined
            ? expect(typeof task.claimed_at).toBe('number')
            : expect(task.claimed_at).toBeUndefined();
          expect(task).toHaveProperty('category');
          expect(['default', 'cols']).toContain(task.category);
          expect(task).toHaveProperty('is_active');
          expect([0, 1]).toContain(task.is_active);
          expect(task).toHaveProperty('icon');
          expect(task.icon === null || typeof task.icon === 'string').toBe(
            true,
          );
          expect(task).toHaveProperty('design_id');
          expect(
            task.design_id === null || typeof task.design_id === 'number',
          ).toBe(true);
          expect(task).toHaveProperty('phone_type');
          expect([null, 1, 2]).toContain(task.phone_type);
          expect(task).toHaveProperty('checker_front');
          expect([null, 1]).toContain(task.checker_front);
        })
      : expect(response.body).toEqual([]);
  });
});

import axios from 'axios';
import express from 'express';

import { ClaimResponse, FriendResponse } from '@/pages/Friends/types';
import { RatingResponse } from '@/pages/Rating/types';
import { Task } from '@/pages/Tasks/types';
import { API_VERSION } from '@/store/const';
import { GrantReward, LoginResponse, UserInfo } from '@/store/types';
import Utils from '@/utils';

const app = express();
app.use(express.json());

const axiosInstance = axios.create({
  baseURL: `${Utils.getApiUrl()}/${API_VERSION}`,
});

app.post('/loginJwt', async (req, res) => {
  console.log('loginJwt run');
  const { initData } = req.body;

  const response = await axiosInstance
    .post<LoginResponse>('/loginJwt', {
      initData,
    })
    .then((res) => res.data)
    .catch((e) => console.error('e', e));

  res.status(200).json(response);
});

app.post('/loginWebJwt', async (req, res) => {
  console.log('loginWebJwt run');
  const initData = req.body.userInitData;
  const body = JSON.parse(initData);

  const response = await axiosInstance
    .post<LoginResponse>('/loginWeb', body)
    .then((res) => res.data)
    .catch((e) => console.error('e', e));

  res.status(200).json(response);
});

app.post('/refreshJwt', async (_req, res) => {
  console.log('refreshJwt run');
  const token = localStorage.getItem('test-token');

  const response = await axiosInstance
    .post<LoginResponse>('/auth/refresh', undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((e) => console.error('e', e));

  res.status(200).json(response);
});

app.post('/baseUserInfo', async (_req, res) => {
  console.log('baseUserInfo run');
  const token = localStorage.getItem('test-token');

  const response = await axiosInstance
    .post<UserInfo>('/farming', undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((e) => console.error('e', e));

  res.status(200).json(response);
});

app.post('/userWallet', async (req, res) => {
  console.log('userWallet run');
  const { address, hash } = req.body;
  const token = localStorage.getItem('test-token');

  const response = await axiosInstance
    .post(
      '/wallet',
      { address, hash },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => res.data)
    .catch((e) => console.error('e', e));

  res.status(200).json(response);
});

app.post('/grantExist', async (req, res) => {
  console.log('grantExist run');
  const { hash } = req.body;
  const token = localStorage.getItem('test-token');

  const response = await axiosInstance
    .post<GrantReward[]>(
      '/grant',
      { hash },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => res.data)
    .catch((e) => console.error('e', e));

  res.status(200).json(response);
});

app.post('/fetchFriends', async (req, res) => {
  console.log('fetchFriends run');
  const { hash, offset, limit } = req.body;
  const token = localStorage.getItem('test-token');

  const response = await axiosInstance
    .post<FriendResponse>(
      '/friends',
      { hash, offset, limit },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => res.data)
    .catch((e) => console.error('e', e));

  res.status(200).json(response);
});

app.post('/postFriendsClaim', async (req, res) => {
  console.log('postFriendsClaim run');
  const { hash } = req.body;
  const token = localStorage.getItem('test-token');

  const response = await axiosInstance
    .post<ClaimResponse>(
      '/friends/claim',
      { hash },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => res.data)
    .catch((e) => console.error('e', e));

  res.status(200).json(response);
});

app.post('/fetchRating', async (req, res) => {
  console.log('fetchRating run');
  const { hash } = req.body;
  const token = localStorage.getItem('test-token');

  const response = await axiosInstance
    .post<RatingResponse>(
      '/rating',
      { hash },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => res.data)
    .catch((e) => console.error('e', e));

  res.status(200).json(response);
});

app.post('/fetchTaskList', async (req, res) => {
  console.log('fetchTasks run');
  const { hash } = req.body;
  const token = localStorage.getItem('test-token');

  const response = await axiosInstance
    .post<Task[]>(
      '/task-list',
      { hash },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => res.data)
    .catch((e) => console.error('e', e));

  res.status(200).json(response);
});

export default app;

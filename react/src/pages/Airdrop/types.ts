import { ReactNode } from 'react';

export type TaskKey =
  | 'task1'
  | 'task2'
  | 'task3'
  | 'task4'
  | 'task5'
  | 'task6'
  | 'task7'
  | 'task8'
  | 'task9'
  | 'task10'
  | 'task11'
  | 'task12'
  | 'task13'
  | 'task14'
  | 'task15'
  | 'task16'
  | 'task17';

export type Task1 = {
  request: {
    status: 0 | 1 | 2 | 3;
  };
};

export type Task2 = {
  total_earned: number;
  first_time: number | null;
  day: number;
};

export type Task3 = {
  status: 0 | 1;
};

export type Task4 = {
  count: number | null;
  task4_total_earned: number | null;
};

export type Task5 = {
  status: 0 | 1 | 2;
};

export type Task5Response = {
  id5: Task5;
  id6: Task5;
  id7: Task5;
  id8: Task5;
  id9: Task5;
  id10: Task5;
};

export type Task11 = {
  total_earned: number;
  accamulated: number;
};

export type RegRecurringTask = {
  total_earned: number;
  is_exist: boolean;
};

export type RegOneTimeTask = {
  is_get: boolean;
};

export type AirdropTasksResponse = {
  balance_ap: number;
  balance_token_rank: number;
  task1: Task1;
  task2: Task2;
  task3: Task3;
  task4: Task4;
  task5: Task5Response;
  task6: Task11;
  task7: RegRecurringTask;
  task8: RegRecurringTask;
  task9: RegOneTimeTask;
  task10: RegRecurringTask;
  task11: RegRecurringTask;
  task12: RegOneTimeTask;
};

export type AirdropTasks = {
  balance_ap: number;
  balance_token_rank: number;
} & {
  [key in TaskKey]:
    | Task1
    | Task2
    | Task3
    | Task4
    | Task5
    | Task11
    | RegRecurringTask
    | RegOneTimeTask;
};

export type TaskType = 'special' | 'recurring' | 'oneTime' | 'limited';

export type RewardAmount = 1 | 10 | 100 | 1000;

export type TaskContent = {
  id: string;
  type: TaskType;
  title: string;
  content: ReactNode;
  basedReward: RewardAmount;
  isWithProgress?: boolean;
};

export type UserNickWhiteBitTaskRequest = {
  nik: string;
  hash: string;
};

export type ClaimResponse = {
  balance_ap: number;
  grant: number;
};

export type OneTimeSubscribeTaskResponse = {
  balance_ap: number;
  grant: number;
  grant_point: number;
  balance: number;
};

export type MmproPointsTaskResponse = CommonTaskResponse & {
  balance: number;
};

export type CommonTaskResponse = {
  balance_ap: number;
  grant: number;
  total_earned: number;
};

export type RatingItem = {
  balance_ap: number;
  tg_id: number;
  name_last: string;
  name_first: string;
  place: number;
  is_my?: 1;
};

export type MyRatingPlace = {
  is_place_10: boolean;
  balance_ap: number;
  place: number | null;
  place_plus: string | null;
};

export type RatingResponse = {
  my_place: MyRatingPlace;
  list: RatingItem[];
  list10: Omit<RatingItem, 'is_my'>[];
};

export type WatchAddTask = {
  balance: number;
  grant: number;
};

export type AirdropCompleteResponse = {
  season1_is_end: number;
  data: {
    balance_ap: number;
    balance_bp: number;
    rating: number | null;
  };
} | null;

export type FarmingStartResponse = {
  status: SessionStatus;
  id: number;
  start_at: number;
  moon_time: number;
};

export type SessionStatus = 'await' | 'inProgress' | 'finished';

export type FarmingStartRequest = {
  status: SessionStatus;
  hash: string;
};

export type FarmingFinishRequest = {
  tapCount: number;
  hash: string;
};

export type FarmingFinishResponse = {
  session: {
    id: number;
    created_at: Date;
    updated_at: Date;
    start_at: number;
    finish_at: number;
    status: number;
    user_telegram_id: number;
    amount: number;
    taps: number;
  };
  balance: number;
};

export type UnblockEnergyResponse = { balance: number; grant: number };

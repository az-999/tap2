export type Boost = {
  id: 'x2' | 'x3' | 'x5';
  start_at: number;
  finish_at: number;
  price: number;
};

export type BoostRequest = {
  id: Boost['id'];
  hash: string;
};

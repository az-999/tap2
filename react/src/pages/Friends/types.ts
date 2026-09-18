export type Friend = {
  chat_id: number;
  name_first: string;
  name_last: string;
  ref_balance: number;
};

export type FriendRequest = {
  limit: number;
  offset: number;
  hash: string;
};

export type FriendResponse = {
  list: Friend[];
  count?: number;
  friend_claim?: number;
};

export type ClaimResponse = {
  balance: number;
  sum: number;
};

export type Referral = {
  external_id: string;
  name: string;
  balance: number;
};

export type RatingResponse = {
  list: RatingItem[];
  my_place: MyPlace;
};

export type RatingItem = {
  chat_id: number;
  place: number;
  name_first: string;
  name_last: string;
  balance_farmed: number;
  friends: number;
};

export type MyPlace = {
  place: number | null;
  friends: number;
  balance_farmed: number;
  is_place_10: boolean;
  place_plus: string | null;
};

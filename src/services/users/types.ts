type TUser = {
  id: number;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  nickname?: string;
  email: string;
  email_is_verified: boolean;
  phone: string;
  avatar?: string;
};

export type { TUser };

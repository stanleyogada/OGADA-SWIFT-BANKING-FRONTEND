import { axiosInstance } from "@utils/axiosInstance";
import { ENDPOINTS } from "@constants/services";

import type { TUser, TUserAccount } from "./types";

const getCurrentUser = async (): Promise<TUser> => {
  const { data } = await axiosInstance({
    method: "GET",
    url: ENDPOINTS.currentUser,
  });

  return {
    ...data.data,
    fullName: `${data.data.first_name} ${data.data.last_name}`,
  } as TUser;
};

const getCurrentUserAccounts = async (): Promise<TUserAccount[]> => {
  const { data } = await axiosInstance({
    method: "GET",
    url: ENDPOINTS.currentUserAccounts,
  });

  return data.data as TUserAccount[];
};

export { getCurrentUser, getCurrentUserAccounts };

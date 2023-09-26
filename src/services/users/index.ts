import { axiosInstance } from "@utils/axiosInstance";
import { ENDPOINTS } from "@constants/services";

import type { TUser, TUserAccount, TUserDefault } from "./types";

const getCurrentUser = async (): Promise<TUser> => {
  const { data } = await axiosInstance({
    method: "GET",
    url: ENDPOINTS.currentUser,
  });

  return {
    ...data?.data,
    fullName: `${data?.data?.first_name} ${data?.data?.last_name}`,
  } as TUser;
};

const getCurrentUserAccounts = async (): Promise<TUserAccount[]> => {
  const { data } = await axiosInstance({
    method: "GET",
    url: ENDPOINTS.currentUserAccounts,
  });

  return data.data as TUserAccount[];
};

const getDefaultUserLoginInfo = async (): Promise<TUserDefault> => {
  const { data } = await axiosInstance({
    method: "GET",
    url: ENDPOINTS.defaultUserLoginInfo,
  });

  return data.data as TUserDefault;
};

const getUserByPhone = async (phone: string): Promise<TUser> => {
  const { data: json } = await axiosInstance({
    method: "GET",
    url: `${ENDPOINTS.getUserByPhone}/${phone}`,
  });

  return json.data as TUser;
};

export { getCurrentUser, getCurrentUserAccounts, getDefaultUserLoginInfo, getUserByPhone };

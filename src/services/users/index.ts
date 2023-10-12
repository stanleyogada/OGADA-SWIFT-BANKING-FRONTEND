import { axiosInstance } from "@utils/axiosInstance";
import { ENDPOINTS } from "@constants/services";

import type { TUser, TUserAccount, TUserDefault } from "./types";

const getCurrentUser = async (): Promise<TUser> => {
  const { data: json } = await axiosInstance({
    method: "GET",
    url: ENDPOINTS.currentUser,
  });

  return {
    ...json?.data,
    fullName: `${json?.data?.first_name} ${json?.data?.last_name}`,
  } as TUser;
};

const getCurrentUserAccounts = async (): Promise<TUserAccount[]> => {
  const { data: json } = await axiosInstance({
    method: "GET",
    url: ENDPOINTS.currentUserAccounts,
  });

  return json.data as TUserAccount[];
};

const getDefaultUserLoginInfo = async (): Promise<TUserDefault> => {
  const { data: json } = await axiosInstance({
    method: "GET",
    url: ENDPOINTS.defaultUserLoginInfo,
  });

  return json.data as TUserDefault;
};

const getUserByPhone = async (phone: string): Promise<TUser> => {
  const { data: json } = await axiosInstance({
    method: "GET",
    url: `${ENDPOINTS.getUserByPhone}/${phone}`,
  });

  return {
    ...json?.data,
    fullName: `${json?.data?.first_name} ${json?.data?.last_name}`,
  } as TUser;
};

const patchUser = async ({ nickname, email }: { nickname: string | undefined; email: string | undefined }) => {
  await axiosInstance({
    method: "PATCH",
    url: ENDPOINTS.editUser,

    data: {
      nickname,
      email,
    },
  });
};

const patchPasscode = async ({ oldPasscode, newPasscode }: { oldPasscode: string; newPasscode: string }) => {
  let response = await axiosInstance({
    method: "PATCH",
    url: ENDPOINTS.updatePass,
    data: {
      old_login_passcode: oldPasscode,
      new_login_passcode: newPasscode,
    },
  });
  return response;
};

export { getCurrentUser, getCurrentUserAccounts, patchUser, getDefaultUserLoginInfo, getUserByPhone, patchPasscode };

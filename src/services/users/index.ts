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

export { getCurrentUser, getCurrentUserAccounts, patchUser, getDefaultUserLoginInfo };

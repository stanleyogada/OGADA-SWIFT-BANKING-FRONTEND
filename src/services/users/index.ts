import { axiosInstance } from "@utils/axiosInstance";
import { ENDPOINTS } from "@constants/services";
import { TUser } from "./types";

const getCurrentUser = async (): Promise<TUser> => {
  const { data } = await axiosInstance({
    method: "GET",
    url: ENDPOINTS.currentUser,
  });

  return data.data;
};

export { getCurrentUser };

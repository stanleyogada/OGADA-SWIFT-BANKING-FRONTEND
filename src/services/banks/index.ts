import { axiosInstance } from "@utils/axiosInstance";
import { ENDPOINTS } from "@constants/services";
import { TBank } from "./types";

const getBanks = async (): Promise<TBank[]> => {
  const { data: json } = await axiosInstance({
    method: "GET",
    url: ENDPOINTS.getAllBanks,
  });

  return json.data as TBank[];
};

export { getBanks };

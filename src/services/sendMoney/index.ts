import { axiosInstance } from "@utils/axiosInstance";
import { ENDPOINTS } from "@constants/services";

import type { TSendMoneyInHouseProps } from "./types";

const postSendMoneyInHouse = async (payload: TSendMoneyInHouseProps) => {
  await axiosInstance({
    method: "POST",
    url: ENDPOINTS.sendMoneyInHouse,
    data: payload,
  });
};

export { postSendMoneyInHouse };

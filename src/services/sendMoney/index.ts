import { axiosInstance } from "@utils/axiosInstance";
import { ENDPOINTS } from "@constants/services";

type TSendMoneyInHouseProps = {
  transferPin: string;
  senderAccountType: string;
  receiverAccountNumber: string;
  amount: number;
  remark: string;
};

const postSendMoneyInHouse = async (payload: TSendMoneyInHouseProps) => {
  await axiosInstance({
    method: "POST",
    url: ENDPOINTS.sendMoneyInHouse,
    data: payload,
  });
};

export { postSendMoneyInHouse };

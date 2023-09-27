import { axiosInstance } from "@utils/axiosInstance";
import { ENDPOINTS } from "@constants/services";
import { TUserAccountType } from "@services/users/types";

type TSendMoneyInHouseProps = {
  transferPin: string;
  senderAccountType: TUserAccountType;
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

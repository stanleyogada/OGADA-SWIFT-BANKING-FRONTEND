import { TUserAccountType } from "@services/users/types";

type TSendMoneyInHouseProps = {
  transferPin: string;
  senderAccountType: TUserAccountType;
  receiverAccountNumber: string;
  amount: number;
  remark: string;
};

export type { TSendMoneyInHouseProps };

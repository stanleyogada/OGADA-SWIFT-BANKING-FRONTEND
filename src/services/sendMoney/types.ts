import { TUserAccountType } from "@services/users/types";

type TSendMoneyInHouseProps = {
  transferPin: string;
  senderAccountType: TUserAccountType;
  receiverAccountNumber: string;
  amount: number;
  remark: string;
};

type TSendMoneyBankProps = {
  transferPin: string;
  senderAccountType: TUserAccountType;
  bankName: string;
  bankAccountFullName: string;
  bankAccountNumber: string;
  amount: number;
  remark: string;
};

type TSendMoneyMobileProps = {
  transferPin: string;
  accountType: TUserAccountType;
  amount: number;
  operator: string;
  phoneNumber: string;
  isAirtime: boolean;
};

export type { TSendMoneyInHouseProps, TSendMoneyBankProps, TSendMoneyMobileProps };

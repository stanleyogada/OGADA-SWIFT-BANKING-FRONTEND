import { axiosInstance } from "@utils/axiosInstance";
import { ENDPOINTS } from "@constants/services";

import type { TSendMoneyInHouseProps, TSendMoneyBankProps, TSendMoneyMobileProps } from "./types";

const postSendMoneyInHouse = async (payload: TSendMoneyInHouseProps) => {
  await axiosInstance({
    method: "POST",
    url: ENDPOINTS.sendMoneyInHouse,
    data: {
      transfer_pin: payload.transferPin,
      sender_account_type: payload.senderAccountType,
      receiver_account_number: payload.receiverAccountNumber,
      amount: payload.amount,
      remark: payload.remark,
    },
  });
};

const postSendMoneyBank = async (payload: TSendMoneyBankProps) => {
  await axiosInstance({
    method: "POST",
    url: ENDPOINTS.sendMoneyBank,
    data: {
      transfer_pin: payload.transferPin,
      sender_account_type: payload.senderAccountType,
      bank_name: payload.bankName,
      bank_account_full_name: payload.bankAccountFullName,
      bank_account_number: payload.bankAccountNumber,
      amount: payload.amount,
      remark: payload.remark,
    },
  });
};

const postSendMoneyMobile = async (payload: TSendMoneyMobileProps) => {
  await axiosInstance({
    method: "POST",
    url: ENDPOINTS.sendMoneyMobile,
    data: {
      transfer_pin: payload.transferPin,
      sender_account_type: payload.senderAccountType,
      amount: payload.amount,
      operator: payload.operator,
      phone_number: payload.phoneNumber,
      is_airtime: payload.isAirtime,
      remark: payload.remark,
    },
  });
};

export { postSendMoneyInHouse, postSendMoneyBank, postSendMoneyMobile };

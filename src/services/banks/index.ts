import { axiosInstance } from "@utils/axiosInstance";
import { ENDPOINTS } from "@constants/services";
import { TBank, TBankVerification } from "./types";

const getBanks = async (): Promise<TBank[]> => {
  const { data: json } = await axiosInstance({
    method: "GET",
    url: ENDPOINTS.getAllBanks,
  });

  return json.data as TBank[];
};

const getBankVerification = async (accountNumber: string, bankCode: number): Promise<TBankVerification> => {
  const { data: json } = await axiosInstance({
    method: "GET",
    url: ENDPOINTS.getBankVerify,
    params: {
      bank_account_number: accountNumber,
      bank_code: bankCode,
    },
  });

  return {
    accountName: json.data.account_name,
  };
};

export { getBanks, getBankVerification };

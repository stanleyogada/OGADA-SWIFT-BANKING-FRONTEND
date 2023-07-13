import { ENDPOINTS } from "../../constants/services";
import { axiosInstance } from "../../utils/axiosInstance";

const postSignIn = async ({ phone, loginPasscode }: { phone: string; loginPasscode: string }) => {
  const { data } = await axiosInstance({
    method: "POST",
    url: ENDPOINTS.signIn,
    data: {
      phone,
      login_passcode: loginPasscode,
    },
  });

  return data.token;
};

export { postSignIn };

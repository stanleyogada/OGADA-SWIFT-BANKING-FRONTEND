import { ENDPOINTS } from "../../constants/services";
import { axiosInstance } from "../../utils/axiosInstance";
import { TPostSignInPayload } from "./types";

const postSignIn = async ({ phone, loginPasscode }: TPostSignInPayload) => {
  const { data } = await axiosInstance({
    method: "POST",
    url: ENDPOINTS.signIn,
    data: {
      phone,
      login_passcode: loginPasscode,
    },
  });

  return data.token as string;
};

export { postSignIn };

import { ENDPOINTS } from "../../constants/services";
import { axiosInstance } from "../../utils/axiosInstance";

import type { TSignInFormValues } from "../../pages/Signin/type";
import type { TSignUpFormValues } from "../../pages/Signup/type";

const postSignIn = async ({ phoneNumber, loginPasscode }: TSignInFormValues) => {
  const { data } = await axiosInstance({
    method: "POST",
    url: ENDPOINTS.signIn,
    data: {
      phone: phoneNumber,
      login_passcode: loginPasscode,
    },
  });

  return data.token as string;
};

// const fakePostRequest = () => new Promise((resolve) => setTimeout(resolve, 1000));

const postSignup = async ({
  firstName,
  lastName,
  middleName,
  email,
  phoneNumber,
  loginPasscode,
}: TSignUpFormValues) => {
  await axiosInstance({
    method: "POST",
    url: ENDPOINTS.signUp,
    data: {
      first_name: firstName,
      last_name: lastName,
      phone: phoneNumber,
      middle_name: middleName,
      email: email,
      login_passcode: loginPasscode,
    },
  });

  // await fakePostRequest();

  return { email };
};

const postSendEmail = async (email: string) => {
  await axiosInstance({
    method: "POST",
    url: ENDPOINTS.sendEmail,
    data: {
      email,
    },
  });

  // await fakePostRequest();

  return email;
};

export { postSignIn, postSignup, postSendEmail };

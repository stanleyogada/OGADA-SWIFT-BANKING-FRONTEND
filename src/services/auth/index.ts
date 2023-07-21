import { ENDPOINTS, TEST_NETWORK_SUCCESS_INFO } from "../../constants/services";
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

  return {
    token: data.token as string,
    emailIsVerified: data.email_is_verified as boolean,
  };
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

  console.info(TEST_NETWORK_SUCCESS_INFO.signUp);

  await postSendEmail(email);

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

  console.info(TEST_NETWORK_SUCCESS_INFO.sendEmail);

  return email;
};

export { postSignIn, postSignup, postSendEmail };

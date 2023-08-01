import { ENDPOINTS, TEST_NETWORK_SUCCESS_INFO } from "@constants/services";
import { axiosInstance } from "@utils/axiosInstance";

import type { TSignUpFormValues } from "@pages/Auth/Signup/type";
import type { TSignInFormValues } from "@pages/Auth/Signin/type";
import type { TForgetLoginPasscodeFormValues } from "@pages/Auth/ForgotLoginPasscode/type";
import { TResetLoginPasscodeFormValues } from "@pages/Auth/ResetLoginPasscode/type";

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
    emailIsVerified: data.data.email_is_verified as boolean,
  };
};

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

const postVerifyEmail = async (otp: string) => {
  await axiosInstance({
    method: "POST",
    url: `${ENDPOINTS.verifyEmail}/${otp}`,
  });
};

const postForgotLoginPasscode = async ({ phone, email }: TForgetLoginPasscodeFormValues) => {
  await axiosInstance({
    method: "POST",
    url: `${ENDPOINTS.forgetPasscode}`,
    data: {
      phone,
      email,
    },
  });
};

const postResetLoginPasscode = async ({ code, newPasscode }: TResetLoginPasscodeFormValues) => {
  await axiosInstance({
    method: "POST",
    url: `${ENDPOINTS.resetLoginPasscode}`,
    data: {
      new_login_passcode: newPasscode,
      one_time_password: code,
    },
  });
};

export { postSignIn, postSignup, postSendEmail, postVerifyEmail, postForgotLoginPasscode, postResetLoginPasscode };

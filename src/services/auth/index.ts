import { ENDPOINTS, TEST_NETWORK_SUCCESS_INFO } from "@constants/services";
import { axiosInstance } from "@utils/axiosInstance";

import type { TSignUpFormValues } from "@pages/Auth/Signup/type";
import type { TSignInFormValues } from "@pages/Auth/Signin/type";
import type { TForgetLoginPasscode } from "@pages/Auth/ForgetPassword/type";
import type { TResetPasswordFormValues } from "@pages/Auth/ResetPassword/type";

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

const postForgetPassword = async ({ phone, email }: TForgetLoginPasscode) => {
  await axiosInstance({
    method: "POST",
    url: `${ENDPOINTS.forgetPasscode}`,
    data: {
      phone,
      email,
    },
  });
};

const postResetLoginPasscode = async ({ code, newPasscode }: TResetPasswordFormValues) => {
  await axiosInstance({
    method: "POST",
    url: `${ENDPOINTS.verifyEmail}/${code}`,
    data: {
      new_login_passcode: newPasscode,
      one_time_password: code,
    },
  });
};

export { postSignIn, postSignup, postSendEmail, postVerifyEmail, postForgetPassword, postResetLoginPasscode };

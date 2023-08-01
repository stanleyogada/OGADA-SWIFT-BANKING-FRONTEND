type TResetPasswordFormValues = {
  code: string;
  newPasscode: string;
};

type TResendDetails = {
  email: string;
  savedAtTime: string;
  timeSecondsLeft: number;
};

export type { TResetPasswordFormValues, TResendDetails };

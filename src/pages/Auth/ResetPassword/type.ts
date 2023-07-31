type TResetPasswordFormValues = {
  code: string;
};

type TResendDetails = {
  email: string;
  savedAtTime: string;
  timeSecondsLeft: number;
};

export type { TResetPasswordFormValues, TResendDetails };

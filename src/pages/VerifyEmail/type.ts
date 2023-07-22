type TVerifyEmailFormValues = {
  code: string;
};

type TResendDetails = {
  email: string;
  savedAtTime: string;
  timeSecondsLeft: number;
};

export type { TVerifyEmailFormValues, TResendDetails };

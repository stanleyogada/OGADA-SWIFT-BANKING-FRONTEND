type TResetLoginPasscodeFormValues = {
  code: string;
  newPasscode: string;
};

type TResendDetails = {
  email: string;
  savedAtTime: string;
  timeSecondsLeft: number;
};

export type { TResetLoginPasscodeFormValues, TResendDetails };

type TForgetLoginPasscode = {
  email: string;
};

type TResendDetails = {
  email: string;
  savedAtTime: string;
  timeSecondsLeft: number;
};

export type { TForgetLoginPasscode, TResendDetails };

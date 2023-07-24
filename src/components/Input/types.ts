type TInputProps = {
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  className?: string;
  error?: string;
  label?: string;
  required?: boolean;
  info?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  renderLeft?: () => React.ReactNode;
  renderRight?: () => React.ReactNode;
};

export type { TInputProps };

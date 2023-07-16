type TInputProps = {
  type?: string;
  placeholder?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
  error?: string;
};

export type { TInputProps };

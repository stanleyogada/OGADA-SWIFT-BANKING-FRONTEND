import InputWrapper from "./InputWrapper";
import type { TInputProps } from "./types";

const Input = ({ type, placeholder, name, onChange, value, className }: TInputProps) => {
  return (
    <InputWrapper
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      value={value}
      className={className}
    />
  );
};

export default Input;

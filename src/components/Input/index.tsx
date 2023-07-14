import InputWrapper from "./InputWrapper";

type TProps = {
  type?: string;
  placeholder?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
};

const Input = ({ type, placeholder, name, onChange, value, className }: TProps) => {
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

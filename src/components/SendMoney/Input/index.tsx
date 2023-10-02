import InputWrapper from "./InputWrapper";

type TProps = {
  title?: string;
  type: string;
  placeholder: string;
  maxLength?: number;
  disabled?: boolean;
  rest?: Record<string, unknown>;
};

const Input = ({ title, type, maxLength, disabled, placeholder, rest }: TProps) => {
  return (
    <InputWrapper hasTitle={!!title}>
      {title && <h3>{title}</h3>}

      <input type={type} placeholder={placeholder} disabled={disabled} maxLength={maxLength} {...rest} />
    </InputWrapper>
  );
};

export default Input;

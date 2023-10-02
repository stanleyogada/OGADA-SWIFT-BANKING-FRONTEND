import InputWrapper from "./InputWrapper";

type TProps = {
  title?: string;
  type: string;
  placeholder: string;
  rest: Record<string, unknown>;
};

const Input = ({ title, type, placeholder, rest }: TProps) => {
  return (
    <InputWrapper>
      {title && <h3>{title}</h3>}

      <input type={type} placeholder={placeholder} {...rest} />
    </InputWrapper>
  );
};

export default Input;

import { TBank } from "@services/banks/types";
import InputWrapper from "./InputWrapper";

type TProps = {
  title?: string;
  type: string;
  placeholder: string;
  maxLength?: number;
  disabled?: boolean;
  rest?: Record<string, unknown>;
  isVisible?: TBank | null | undefined;
};

const Input = ({ title, type, maxLength, disabled, placeholder, rest, isVisible }: TProps) => {
  return (
    <InputWrapper hasTitle={!!title} isVisible={isVisible}>
      {title && <h3>{title}</h3>}

      <input type={type} placeholder={placeholder} disabled={disabled} maxLength={maxLength} {...rest} />
    </InputWrapper>
  );
};

export default Input;

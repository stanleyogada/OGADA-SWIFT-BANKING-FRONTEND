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
  muteMargin?: boolean;
};

const Input = ({ title, type, maxLength, disabled, placeholder, rest, isVisible, muteMargin }: TProps) => {
  return (
    <InputWrapper hasTitle={!!title} isVisible={isVisible} muteMargin={muteMargin}>
      {title && <h3>{title}</h3>}

      <input type={type} placeholder={placeholder} disabled={disabled} maxLength={maxLength} {...rest} />
    </InputWrapper>
  );
};

export default Input;

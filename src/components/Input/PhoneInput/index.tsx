import Input from "..";
import PhoneInputWrapper from "./PhoneInputWrapper";

import type { TInputProps } from "../types";

const PhoneInput = (props: TInputProps) => {
  return (
    <PhoneInputWrapper>
      <div className="country" data-testid="country-code">
        <div className="country__flag">NG</div>
        <span className="country__prefix">+234</span>
      </div>

      <Input {...props} />
    </PhoneInputWrapper>
  );
};

export default PhoneInput;

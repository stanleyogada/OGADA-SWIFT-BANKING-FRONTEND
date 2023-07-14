import Input from "..";
import PhoneInputWrapper from "./PhoneInputWrapper";
import icons from "../../../constants/icons";

import type { TInputProps } from "../types";

const PhoneInput = (props: TInputProps) => {
  return (
    <PhoneInputWrapper>
      <div className="country" data-testid="country-code">
        <div>{icons.nigeriaFlagIcon()}</div>
        <span className="country__prefix">+234</span>
      </div>

      <Input {...props} />
    </PhoneInputWrapper>
  );
};

export default PhoneInput;

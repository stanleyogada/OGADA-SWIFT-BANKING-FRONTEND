import { ForwardedRef, forwardRef } from "react";

import Input from "..";
import PhoneInputWrapper from "./PhoneInputWrapper";
import icons from "../../../constants/icons";

import type { TInputProps } from "../types";

const PhoneInput = forwardRef((props: TInputProps, ref: ForwardedRef<HTMLInputElement | null>) => {
  return (
    <PhoneInputWrapper>
      <div className="country" data-testid="country-code">
        <div>{icons.nigeriaFlagIcon()}</div>
        <span className="country__prefix">+234</span>
      </div>

      <Input {...props} ref={ref} />
    </PhoneInputWrapper>
  );
});

export default PhoneInput;

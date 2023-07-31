import { ForwardedRef, forwardRef } from "react";

import icons from "@constants/icons";

import Input from "..";
import PhoneInputWrapper from "./PhoneInputWrapper";

import type { TInputProps } from "../types";

const PhoneInput = forwardRef((props: TInputProps, ref: ForwardedRef<HTMLInputElement | null>) => {
  return (
    <PhoneInputWrapper>
      <Input
        {...props}
        ref={ref}
        renderLeft={() => (
          <div className="country" data-testid="country-code">
            <div>{icons.nigeriaFlagIcon()}</div>
            <span className="country__prefix">+234</span>
          </div>
        )}
      />
    </PhoneInputWrapper>
  );
});

export default PhoneInput;

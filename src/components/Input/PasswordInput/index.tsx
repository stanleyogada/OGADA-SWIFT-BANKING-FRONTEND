import { ForwardedRef, forwardRef, useState } from "react";

import icons from "@constants/icons";

import PasswordInputWrapper from "./PasswordInputWrapper";
import Input from "..";
import Button from "@components/Button";

import type { TInputProps } from "../types";

const usePasswordInput = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return {
    isPasswordVisible,
    handleTogglePasswordVisibility,
  };
};

const PasswordInput = forwardRef((props: TInputProps, ref: ForwardedRef<HTMLInputElement | null>) => {
  const { isPasswordVisible, handleTogglePasswordVisibility } = usePasswordInput();

  return (
    <PasswordInputWrapper>
      <Input
        {...props}
        type={isPasswordVisible ? "text" : "password"}
        ref={ref}
        renderRight={() => (
          <Button type="button" onClick={handleTogglePasswordVisibility}>
            <div className="eye-icon" data-testid="eye-icon">
              {isPasswordVisible ? icons.eyeCloseIcon() : icons.eyeOpenIcon()}
            </div>
          </Button>
        )}
      />
    </PasswordInputWrapper>
  );
});

export default PasswordInput;

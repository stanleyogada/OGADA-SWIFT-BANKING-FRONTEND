import Input from "..";
import PasswordInputWrapper from "./PasswordInputWrapper";

import type { TInputProps } from "../types";
import Button from "../../Button";
import { ForwardedRef, forwardRef, useState } from "react";
import icons from "../../../constants/icons";

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
      <Input {...props} type={isPasswordVisible ? "text" : "password"} ref={ref} />

      <Button type="button" onClick={handleTogglePasswordVisibility}>
        <div className="eye" data-testid="eye-icon">
          {isPasswordVisible ? icons.eyecloseIcon() : icons.eyeopenIcon()}
        </div>
      </Button>
    </PasswordInputWrapper>
  );
});

export default PasswordInput;

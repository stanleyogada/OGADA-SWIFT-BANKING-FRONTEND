import { ForwardedRef, forwardRef } from "react";
import InputWrapper from "./InputWrapper";
import type { TInputProps } from "./types";

const Input = forwardRef(
  (
    { type, placeholder, name, onChange, value, className, error }: TInputProps,
    ref: ForwardedRef<HTMLInputElement | null>
  ) => {
    return (
      <InputWrapper>
        <div className="input__group">
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            value={value}
            className={"input__control " + className}
          />

          {error && <p className="input__error">{error}</p>}
        </div>
      </InputWrapper>
    );
  }
);

export default Input;

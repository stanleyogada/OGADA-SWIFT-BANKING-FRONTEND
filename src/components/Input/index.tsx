import { ForwardedRef, forwardRef } from "react";

import InputWrapper from "./InputWrapper";
import type { TInputProps } from "./types";

const Input = forwardRef(
  (
    { type, placeholder, name, onChange, value, className, error, label, required }: TInputProps,
    ref: ForwardedRef<HTMLInputElement | null>
  ) => {
    return (
      <InputWrapper>
        <div className="input__group">
          {label && (
            <label className="input__label" htmlFor={name}>
              {label}
              {required && (
                <span data-testid="required" className="input__required">
                  *
                </span>
              )}
            </label>
          )}

          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            name={name}
            id={name}
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

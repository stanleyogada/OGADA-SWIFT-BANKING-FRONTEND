import { ForwardedRef, forwardRef } from "react";

import InputWrapper from "./InputWrapper";
import type { TInputProps } from "./types";

const Input = forwardRef(
  (
    {
      type,
      placeholder,
      name,
      onChange,
      value,
      className,
      error,
      label,
      required,
      renderLeft,
      renderRight,
    }: TInputProps,
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

          <div className="input__control-wrapper">
            {renderLeft && <div className="input__control-left">{renderLeft()}</div>}

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

            {renderRight && <div className="input__control-right">{renderRight()}</div>}
          </div>
          {error && (
            <p className="input__error" data-testid="input-error">
              {error}
            </p>
          )}
        </div>
      </InputWrapper>
    );
  }
);

export default Input;

import { ForwardedRef, forwardRef } from "react";
import InputWrapper from "./InputWrapper";
import type { TInputProps } from "./types";

const Input = forwardRef(
  ({ type, placeholder, name, onChange, value, className }: TInputProps, ref: ForwardedRef<unknown>) => {
    return (
      <InputWrapper
        // @ts-ignore // TODO: Remove ts-ignore
        ref={ref}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        className={className}
      />
    );
  }
);

export default Input;

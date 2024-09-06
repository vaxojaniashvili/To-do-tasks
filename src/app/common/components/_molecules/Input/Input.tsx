import { InputTypes } from "@/app/common/types";
import React from "react";

const Input = ({
  type,
  className,
  key,
  value,
  onChange,
  placeholder,
  onKeyDown,
}: InputTypes) => {
  return (
    <input
      onChange={onChange}
      value={value}
      key={key}
      className={className}
      type={type}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;

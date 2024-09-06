import { ButtonType } from "@/app/common/types";
import React from "react";

const Button = ({ onClick, className, children, key, style }: ButtonType) => {
  return (
    <button style={style} key={key} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

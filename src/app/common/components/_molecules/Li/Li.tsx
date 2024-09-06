import { LiTypes } from "@/app/common/types";
import React from "react";

const Li = ({ key, className, children }: LiTypes) => {
  return (
    <li key={key} className={className}>
      {children}
    </li>
  );
};

export default Li;

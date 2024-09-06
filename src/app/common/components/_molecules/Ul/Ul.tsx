import { UlTypes } from "@/app/common/types";
import React from "react";

const Ul = ({ className, children }: UlTypes) => {
  return <ul className={className}>{children}</ul>;
};

export default Ul;

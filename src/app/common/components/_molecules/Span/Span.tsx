import { SpanTypes } from "@/app/common/types";
import React from "react";

const Span = ({ className, children }: SpanTypes) => {
  return <span className={className}>{children}</span>;
};

export default Span;

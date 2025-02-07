import React from "react";

interface Props {
  children: React.ReactNode;
  classname?: string;
}

export function TypographyP({ children, classname }: Props) {
  return <p className={`leading-7 ${classname}`}>{children}</p>;
}

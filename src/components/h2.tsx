import React from "react";

interface Props {
  children: React.ReactNode;
  classname?: string;
}

export function TypographyH2({ children, classname }: Props) {
  return (
    <h1
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${classname}`}
    >
      {children}
    </h1>
  );
}

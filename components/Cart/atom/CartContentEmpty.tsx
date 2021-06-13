import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export function CartContentEmpty({ children }: Props) {
  return <div>{children}</div>;
}

import { ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";

interface ButtonSelectFormProps extends LinkProps {
  children: ReactNode;
}

export function ButtonSelectForm({ children, to }: ButtonSelectFormProps) {
  return (
    <Link
      to={to}
      className="bg-accent hover:bg-border flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm transition-all"
    >
      {children}
    </Link>
  );
}

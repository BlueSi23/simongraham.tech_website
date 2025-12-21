import { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className, style, ...props }: ContainerProps) {
  return (
    <div
      className={cn("page-shell", className)}
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '80rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}



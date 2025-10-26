import { ComponentProps, ReactNode } from "react";
import { Label as LabelShad } from '@/presentation/external/components/ui/label'

interface LabelProps extends ComponentProps<"label"> {
  children: ReactNode;
}

export function Label({ children, ...props }: LabelProps) {
  return (
    <LabelShad {...props}>
      {children}
    </LabelShad>
  )
}
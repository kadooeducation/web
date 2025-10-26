import { Input as InputShad } from "@/presentation/external/components/ui/input";
import { ComponentProps } from "react";
import { Fieldset } from "../fieldset/fieldset";
import { Label } from "../label/label";

function Core({ ...rest }: ComponentProps<typeof InputShad>) {
  return <InputShad {...rest} />;
}

export const Input = {
  Root: Fieldset.Root,
  Core,
  Label,
}
import { type FormEvent, useState, useTransition } from "react";

export interface FormState {
  success: boolean;
  message: string | null;
  // errors -> objeto de campos dinâmico
  errors: {
    properties?: {
      [key: string]: {
        errors: string[];
      };
    };
  } | null;
}

interface UseFormStateProps {
  action: (data: FormData) => Promise<FormState>;
  initialState?: FormState;
}

export function useFormState({ action, initialState }: UseFormStateProps) {
  const [isPending, startTransition] = useTransition();

  const [formState, setFormState] = useState<FormState>(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    },
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      const state = await action(data);
      setFormState(state);
    });
  }

  return [formState, handleSubmit, isPending] as const;
}

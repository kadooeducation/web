import type { ReactNode } from 'react'

function Root({ children }: { children: ReactNode }) {
  return (
    <fieldset className="relative w-full flex flex-col gap-2">
      {children}
    </fieldset>
  )
}

export const Fieldset = {
  Root,
}

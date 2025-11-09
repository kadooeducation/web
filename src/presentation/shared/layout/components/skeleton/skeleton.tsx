import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

function Root({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={twMerge(
        'bg-zinc-200/50 dark:bg-zinc-700/30 animate-pulse rounded-md',
        className,
      )}
      {...props}
    />
  )
}

function EdictsList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Root className="h-[278px]" />
      <Root className="h-[278px]" />
      <Root className="h-[278px]" />
      <Root className="h-[278px]" />
      <Root className="h-[278px]" />
      <Root className="h-[278px]" />
    </div>
  )
}

function HighlightMentorsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Root className="h-[278px]" />
      <Root className="h-[278px]" />
      <Root className="h-[278px]" />
      <Root className="h-[278px]" />
      <Root className="h-[278px]" />
      <Root className="h-[278px]" />
    </div>
  )
}

export const Skeleton = {
  Root,
  EdictsList,
  HighlightMentorsSkeleton,
}

import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(function Input(
  {
    className,
    type,
    ...props
  },
  ref
) {
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(
        // Sharper, more visible input box with improved focus
        "file:text-foreground placeholder:text-gray-400 placeholder:text- selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 w-full min-w-0 rounded-sm border bg-white px-3 py-1 text-base shadow outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
});

export { Input }

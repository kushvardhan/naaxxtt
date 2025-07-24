import * as React from "react";
import { cn } from "../../../lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  variant?: "default" | "bare";
  isDark?: boolean; // Optional, if you still want to receive it
}

function Input({ className, type, variant = "default", isDark, ...props }: InputProps) {
  const isBare = variant === "bare";

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        isBare
          ? "w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-none shadow-none px-0 py-0 text-lg"
          : "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
        isDark && "your-custom-dark-class" // use it if needed
      )}
      {...props} // isDark is NOT included now
    />
  );
}


export { Input };

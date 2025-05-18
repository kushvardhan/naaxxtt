// app/Providers.tsx
"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "../context/ThemeContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
<ThemeProvider>
  {children}
</ThemeProvider>

    </ClerkProvider>
  );
}

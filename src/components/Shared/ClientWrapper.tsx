"use client";

import { useEffect, useState } from "react";
import ErrorBoundary from "./ErrorBoundary";

interface ClientWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

const ClientWrapper = ({ children, fallback, className }: ClientWrapperProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={className} suppressHydrationWarning>
        {fallback || (
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-32 w-full" suppressHydrationWarning>
            <div className="p-4 space-y-3" suppressHydrationWarning>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" suppressHydrationWarning></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" suppressHydrationWarning></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3" suppressHydrationWarning></div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className={className} suppressHydrationWarning>
        {children}
      </div>
    </ErrorBoundary>
  );
};

export default ClientWrapper;

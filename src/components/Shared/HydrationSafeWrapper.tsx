"use client";

import { useEffect, useState } from "react";

interface HydrationSafeWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

const HydrationSafeWrapper = ({ 
  children, 
  fallback, 
  className 
}: HydrationSafeWrapperProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={className} suppressHydrationWarning>
        {fallback || (
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-8 w-full" suppressHydrationWarning></div>
        )}
      </div>
    );
  }

  return (
    <div className={className} suppressHydrationWarning>
      {children}
    </div>
  );
};

export default HydrationSafeWrapper;

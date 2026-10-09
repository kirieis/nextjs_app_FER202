"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Caught in ErrorBoundary:", error);
  }, [error]);

  return (
    <div
      data-testid="error-boundary"
      className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center text-2xl font-black mb-4">
        ⚠️
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-2 text-foreground">
        Something went wrong!
      </h2>
      <p className="text-muted-foreground max-w-md mb-6 text-sm">
        {error.message || "An unexpected error occurred while loading this page."}
      </p>
      <Button
        data-testid="btn-retry"
        onClick={() => reset()}
        className="px-6 py-2.5 font-semibold"
      >
        Try Again
      </Button>
    </div>
  );
}

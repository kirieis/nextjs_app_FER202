import React from "react";

export default function Loading() {
  return (
    <div
      data-testid="loading"
      className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4" />
      <p className="text-muted-foreground font-medium text-sm">
        Loading content, please wait...
      </p>
    </div>
  );
}

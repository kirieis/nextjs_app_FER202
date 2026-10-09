"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Button } from "@/components/ui/button";

interface FavoriteButtonProps {
  productId: number;
  className?: string;
}

export function FavoriteButton({ productId, className }: FavoriteButtonProps) {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const router = useRouter();

  const favorited = isFavorite(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push("/login");
      return;
    }

    toggleFavorite(productId);
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      data-testid="btn-favorite"
      aria-pressed={favorited ? "true" : "false"}
      onClick={handleClick}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      className={`rounded-full transition-all duration-200 border shadow-xs ${
        favorited
          ? "bg-rose-50 border-rose-300 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-400"
          : "bg-background/80 backdrop-blur border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted"
      } ${className || ""}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={favorited ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </Button>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Button, buttonVariants } from "@/components/ui/button";

export function Header() {
  const { user, signOut } = useAuth();
  const { favorites } = useFavorites();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Brand Name */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-2xl tracking-tight">
          <span className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black text-xl shadow-md">
            E
          </span>
          <span className="text-foreground">EmarkShop</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-3 sm:gap-4">
          {user ? (
            <>
              {/* Favorites link with count (Section 2.6 / 3) */}
              <Link
                href="/favorites"
                data-testid="link-favorites"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-foreground hover:bg-muted/70 transition-colors"
              >
                <span>❤️ Favorites</span>
                <span
                  data-testid="favorites-count"
                  className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full text-xs font-bold bg-primary text-primary-foreground"
                >
                  {favorites.length}
                </span>
              </Link>

              {/* Account page link */}
              <Link
                href="/account"
                className="text-sm font-medium text-muted-foreground hover:text-foreground hidden md:inline-block"
              >
                Account
              </Link>

              {/* Logged in: show email + logout */}
              <span
                data-testid="user-email"
                className="text-sm sm:text-base font-medium text-foreground truncate max-w-[130px] sm:max-w-xs"
              >
                {user.email}
              </span>
              <Button
                type="button"
                variant="outline"
                data-testid="btn-logout"
                onClick={() => signOut()}
                className="px-5 py-2.5 text-sm sm:text-base font-semibold border-2 hover:bg-muted transition-all duration-150"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                data-testid="btn-login"
                className={buttonVariants({
                  variant: "outline",
                  size: "default",
                  className:
                    "px-5 py-2.5 text-sm sm:text-base font-semibold border-2 hover:bg-muted transition-all duration-150",
                })}
              >
                Login
              </Link>
              <Link
                href="/register"
                data-testid="btn-register"
                className={buttonVariants({
                  variant: "default",
                  size: "default",
                  className:
                    "px-5 py-2.5 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all duration-150",
                })}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

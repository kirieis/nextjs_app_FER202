"use client";

import React, { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  // Read auth state from AuthContext (no props needed)
  const { user, signOut } = useAuth();

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo / Brand Name */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-2xl tracking-tight">
            <span className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black text-xl shadow-md">
              E
            </span>
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-foreground">
              EmarkShop
            </span>
          </Link>

          {/* Navigation with Bigger Buttons */}
          <nav className="flex items-center gap-3 sm:gap-4">
            {user ? (
              <>
                {/* Logged in: show email + logout */}
                <span
                  data-testid="user-email"
                  className="text-sm sm:text-base font-medium text-foreground truncate max-w-[160px] sm:max-w-xs"
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

      {/* Main Content */}
      <main className="flex-1 container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Introduction Section */}
        <section className="mb-10 text-center sm:text-left rounded-2xl bg-muted/30 border border-border/60 p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
              Premium Tech &amp; Lifestyle Store
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Welcome to EmarkShop
            </h1>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Explore our hand-picked collection of top-rated electronics, audio accessories, and modern
              lifestyle gear. Enjoy guaranteed authentic products, fast shipping, and exceptional service.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-6 max-w-xl">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name or description..."
                className="h-11 pl-11 pr-10 text-sm sm:text-base rounded-xl border-border bg-background shadow-xs focus-visible:ring-2"
                aria-label="Search products"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground p-1"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-2 text-xs text-muted-foreground">
                Showing results for &ldquo;{searchQuery}&rdquo; ({filteredProducts.length} product
                {filteredProducts.length === 1 ? "" : "s"} found)
              </p>
            )}
          </div>
        </section>

        {/* Section Heading */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Featured Products
          </h2>
          <span className="text-sm text-muted-foreground font-medium">
            {filteredProducts.length} items available
          </span>
        </div>

        {/* Product Grid */}
        <div
          data-testid="product-list"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg font-medium text-muted-foreground">
              No products found matching &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-3 text-sm text-primary font-semibold hover:underline"
            >
              Clear search and view all products
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 text-center text-sm text-muted-foreground bg-muted/10">
        <p>&copy; {new Date().getFullYear()} EmarkShop. All rights reserved.</p>
      </footer>
    </div>
  );
}
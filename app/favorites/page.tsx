"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { products } from "@/data/products";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FavoritesPage() {
  const { user, loading } = useAuth();
  const { favorites } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return null;
  }

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-2xl tracking-tight">
            <span className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black text-xl shadow-md">
              E
            </span>
            <span className="text-foreground">EmarkShop</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-semibold text-primary hover:underline"
            >
              &larr; Back to Shop
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div data-testid="favorites-page" className="space-y-6">
          <div className="border-b border-border/70 pb-4 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                My Favorites
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Products you have bookmarked
              </p>
            </div>
            <span className="text-sm font-medium px-3 py-1 bg-secondary/30 text-secondary-foreground rounded-full">
              {favoriteProducts.length} items
            </span>
          </div>

          {favoriteProducts.length === 0 ? (
            <div
              data-testid="favorites-empty"
              className="py-16 text-center border-2 border-dashed border-border/70 rounded-2xl p-8"
            >
              <div className="text-4xl mb-3">🤍</div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                No favorites yet
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
                You haven&apos;t added any products to your favorites list yet.
                Browse our collection to find items you love!
              </p>
              <Link href="/">
                <Button className="px-6">Browse Products</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {favoriteProducts.map((product) => (
                <Card
                  key={product.id}
                  data-testid="favorite-item"
                  className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4 border border-border shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 rounded-lg object-cover bg-muted/40 shrink-0"
                    />
                    <div>
                      <span className="text-xs uppercase font-semibold text-primary/80">
                        {product.category}
                      </span>
                      <h3 className="font-semibold text-base line-clamp-1">
                        <Link
                          href={`/products/${product.id}`}
                          data-testid="link-detail"
                          className="hover:text-primary transition-colors"
                        >
                          {product.name}
                        </Link>
                      </h3>
                      <p className="text-primary font-bold mt-1">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0">
                    <Link
                      href={`/products/${product.id}`}
                      data-testid="link-detail"
                      className="text-sm font-semibold text-primary hover:underline px-3 py-1.5"
                    >
                      View Detail &rarr;
                    </Link>
                    <FavoriteButton productId={product.id} />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-border/40 py-8 text-center text-sm text-muted-foreground bg-muted/10">
        <p>&copy; {new Date().getFullYear()} EmarkShop. All rights reserved.</p>
      </footer>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";

interface HomePageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { q, category } = await searchParams;

  const searchQuery = (q || "").trim().toLowerCase();
  const selectedCategory = (category || "").trim().toLowerCase();

  // Extract unique categories from products
  const categories = Array.from(
    new Set(products.map((p) => p.category))
  ).sort();

  // Server-side filtering
  const filteredProducts = products.filter((product) => {
    const matchesQuery =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery);

    const matchesCategory =
      !selectedCategory ||
      product.category.toLowerCase() === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Introduction Section */}
        <section className="mb-10 text-center sm:text-left rounded-2xl bg-card border border-border p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-secondary/30 text-secondary-foreground px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-3">
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

          {/* Section 2.3: URL-Driven GET Form */}
          <form
            method="get"
            action="/"
            className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-2xl"
          >
            {/* search-input (name="q") */}
            <div className="relative flex-1">
              <input
                type="text"
                name="q"
                defaultValue={q || ""}
                data-testid="search-input"
                placeholder="Search products by name or description..."
                className="w-full h-11 px-4 text-sm rounded-xl border border-input bg-background text-foreground shadow-xs focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* category-select (name="category") */}
            <div className="w-full sm:w-48">
              <select
                name="category"
                defaultValue={category || ""}
                data-testid="category-select"
                className="w-full h-11 px-3 text-sm rounded-xl border border-input bg-background text-foreground shadow-xs focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">All</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* btn-search */}
            <button
              type="submit"
              data-testid="btn-search"
              className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition shadow-xs"
            >
              Search
            </button>
          </form>

          {/* Reset filter badge if query or category active */}
          {(q || category) && (
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <span>Active filters:</span>
              {q && (
                <span className="bg-secondary/40 text-secondary-foreground px-2 py-0.5 rounded-md font-medium">
                  &ldquo;{q}&rdquo;
                </span>
              )}
              {category && (
                <span className="bg-secondary/40 text-secondary-foreground px-2 py-0.5 rounded-md font-medium">
                  Category: {category}
                </span>
              )}
              <Link
                href="/"
                className="text-primary hover:underline font-semibold ml-2"
              >
                Clear all filters
              </Link>
            </div>
          )}
        </section>

        {/* Section Heading */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Featured Products
          </h2>
          <span className="text-sm text-muted-foreground font-medium">
            {filteredProducts.length} items found
          </span>
        </div>

        {/* Product Grid or No-Results */}
        {filteredProducts.length === 0 ? (
          <div
            data-testid="no-results"
            className="py-16 text-center border-2 border-dashed border-border/70 rounded-2xl p-8 bg-card"
          >
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              No matching products found
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
              We couldn&apos;t find any products matching your search criteria.
              Try adjusting your query or category filter.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition shadow-xs text-sm"
            >
              Reset filters &amp; view all
            </Link>
          </div>
        ) : (
          <div
            data-testid="product-list"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
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
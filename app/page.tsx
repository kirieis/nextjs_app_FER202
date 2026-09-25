import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { buttonVariants } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-extrabold text-base">
              P
            </span>
            <span>ProductHub</span>
          </Link>
          <nav className="flex items-center gap-3">
            <Link
              href="/login"
              data-testid="btn-login"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Login
            </Link>
            <Link
              href="/register"
              data-testid="btn-register"
              className={buttonVariants({ variant: "default", size: "sm" })}
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Featured Products
          </h1>
          <p className="mt-2 text-muted-foreground text-base">
            Explore our curated selection of high-quality electronics and accessories.
          </p>
        </div>

        {/* Product Grid */}
        <div
          data-testid="product-list"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ProductHub. All rights reserved.</p>
      </footer>
    </div>
  );
}
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import { FavoriteButton } from "@/components/FavoriteButton";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

// Only ids from generateStaticParams exist; any other id returns real HTTP 404
export const dynamicParams = false;

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const numId = Number(id);
  const product = products.find((p) => p.id === numId);

  if (!product) {
    return {
      title: "Product Not Found | EmarkShop",
    };
  }

  return {
    title: `${product.name} | EmarkShop`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const numId = Number(id);

  if (isNaN(numId)) {
    notFound();
  }

  const product = products.find((p) => p.id === numId);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-2xl tracking-tight">
            <span className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black text-xl shadow-md">
              E
            </span>
            <span className="text-foreground">EmarkShop</span>
          </Link>
          <Link
            href="/"
            data-testid="link-back"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            &larr; Back to Products
          </Link>
        </div>
      </header>

      {/* Main Product Detail Container */}
      <main className="flex-1 container mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div
          data-testid="product-detail"
          className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Product Image Area */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-muted/30 border border-border/60 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 z-10">
              <FavoriteButton productId={product.id} className="h-10 w-10" />
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-block">
                <span
                  data-testid="detail-category"
                  className="rounded-full bg-secondary/30 text-secondary-foreground px-3 py-1 text-xs font-semibold tracking-wide uppercase"
                >
                  {product.category}
                </span>
              </div>

              <h1
                data-testid="detail-name"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight"
              >
                {product.name}
              </h1>

              <div
                data-testid="detail-price"
                className="text-3xl font-extrabold text-primary"
              >
                ${product.price.toFixed(2)}
              </div>

              <div className="pt-2 border-t border-border/60">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Description
                </h3>
                <p
                  data-testid="detail-description"
                  className="text-base text-foreground/90 leading-relaxed whitespace-pre-line"
                >
                  {product.description}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-border/60 flex items-center justify-between">
              <Link
                href="/"
                data-testid="link-back"
                className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                &larr; Back to all products
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/40 py-8 text-center text-sm text-muted-foreground bg-muted/10">
        <p>&copy; {new Date().getFullYear()} EmarkShop. All rights reserved.</p>
      </footer>
    </div>
  );
}

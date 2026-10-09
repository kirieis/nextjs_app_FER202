import React from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { FavoriteButton } from "@/components/FavoriteButton";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      data-testid="product-card"
      className="flex flex-col h-full overflow-hidden transition-all duration-200 hover:shadow-lg border border-border bg-card relative group"
    >
      <div className="relative w-full aspect-[4/3] bg-muted/40 overflow-hidden flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          data-testid="product-image"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Favorite heart button */}
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton productId={product.id} />
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="text-xs font-semibold text-primary/80 uppercase tracking-wider mb-1">
          {product.category}
        </div>
        <CardTitle
          data-testid="product-name"
          className="text-lg font-semibold leading-snug line-clamp-1 hover:text-primary transition-colors"
        >
          <Link href={`/products/${product.id}`} data-testid="link-detail">
            {product.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-2">
        <CardDescription
          data-testid="product-description"
          className="text-sm text-muted-foreground line-clamp-2"
        >
          {product.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-3 flex items-center justify-between border-t border-border/50">
        <span
          data-testid="product-price"
          className="text-lg font-bold text-foreground"
        >
          ${product.price.toFixed(2)}
        </span>
        <Link
          href={`/products/${product.id}`}
          data-testid="link-detail"
          className="text-xs font-semibold text-primary hover:underline"
        >
          View details &rarr;
        </Link>
      </CardFooter>
    </Card>
  );
}

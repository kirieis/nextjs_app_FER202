import React from "react";
import { Product } from "@/data/products";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      data-testid="product-card"
      className="flex flex-col h-full overflow-hidden transition-all duration-200 hover:shadow-lg border border-border bg-card"
    >
      <div className="relative w-full aspect-[4/3] bg-muted/40 overflow-hidden flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          data-testid="product-image"
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle
          data-testid="product-name"
          className="text-lg font-semibold leading-snug line-clamp-1"
        >
          {product.name}
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
      <CardFooter className="pt-2 flex items-center justify-between border-t border-border/50">
        <span
          data-testid="product-price"
          className="text-lg font-bold text-foreground"
        >
          {product.price}
        </span>
      </CardFooter>
    </Card>
  );
}

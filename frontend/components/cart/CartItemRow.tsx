"use client";

import Link from "next/link";
import { formatPrice, getProductImage } from "@/lib/api";
import Button from "@/components/ui/Button";
import type { CartItem } from "@/types";

interface CartItemRowProps {
  item: CartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
  updating?: boolean;
  index?: number;
}

export default function CartItemRow({
  item,
  onIncrement,
  onDecrement,
  onRemove,
  updating,
  index = 0,
}: CartItemRowProps) {
  const product = item.product;
  const image = product ? getProductImage(product) : "/placeholder-product.svg";
  const productHref = product ? `/products/${product.id}` : "#";

  return (
    <div className="flex gap-4 border-b border-border py-4 last:border-0">
      <Link
        href={productHref}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-50"
      >
        <img
          src={image}
          alt={product?.name || "Product"}
          className="h-full w-full object-contain p-2"
          onError={(event) => {
            event.currentTarget.src = "/placeholder-product.svg";
          }}
        />
      </Link>

      <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href={productHref}>
            <h3 className="font-semibold text-primary hover:text-accent">
              {product?.name || "Product"}
            </h3>
          </Link>

          {item.variant && (
            <p className="text-sm text-muted">
              {item.variant.variant_name}: {item.variant.variant_value}
            </p>
          )}

          <p className="mt-1 font-semibold text-accent">
            {formatPrice(Number(item.unit_price))}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-4 sm:mt-0">
          <div className="flex items-center rounded-xl border border-border">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onDecrement}
              disabled={updating || item.quantity <= 1}
              className="h-10 w-10 rounded-r-none"
            >
              -
            </Button>

            <span className="flex h-10 min-w-[3rem] items-center justify-center px-3 font-semibold">
              {item.quantity}
            </span>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onIncrement}
              disabled={updating}
              className="h-10 w-10 rounded-l-none"
            >
              +
            </Button>
          </div>

          <p className="min-w-[6rem] text-right font-bold text-primary">
            {formatPrice(Number(item.line_total))}
          </p>

          <button
            type="button"
            onClick={onRemove}
            disabled={updating}
            className="text-sm font-semibold text-red-600 hover:text-red-700 disabled:opacity-60"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

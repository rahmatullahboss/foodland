"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Variant {
  id: string;
  name: string;
  price: number;
}

interface ProductVariantSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  variants: Variant[];
  onAddToCart: (variantId: string, price: number) => void;
}

const ProductVariantSelector: React.FC<ProductVariantSelectorProps> = ({
  isOpen,
  onClose,
  productName,
  variants,
  onAddToCart,
}) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  // set default selection
  useEffect(() => {
    if (isOpen && variants.length > 0 && !selectedVariantId) {
       // Default to the first one (usually Small)
      setSelectedVariantId(variants[0].id);
    }
  }, [isOpen, variants, selectedVariantId]);
  
  const selectedVariant = variants.find(v => v.id === selectedVariantId);

  const handleConfirm = () => {
    if (selectedVariant) {
      onAddToCart(selectedVariant.id, selectedVariant.price);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#1a102e] border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-[#c6a87c]">{productName}</DialogTitle>
          <DialogDescription className="text-white/60">
            Select your preferred size
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-2">
            {variants.map((variant) => (
              <div
                key={variant.id}
                onClick={() => setSelectedVariantId(variant.id)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg cursor-pointer border transition-all duration-200",
                  selectedVariantId === variant.id
                    ? "bg-[#c6a87c]/10 border-[#c6a87c]"
                    : "bg-white/5 border-transparent hover:bg-white/10"
                )}
              >
                <span className="font-serif tracking-wide">{variant.name}</span>
                <div className="flex items-center gap-2">
                   {selectedVariantId === variant.id && (
                       <Badge className="bg-[#c6a87c] text-black hover:bg-[#c6a87c] h-5 text-[10px] px-1.5">Selected</Badge>
                   )}
                   <span className="font-bold text-[#c6a87c]">
                    {variant.price}<span className="text-xs align-top ml-0.5">৳</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="sm:justify-between items-center">
            <div className="text-sm text-white/50">
                Total: <span className="text-white font-bold">{selectedVariant?.price || 0}৳</span>
            </div>
            <Button 
                onClick={handleConfirm}
                disabled={!selectedVariantId}
                className="bg-[#c6a87c] text-black hover:bg-[#d4b991] font-serif tracking-wider"
            >
                ADD TO CART
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductVariantSelector;

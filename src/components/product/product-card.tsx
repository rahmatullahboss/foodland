import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Flame, Leaf } from 'lucide-react';

interface ProductCardProps {
    id: string | number;
    name: string;
    description: string;
    price: string | number;
    image: string;
    isSpicy?: boolean;
    isHottest?: boolean; // For "5" spiciness level
    isVeg?: boolean;
    onAdd?: () => void;
    className?: string; // Allow external styling
}

export function ProductCard({
    id,
    name,
    description,
    price,
    image,
    isSpicy,
    isHottest,
    isVeg,
    onAdd,
    className
}: ProductCardProps) {
    return (
        <Card className={cn("overflow-hidden bg-neutral-900 border-white/5 hover:border-primary/50 transition-all duration-300 group h-full flex flex-col", className)}>
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badges */}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                    {isVeg && (
                        <span className="bg-green-600/90 backdrop-blur text-white p-1.5 rounded-full shadow-sm" title="Vegetarian">
                            <Leaf className="w-4 h-4" />
                        </span>
                    )}
                    {isSpicy && (
                        <span className="bg-orange-600/90 backdrop-blur text-white p-1.5 rounded-full shadow-sm" title="Spicy">
                            <Flame className="w-4 h-4" />
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <CardHeader className="p-4 space-y-1">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="font-serif text-xl text-white group-hover:text-primary transition-colors line-clamp-2">
                        {name}
                    </h3>
                    <span className="text-lg font-bold text-primary whitespace-nowrap">
                        {typeof price === 'number' ? `$${price}` : price}
                    </span>
                </div>
            </CardHeader>

            <CardContent className="p-4 pt-0 flex-grow">
                <p className="text-sm text-gray-400 font-display line-clamp-3">
                    {description}
                </p>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button
                    variant="outline"
                    className="w-full border-primary/30 text-primary hover:bg-primary hover:text-black transition-colors"
                    onClick={onAdd}
                >
                    Add to Order
                </Button>
            </CardFooter>
        </Card>
    );
}

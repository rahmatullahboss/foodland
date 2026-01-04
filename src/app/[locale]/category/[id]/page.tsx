
import { getCloudflareContext } from "@opennextjs/cloudflare";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDb } from "@/db";
import { categories, menuItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { D1Database } from "@cloudflare/workers-types";
import PizzaCategoryLayout from "@/components/PizzaCategoryLayout";
import JuiceCategoryLayout from "@/components/JuiceCategoryLayout";
import SetMenuCategoryLayout from "@/components/SetMenuCategoryLayout";
import BurgerCategoryLayout from "@/components/BurgerCategoryLayout";
import SandwichMomoCategoryLayout from "@/components/SandwichMomoCategoryLayout";
import Header from "@/components/Header";



interface CategoryPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id, locale } = await params;
  let env;
  
  try {
     const ctx = await getCloudflareContext();
     env = ctx.env;
  } catch {
      // Fallback for local dev if not using wrangler wrapper directly or similar
      console.warn("Could not get Cloudflare context, running in local mode?");
      // In local next dev, we might not have D1 binding easily without setup
      // But let's assume it works or we handle it. 
      // Actually, standard Next.js dev won't have D1. 
      // We might need to mock or use a local sqlite proxy if setup.
  }

  if (!env || !env.DB) { 
      // If we can't access DB, we might be in a build step or local dev without binding
      // For now, let's just show an error or empty if no DB
      // But typically we should have it.
      // If we are strictly local `next dev`, we might need `better-sqlite3` fallback in `db/index.ts`.
      // Let's assume the user has a way to run this, commonly `npm run dev` in this project calls `next dev --turbopack`.
      // `package.json` says "dev": "next dev --turbopack".
      // This usually doesn't have D1 bindings.
      // However, `wrangler dev` does.
      return <div className="p-10 text-center text-red-500">Database connection not available. Please run with wrangler or configure local D1.</div>
  }

  const db = getDb(env.DB as D1Database);

  // Fetch Category
  const categoryResult = await db
    .select()
    .from(categories)
    .where(eq(categories.id, id))
    .limit(1);

  const category = categoryResult[0];

  // Fetch Menu Items with Variants
  const items = await db.query.menuItems.findMany({
    where: eq(menuItems.categoryId, id),
    with: {
        variants: true
    }
  });


// Specialized Layout for Pizza
  if (id === 'cat_pizza') {
      return <PizzaCategoryLayout categoryName={category.name} items={items as unknown as any[]} />;
  }

  // Specialized Layout for Juice
  if (id === 'cat_juice_and_sharbat') {
    return <JuiceCategoryLayout categoryName={category.name} items={items as unknown as any[]} />;
  }

   // Specialized Layout for Set Menu
   if (id === 'cat_setmenu') {
    return <SetMenuCategoryLayout categoryName={category.name} items={items as unknown as any[]} />;
  }

  // Specialized Layout for Burger
  if (id === 'cat_burger') {
    return <BurgerCategoryLayout categoryName={category.name} items={items as unknown as any[]} />;
  }

  // Specialized Layout for Sandwich & Momo
  if (id === 'cat_sandwich_momo') {
    return <SandwichMomoCategoryLayout categoryName={category.name} items={items as unknown as any[]} locale={locale} />;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Shared Header */}
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">{category.name}</h1>
            {category.description && (
                <p className="text-muted-foreground font-display text-lg max-w-2xl mx-auto">{category.description}</p>
            )}
        </div>

        {items.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            <h3 className="text-xl font-serif">No items found in this category.</h3>
            <p>Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Card key={item.id} className="group overflow-hidden bg-card border-border/40 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <div className="relative h-48 w-full overflow-hidden">
                  {item.images && item.images.length > 0 ? (
                     <Image
                      src={item.images[0]} // valid method or first of array
                      alt={item.nameEn}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : item.featuredImage ? (
                    <Image
                      src={item.featuredImage}
                      alt={item.nameEn}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                        <span className="text-muted-foreground">No Image</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-black/70 backdrop-blur-md text-primary border-primary/20 text-md font-serif px-3 py-1">
                      {item.price} 
                      {/* Add currency if available or hardcode */}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="font-serif text-xl group-hover:text-primary transition-colors">
                    {item.nameEn}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 font-sans">
                    {item.descriptionEn}
                  </CardDescription>
                </CardHeader>
                
                <CardFooter className="pt-0">
                  <Button className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-serif">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

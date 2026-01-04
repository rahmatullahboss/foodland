import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { categories } from "@/db/schema";
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { D1Database } from "@cloudflare/workers-types";

export default async function MenuPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Menu' });

    let env;
    try {
        const ctx = await getCloudflareContext();
        env = ctx.env;
    } catch (e) {
        console.warn("Could not get Cloudflare context", e);
    }

    let categoryList: typeof categories.$inferSelect[] = [];
    if (env && env.DB) {
        const db = getDb(env.DB as D1Database);
        categoryList = await db.select().from(categories).orderBy(categories.sortOrder);
    } else {
        // Fallback for development/build without DB access if needed, or handle as error
        console.warn("No DB access, categories will be empty");
    }

    return (
        <div className="min-h-screen bg-[#1a102e] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
             {/* Background Elements similar to Hero for consistency */}
             <div className="absolute inset-0 bg-radial-gradient from-[#2D1B4E] via-[#1a102e] to-black opacity-80 -z-10" />

            <div className="max-w-7xl mx-auto z-10 relative">
                <div className="text-center mb-16 animate-in slide-in-from-top duration-700">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6 tracking-wide">
                        {t('title') || (locale === 'bn' ? 'আমাদের ক্যাটাগরি' : 'Our Categories')}
                    </h1>
                    <p className="text-lg text-gray-300 font-display italic max-w-2xl mx-auto">
                        {t('subtitle') || (locale === 'bn' ? 'আপনার পছন্দের খাবার বেছে নিন' : 'Choose your favorite food category')}
                    </p>
                </div>

                {categoryList.length === 0 ? (
                     <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                        <h2 className="text-2xl font-serif text-gray-400">Categories coming soon...</h2>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categoryList.map((category) => (
                            <Link href={`/category/${category.id}`} key={category.id} className="block group">
                                <Card className="bg-white/5 border-white/10 overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 h-full relative group">
                                     {/* Image Container */}
                                    <div className="relative h-[250px] w-full overflow-hidden">
                                       {category.image ? (
                                            <Image
                                                src={category.image}
                                                alt={category.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                       ) : (
                                            <div className="flex items-center justify-center h-full bg-[#2D1B4E]/50">
                                                <span className="text-gray-400 italic">No Image</span>
                                            </div>
                                       )}
                                       {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a102e] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                                    </div>

                                    <CardContent className="p-8 relative z-20 -mt-12">
                                        <div className="bg-[#2D1B4E] p-4 rounded-xl shadow-lg border border-white/10 group-hover:border-primary/30 transition-colors duration-300">
                                            <h3 className="text-2xl font-serif font-semibold text-white group-hover:text-primary transition-colors text-center mb-2">
                                                {category.name}
                                            </h3>
                                            {category.description && (
                                                <p className="text-sm text-gray-400 text-center line-clamp-2 font-light">
                                                    {category.description}
                                                </p>
                                            )}
                                             <div className="mt-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                <Button size="sm" variant="link" className="text-primary hover:text-primary-foreground decoration-primary underline-offset-4">
                                                    Explore Menu &rarr;
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                    
                                    {/* Hover Border Effect */}
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-xl transition-colors duration-300 pointer-events-none" />
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

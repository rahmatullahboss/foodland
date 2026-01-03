import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UseTranslations } from 'next-intl'; // Using keys directly if no translation setup
// Note: Assuming we might not have next-intl setup perfectly yet, we will fallback to English text, 
// but using the structure requested. If next-intl is available, we should wrap.
// For now, hardcoding english based on en.json content to ensure it renders without error.

export default function Home() {
    // Simple data for Featured Dishes
    const featuredDishes = [
        {
            id: 1,
            name: "Grilled Salmon Supreme",
            description: "Pan-seared Atlantic salmon with asparagus and saffron sauce.",
            price: "$28",
            image: "/images/605102431_851589250973307_8466811291807877231_n.jpg"
        },
        {
            id: 2,
            name: "Truffle Mushroom Risotto",
            description: "Creamy arborio rice with black truffle shavings and parmesan.",
            price: "$24",
            image: "/images/605122798_851589060973326_895295437583927948_n.jpg"
        },
        {
            id: 3,
            name: "Wagyu Beef Burger",
            description: "Premium Wagyu patty with gold-leaf bun and truffle fries.",
            price: "$35",
            image: "/images/605157204_851589187639980_2832333856076652885_n.jpg"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/361587648_248345061297732_8965419585568778982_n.jpg"
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-60 brightness-75 bg-black"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
                </div>

                <div className="relative z-10 text-center space-y-6 max-w-4xl px-4 animate-in fade-in zoom-in duration-1000">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white drop-shadow-lg">
                        A Symphony of <span className="text-primary italic">Flavors</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide max-w-2xl mx-auto font-display">
                        Experience world-class multi-cuisine fine dining at Foodland.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <Button size="lg" variant="gold" className="text-lg px-8 py-6 rounded-full font-serif" asChild>
                            <Link href="/reservation">Reserve a Table</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-white text-white hover:bg-white hover:text-black font-serif backdrop-blur-sm" asChild>
                            <Link href="/menu">Order Online</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-24 bg-neutral-950 text-white">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 animate-in slide-in-from-left duration-700">
                        <h2 className="text-4xl md:text-5xl font-serif text-primary">The Chef's Story</h2>
                        <p className="text-lg text-gray-400 leading-relaxed font-display">
                            Born from a passion for culinary excellence, Foodland brings together the finest ingredients
                            and traditional techniques. Our chefs craft every dish with precision, turning simple meals
                            into unforgettable memories.
                        </p>
                        <p className="text-lg text-gray-400 leading-relaxed font-display">
                            Whether it's a romantic dinner or a family gathering, our ambiance sets the stage for
                            magical moments.
                        </p>
                        <Button variant="link" className="text-primary p-0 text-lg">
                            Read More &rarr;
                        </Button>
                    </div>
                    <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-in slide-in-from-right duration-700">
                        <Image
                            src="/images/606441375_851589284306637_7172378830321824833_n.jpg"
                            alt="Chef at work"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </div>
            </section>

            {/* Featured Dishes Section */}
            <section className="py-24 bg-neutral-900 border-y border-white/5">
                <div className="container mx-auto px-4 space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-serif text-white">Signature Dishes</h2>
                        <p className="text-muted-foreground font-display text-xl">Curated by our master chefs</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredDishes.map((dish) => (
                            <Card key={dish.id} className="bg-neutral-950 border-white/10 overflow-hidden group hover:border-primary/50 transition-colors">
                                <div className="relative h-64 w-full overflow-hidden">
                                    <Image
                                        src={dish.image}
                                        alt={dish.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur text-primary px-3 py-1 rounded-full text-sm font-bold border border-primary/20">
                                        {dish.price}
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle className="font-serif text-2xl text-white group-hover:text-primary transition-colors">{dish.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base font-display">
                                        {dish.description}
                                    </CardDescription>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full bg-white/10 hover:bg-primary hover:text-black text-white" variant="ghost">Add to Order</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    <div className="text-center pt-8">
                        <Button variant="outline" size="lg" className="rounded-full border-primary text-primary hover:bg-primary hover:text-black">
                            View Full Menu
                        </Button>
                    </div>
                </div>
            </section>

            {/* Ambiance Parallax Section */}
            <section className="relative h-[60vh] flex items-center justify-center bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/images/605538335_851589170973315_8298854732230865204_n.jpg')" }}>
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 text-center space-y-4 p-8 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 max-w-2xl mx-4">
                    <h2 className="text-4xl md:text-6xl font-serif text-white">Exquisite Ambiance</h2>
                    <p className="text-xl text-gray-200 font-display">
                        Dine in an atmosphere of elegance and warmth. Perfect for celebrations and intimate moments.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white py-12 border-t border-white/10">
                <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-serif text-primary">Foodland</h3>
                        <p className="text-muted-foreground">Multi Cuisine Restaurant & Party Center.</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-xl font-serif">Contact</h4>
                        <p className="text-muted-foreground">123 Foodland Street, Flavor Town</p>
                        <p className="text-muted-foreground">+880 1234 567890</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-xl font-serif">Opening Hours</h4>
                        <p className="text-muted-foreground">Mon - Sun: 11:00 AM - 11:00 PM</p>
                    </div>
                </div>
                <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/5 text-center text-sm text-neutral-500">
                    © 2026 Foodland. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

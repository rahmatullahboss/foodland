import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import '../globals.css';
import { Toaster } from 'sonner';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-serif',
    display: 'swap',
});

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    variable: '--font-display',
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Foodland - Fine Dining & Party Center',
    description: 'Experience the art of culinary excellence at Foodland. A multi-cuisine restaurant specializing in luxury dining.',
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    return (
        <html lang={locale} className="dark">
            <body
                className={`${inter.variable} ${playfair.variable} ${cormorant.variable} antialiased`}
            >
                {children}
                <Toaster />
            </body>
        </html>
    );
}

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data matching the schema
const mockMenuItems = [
    // Pizza
    { id: 'piz_1', name_en: 'Foodland Special Pizza', name_bn: 'ফুডল্যান্ড স্পেশাল পিৎজা', price: 700, image: '/images/605102431_851589250973307_8466811291807877231_n.jpg', description_en: 'Size: 8"-700, 10"-900, 12"-1100', description_bn: 'সাইজ: ৮"-৭০০, ১০"-৯০০, ১২"-১১০০' },
    { id: 'piz_2', name_en: 'BBQ Pizza', name_bn: 'বি.বি.কিউ পিৎজা', price: 580, image: '/images/605102431_851589250973307_8466811291807877231_n.jpg', description_en: 'Size: 8"-580', description_bn: 'সাইজ: ৮"-৫৮০' },

    // Rice
    { id: 'rice_1', name_en: 'Foodland Special Fried Rice', name_bn: 'ফুডল্যান্ড স্পেশাল ফ্রাইড রাইস', price: 450, image: '/images/605122798_851589060973326_895295437583927948_n.jpg', description_en: 'Ratio: 1:2', description_bn: 'অনুপাত: ১:২' },
    { id: 'rice_3', name_en: 'Chicken Hyderabadi Biryani', name_bn: 'চিকেন হায়দ্রাবাদি বিরিয়ানি', price: 380, image: '/images/605817716_851589344306631_5321405325789133679_n.jpg', description_en: 'Ratio: 1:2', description_bn: 'অনুপাত: ১:২' },

    // Sizzling & Curry
    { id: 'siz_1', name_en: 'Beef Sizzling', name_bn: 'বিফ সিজলিং', price: 680, image: '/images/606030217_851589320973300_6252515934172775577_n.jpg', description_en: 'Ratio: 1:3', description_bn: 'অনুপাত: ১:৩' },
    { id: 'cur_1', name_en: 'Chicken Red Curry', name_bn: 'চিকেন রেড কারি', price: 520, image: '/images/606030217_851589320973300_6252515934172775577_n.jpg', description_en: 'Ratio: 1:3', description_bn: 'অনুপাত: ১:৩' },

    // Fast Food
    { id: 'burg_1', name_en: 'Chicken Burger', name_bn: 'চিকেন বার্গার', price: 250, image: '/images/608536953_851589204306645_4473889673049446755_n.jpg', description_en: 'Delicious Chicken Patty', description_bn: 'সুস্বাদু চিকেন প্যাটি' },
    { id: 'pas_1', name_en: 'Foodland Special Pasta', name_bn: 'ফুডল্যান্ড স্পেশাল পাস্তা', price: 400, image: '/images/607946783_851589334306632_851326872639681854_n.jpg', description_en: 'Oven Baked', description_bn: 'ওভেন বেকড' },
    { id: 'chow_1', name_en: 'Foodland Special Chowmein', name_bn: 'ফুডল্যান্ড স্পেশাল চাওমিন', price: 440, image: '/images/606441375_851589284306637_7172378830321824833_n.jpg', description_en: 'Ratio: 1:2', description_bn: 'অনুপাত: ১:২' },

    // Drinks & Others
    { id: 'drk_1', name_en: 'Oreo Milkshake', name_bn: 'ওরিও মিল্কশেক', price: 200, image: '/images/605650353_851589247639974_6925518677826707169_n.jpg', description_en: 'Chilled', description_bn: 'ঠান্ডা' },
    { id: 'set_1', name_en: 'Regular Set Menu 1', name_bn: 'সেট মেনু ১', price: 600, image: '/images/607645220_851589400973292_8610932934850572722_n.jpg', description_en: 'Fried Rice, Chicken, Veg', description_bn: 'ফ্রাইড রাইস, চিকেন, ভেজিটেবল' },
    { id: 'momo_1', name_en: 'Chicken Steam Momo', name_bn: 'চিকেন স্টিম মোমো', price: 320, image: '/images/606858522_851589207639978_765950520261064099_n.jpg', description_en: '6 pcs', description_bn: '৬ পিস' },
];

export default function MenuPage({ params: { locale } }: { params: { locale: string } }) {
    const t = useTranslations('Menu');

    // Basic localization helper since we are mocking
    const getLocalizedName = (item: typeof mockMenuItems[0]) => {
        return locale === 'bn' ? item.name_bn : item.name_en;
    };

    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                        {t('title') || (locale === 'bn' ? 'আমাদের মেনু' : 'Our Menu')}
                    </h1>
                    <p className="text-lg text-muted-foreground font-display italic">
                        {t('subtitle') || (locale === 'bn' ? 'বিলাসবহুল ডাইনিং অভিজ্ঞতা' : 'Experience Luxury Dining')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockMenuItems.map((item) => (
                        <Card key={item.id} className="bg-card border-border overflow-hidden hover:border-primary/50 transition-colors duration-300 group">
                            <div className="relative h-[400px] w-full overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={getLocalizedName(item)}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-serif font-semibold text-primary mb-2">
                                    {getLocalizedName(item)}
                                </h3>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-muted-foreground text-sm">
                                        {locale === 'bn' ? 'বিস্তারিত দেখতে ট্যাপ করুন' : 'Tap to view details'}
                                    </span>
                                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                                        {locale === 'bn' ? 'অর্ডার করুন' : 'Order Now'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

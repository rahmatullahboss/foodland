import { db } from "./index";
import { menuItems } from "./schema";
import { crypto } from "crypto";

const images = [
    "608536953_851589204306645_4473889673049446755_n.jpg",
    "607946783_851589334306632_851326872639681854_n.jpg",
    "607645220_851589400973292_8610932934850572722_n.jpg",
    "606858522_851589207639978_765950520261064099_n.jpg",
    "606441375_851589284306637_7172378830321824833_n.jpg",
    "606030217_851589320973300_6252515934172775577_n.jpg",
    "605817716_851589344306631_5321405325789133679_n.jpg",
    "605687573_851589417639957_8185724907741742848_n.jpg",
    "605650353_851589247639974_6925518677826707169_n.jpg",
    "605538335_851589170973315_8298854732230865204_n.jpg",
    "605157204_851589187639980_2832333856076652885_n.jpg",
    "605122798_851589060973326_895295437583927948_n.jpg",
    "605102431_851589250973307_8466811291807877231_n.jpg",
    "361587648_248345061297732_8965419585568778982_n.jpg"
];

async function seed() {
    console.log("Seeding menu items...");

    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        await db.insert(menuItems).values({
            id: crypto.randomUUID(),
            nameEn: `Menu Item ${i + 1}`,
            nameBn: `মেনু আইটেম ${i + 1}`,
            descriptionEn: "Delicious luxury dining experience.",
            descriptionBn: "সুস্বাদু লাক্সারি ডাইনিং অভিজ্ঞতা।",
            slug: `menu-item-${i + 1}`,
            price: 0, // Placeholder
            category: "General",
            featuredImage: `/images/${image}`,
            isActive: true
        }).onConflictDoNothing();
    }

    console.log("Seeding complete!");
}

seed().catch(console.error);

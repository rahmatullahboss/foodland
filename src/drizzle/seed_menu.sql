-- Clean up existing data to avoid duplicates
PRAGMA defer_foreign_keys = 1;
PRAGMA foreign_keys = OFF;
DELETE FROM menu_item_variants;
DELETE FROM menu_items;
DELETE FROM categories;
DELETE FROM reviews; -- Also helpful to clean this
PRAGMA foreign_keys = ON;
PRAGMA defer_foreign_keys = 0;

-- 1. Seed Categories
INSERT INTO categories (id, name, slug, sort_order, is_active) VALUES
('cat_pizza', 'Pizza', 'pizza', 10, 1),
('cat_burger', 'Burger & Sandwich', 'burger-sandwich', 20, 1),
('cat_pasta', 'Pasta & Chowmein', 'pasta-chowmein', 30, 1),
('cat_rice', 'Rice & Biryani', 'rice-biryani', 40, 1),
('cat_setmenu', 'Set Menu', 'set-menu', 50, 1),
('cat_chicken', 'Chicken & Beef', 'chicken-beef', 60, 1),
('cat_seafood', 'Seafood', 'seafood', 70, 1),
('cat_soup', 'Soup', 'soup', 80, 1),
('cat_appetizer', 'Appetizers & Fry', 'appetizers-fry', 90, 1),
('cat_drinks', 'Drinks & Desserts', 'drinks-desserts', 100, 1),
('cat_platter', 'Party Platter', 'party-platter', 110, 1);

-- 2. Seed Menu Items

-- Pizza (with photorealistic images - all 8 items)
INSERT INTO menu_items (id, name_en, name_bn, description_en, description_bn, slug, price, category_id, featured_image, is_active) VALUES
('piz_1', 'Foodland Special Pizza', 'ফুডল্যান্ড স্পেশাল পিৎজা', '', '', 'foodland-special-pizza', 700, 'cat_pizza', '/images/pizza_foodland_special.png', 1),
('piz_2', 'BBQ Pizza', 'বি.বি.কিউ পিৎজা', '', '', 'bbq-pizza', 580, 'cat_pizza', '/images/pizza_bbq.png', 1),
('piz_3', '4 Seasons Pizza', '৪ সিজন পিৎজা', '', '', '4-seasons-pizza', 600, 'cat_pizza', '/images/pizza_four_seasons.png', 1),
('piz_4', 'Mexican Pizza', 'মেক্সিকান পিৎজা', '', '', 'mexican-pizza', 590, 'cat_pizza', '/images/pizza_mexican.png', 1),
('piz_5', 'Chicken Pepperoni Pizza', 'চিকেন পেপারনি পিৎজা', '', '', 'chicken-pepperoni-pizza', 600, 'cat_pizza', '/images/pizza_chicken_pepperoni.png', 1),
('piz_6', 'Italian Pizza', 'ইতালিয়ান পিৎজা', '', '', 'italian-pizza', 499, 'cat_pizza', '/images/pizza_italian.png', 1),
('piz_7', 'Chicken Supreme Pizza', 'চিকেন সুপ্রিম পিৎজা', '', '', 'chicken-supreme-pizza', 540, 'cat_pizza', '/images/pizza_chicken_supreme.png', 1),
('piz_8', 'Chicken Naga Pizza', 'চিকেন নাগা পিৎজা', '', '', 'chicken-naga-pizza', 500, 'cat_pizza', '/images/pizza_chicken_naga.png', 1);

-- Rice & Biryani (Image: 605122798...jpg, 605817716...jpg)
INSERT INTO menu_items (id, name_en, name_bn, description_en, description_bn, slug, price, category_id, featured_image, is_active) VALUES
('rice_1', 'Foodland Special Fried Rice', 'ফুডল্যান্ড স্পেশাল ফ্রাইড রাইস', 'Ratio: 1:2-450, 1:3-650', 'অনুপাত: ১:২-৪৫০, ১:৩-৬৫০', 'special-fried-rice', 450, 'cat_rice', '/images/605122798_851589060973326_895295437583927948_n.jpg', 1),
('rice_2', 'Thai Fried Rice', 'থাই ফ্রাইড রাইস', 'Ratio: 1:2-400, 1:3-590', 'অনুপাত: ১:২-৪০০, ১:৩-৫৯০', 'thai-fried-rice', 400, 'cat_rice', '/images/605122798_851589060973326_895295437583927948_n.jpg', 1),
('rice_3', 'Chicken Hyderabadi Biryani', 'চিকেন হায়দ্রাবাদি বিরিয়ানি', 'Ratio: 1:2-380, 1:3-560', 'অনুপাত: ১:২-৩৮০, ১:৩-৫৬০', 'chicken-hyd-biryani', 380, 'cat_rice', '/images/605817716_851589344306631_5321405325789133679_n.jpg', 1),
('rice_4', 'Mutton Hyderabadi Biryani', 'মাটন হায়দ্রাবাদি বিরিয়ানি', 'Ratio: 1:2-500, 1:3-730', 'অনুপাত: ১:২-৫০০, ১:৩-৭৩০', 'mutton-hyd-biryani', 500, 'cat_rice', '/images/605817716_851589344306631_5321405325789133679_n.jpg', 1),
('rice_5', 'Beef Hyderabadi Biryani', 'বিফ হায়দ্রাবাদি বিরিয়ানি', 'Ratio: 1:2-480, 1:3-700', 'অনুপাত: ১:২-৪৮০, ১:৩-৭০০', 'beef-hyd-biryani', 480, 'cat_rice', '/images/605817716_851589344306631_5321405325789133679_n.jpg', 1);

-- Sizzling & Curry (Image: 606030217...jpg)
INSERT INTO menu_items (id, name_en, name_bn, description_en, description_bn, slug, price, category_id, featured_image, is_active) VALUES
('siz_1', 'Beef Sizzling', 'বিফ সিজলিং', 'Ratio: 1:3', 'অনুপাত: ১:৩', 'beef-sizzling', 680, 'cat_chicken', '/images/606030217_851589320973300_6252515934172775577_n.jpg', 1),
('siz_2', 'Chicken Sizzling', 'চিকেন সিজলিং', 'Ratio: 1:3', 'অনুপাত: ১:৩', 'chicken-sizzling', 480, 'cat_chicken', '/images/606030217_851589320973300_6252515934172775577_n.jpg', 1),
('cur_1', 'Chicken Red Curry', 'চিকেন রেড কারি', 'Ratio: 1:3', 'অনুপাত: ১:৩', 'chicken-red-curry', 520, 'cat_chicken', '/images/606030217_851589320973300_6252515934172775577_n.jpg', 1),
('cur_2', 'Prawn Red Curry', 'চিংড়ি রেড কারি', 'Ratio: 1:3', 'অনুপাত: ১:৩', 'prawn-red-curry', 680, 'cat_seafood', '/images/606030217_851589320973300_6252515934172775577_n.jpg', 1);

-- Pasta & Chowmein (Image: 607946783...jpg, 606441375...jpg)
INSERT INTO menu_items (id, name_en, name_bn, description_en, description_bn, slug, price, category_id, featured_image, is_active) VALUES
('pas_1', 'Foodland Special Pasta', 'ফুডল্যান্ড স্পেশাল পাস্তা', '', '', 'special-pasta', 400, 'cat_pasta', '/images/607946783_851589334306632_851326872639681854_n.jpg', 1),
('pas_2', 'Oven Baked Pasta', 'ওভেন বেকড পাস্তা', '', '', 'oven-baked-pasta', 300, 'cat_pasta', '/images/607946783_851589334306632_851326872639681854_n.jpg', 1),
('chow_1', 'Foodland Special Chowmein', 'ফুডল্যান্ড স্পেশাল চাওমিন', 'Ratio: 1:2-440, 1:3-640', 'অনুপাত: ১:২-৪৪০, ১:৩-৬৪০', 'special-chowmein', 440, 'cat_pasta', '/images/606441375_851589284306637_7172378830321824833_n.jpg', 1),
('chow_2', 'Chicken Chowmein', 'চিকেন চাওমিন', 'Ratio: 1:2-360, 1:3-500', 'অনুপাত: ১:২-৩৬০, ১:৩-৫০০', 'chicken-chowmein', 360, 'cat_pasta', '/images/606441375_851589284306637_7172378830321824833_n.jpg', 1);

-- Burger Menu (বার্গার মেনু) - 7 items from original menu
INSERT INTO menu_items (id, name_en, name_bn, description_en, description_bn, slug, price, category_id, featured_image, is_active) VALUES
('burg_1', 'Chicken Burger', 'চিকেন বার্গার', '', '', 'chicken-burger', 250, 'cat_burger', '/images/burgers/burger_chicken.png', 1),
('burg_2', 'Chicken Cheese Burger', 'চিকেন চিজ বার্গার', '', '', 'chicken-cheese-burger', 300, 'cat_burger', '/images/burgers/burger_chicken_cheese.png', 1),
('burg_3', 'Super Chicken Burger', 'সুপার চিকেন বার্গার', '', '', 'super-chicken-burger', 440, 'cat_burger', '/images/burgers/burger_super_chicken.png', 1),
('burg_4', 'Chicken Double Blast Burger', 'চিকেন ডাবল ব্লাস্ট বার্গার', '', '', 'chicken-double-blast-burger', 480, 'cat_burger', '/images/burgers/burger_double_blast.png', 1),
('burg_5', 'BBQ Burger', 'বি.বি.কিউ বার্গার', '', '', 'bbq-burger', 350, 'cat_burger', '/images/burgers/burger_bbq.png', 1),
('burg_6', 'Naga Cheese Burger', 'নাগা চিজ বার্গার', '', '', 'naga-cheese-burger', 330, 'cat_burger', '/images/burgers/burger_naga_cheese.png', 1),
('burg_7', 'Crispy Chicken Cheese Burger', 'ক্রিসপি চিকেন চিজ বার্গার', '', '', 'crispy-chicken-cheese-burger', 380, 'cat_burger', '/images/burgers/burger_crispy_chicken_cheese.png', 1);

-- Sub Burger (সাব বার্গার) - 2 items from original menu
INSERT INTO menu_items (id, name_en, name_bn, description_en, description_bn, slug, price, category_id, featured_image, is_active) VALUES
('sub_1', 'Chicken Cheese Sub', 'চিকেন চিজ সাব বার্গার', '', '', 'chicken-cheese-sub', 380, 'cat_burger', '/images/burgers/sub_chicken_cheese.png', 1),
('sub_2', 'BBQ Chicken Sub', 'বি.বি.কিউ চিকেন সাব বার্গার', '', '', 'bbq-chicken-sub', 400, 'cat_burger', '/images/burgers/sub_bbq_chicken.png', 1);

-- Momo (appetizer category)
INSERT INTO menu_items (id, name_en, name_bn, description_en, description_bn, slug, price, category_id, featured_image, is_active) VALUES
('momo_1', 'Chicken Steam Momo', 'চিকেন স্টিম মোমো', '6 pcs', '৬ পিস', 'chicken-steam-momo', 320, 'cat_appetizer', '/images/606858522_851589207639978_765950520261064099_n.jpg', 1),
('momo_2', 'Chicken Fry Momo', 'চিকেন ফ্রাই মোমো', '6 pcs', '৬ পিস', 'chicken-fry-momo', 350, 'cat_appetizer', '/images/606858522_851589207639978_765950520261064099_n.jpg', 1);

-- Appetizers & Soup (Image: 605687573...jpg, 605157204...jpg)
INSERT INTO menu_items (id, name_en, name_bn, description_en, description_bn, slug, price, category_id, featured_image, is_active) VALUES
('app_1', 'French Fry', 'ফ্রেঞ্চ ফ্রাই', '', '', 'french-fry', 200, 'cat_appetizer', '/images/605687573_851589417639957_8185724907741742848_n.jpg', 1),
('app_2', 'Chicken Nachos', 'চিকেন নাচোস', '', '', 'chicken-nachos', 300, 'cat_appetizer', '/images/605687573_851589417639957_8185724907741742848_n.jpg', 1),
('soup_1', 'Thai Thick Soup', 'থাই থিক স্যুপ', 'Ratio: 1:2-320, 1:3-470', 'অনুপাত: ১:২-৩২০, ১:৩-৪৭০', 'thai-thick-soup', 320, 'cat_soup', '/images/605157204_851589187639980_2832333856076652885_n.jpg', 1),
('soup_2', 'Special Corn Soup', 'স্পেশাল কর্ন স্যুপ', 'Ratio: 1:2-290, 1:3-350', 'অনুপাত: ১:২-২৯০, ১:৩-৩৫০', 'corn-soup', 290, 'cat_soup', '/images/605157204_851589187639980_2832333856076652885_n.jpg', 1);

-- Drinks & Desserts (Image: 605650353...jpg, 605538335...jpg)
INSERT INTO menu_items (id, name_en, name_bn, description_en, description_bn, slug, price, category_id, featured_image, is_active) VALUES
('drk_1', 'Oreo Milkshake', 'ওরিও মিল্কশেক', '', '', 'oreo-milkshake', 200, 'cat_drinks', '/images/605650353_851589247639974_6925518677826707169_n.jpg', 1),
('drk_2', 'KitKat Milkshake', 'কিটক্যাট মিল্কশেক', '', '', 'kitkat-milkshake', 230, 'cat_drinks', '/images/605650353_851589247639974_6925518677826707169_n.jpg', 1),
('drk_3', 'Special Faluda', 'স্পেশাল ফালুদা', '', '', 'special-faluda', 290, 'cat_drinks', '/images/605538335_851589170973315_8298854732230865204_n.jpg', 1);

-- Set Menu (Image: 605817716...jpg for combos, 607645220...jpg for sets)
INSERT INTO menu_items (id, name_en, name_bn, description_en, description_bn, slug, price, category_id, featured_image, is_active) VALUES
('set_1', 'Regular Set Menu 1', 'সেট মেনু ১', 'Fried Rice, Chicken, Veg', 'ফ্রাইড রাইস, চিকেন, ভেজিটেবল', 'set-menu-1', 600, 'cat_setmenu', '/images/607645220_851589400973292_8610932934850572722_n.jpg', 1),
('set_2', 'Couple Set Menu 1', 'কাপল সেট মেনু ১', 'For 2 Persons', '২ জনের জন্য', 'couple-set-1', 800, 'cat_setmenu', '/images/605817716_851589344306631_5321405325789133679_n.jpg', 1);

-- 3. Seed Pizza Size Variants (8", 10", 12")
INSERT INTO menu_item_variants (id, menu_item_id, name, price) VALUES
-- Foodland Special Pizza: 8"-700, 10"-900, 12"-1100
('piz_1_8', 'piz_1', '8" (Small)', 700),
('piz_1_10', 'piz_1', '10" (Medium)', 900),
('piz_1_12', 'piz_1', '12" (Large)', 1100),
-- BBQ Pizza: 8"-580, 10"-750, 12"-920
('piz_2_8', 'piz_2', '8" (Small)', 580),
('piz_2_10', 'piz_2', '10" (Medium)', 750),
('piz_2_12', 'piz_2', '12" (Large)', 920),
-- 4 Seasons Pizza: 8"-600, 10"-800, 12"-980
('piz_3_8', 'piz_3', '8" (Small)', 600),
('piz_3_10', 'piz_3', '10" (Medium)', 800),
('piz_3_12', 'piz_3', '12" (Large)', 980),
-- Mexican Pizza: 8"-590, 10"-750, 12"-900
('piz_4_8', 'piz_4', '8" (Small)', 590),
('piz_4_10', 'piz_4', '10" (Medium)', 750),
('piz_4_12', 'piz_4', '12" (Large)', 900),
-- Chicken Pepperoni Pizza: 8"-600, 10"-780, 12"-950
('piz_5_8', 'piz_5', '8" (Small)', 600),
('piz_5_10', 'piz_5', '10" (Medium)', 780),
('piz_5_12', 'piz_5', '12" (Large)', 950),
-- Italian Pizza: 8"-499, 10"-650, 12"-800
('piz_6_8', 'piz_6', '8" (Small)', 499),
('piz_6_10', 'piz_6', '10" (Medium)', 650),
('piz_6_12', 'piz_6', '12" (Large)', 800),
-- Chicken Supreme Pizza: 8"-540, 10"-700, 12"-860
('piz_7_8', 'piz_7', '8" (Small)', 540),
('piz_7_10', 'piz_7', '10" (Medium)', 700),
('piz_7_12', 'piz_7', '12" (Large)', 860),
-- Chicken Naga Pizza: 8"-500, 10"-650, 12"-800
('piz_8_8', 'piz_8', '8" (Small)', 500),
('piz_8_10', 'piz_8', '10" (Medium)', 650),
('piz_8_12', 'piz_8', '12" (Large)', 800);

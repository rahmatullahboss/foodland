-- Clean up existing data to avoid duplicates
DELETE FROM menu_item_variants;
DELETE FROM menu_items;
DELETE FROM categories;

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

-- Pizza (Image: 605102431...jpg)
INSERT INTO menu_items (id, name_en, name_bn, description_en, description_bn, slug, price, category_id, featured_image, is_active) VALUES
('piz_1', 'Foodland Special Pizza', 'ফুডল্যান্ড স্পেশাল পিৎজা', 'Size: 8"-700, 10"-900, 12"-1100', 'সাইজ: ৮"-৭০০, ১০"-৯০০, ১২"-১১০০', 'foodland-special-pizza', 700, 'cat_pizza', '/images/605102431_851589250973307_8466811291807877231_n.jpg', 1),
('piz_2', 'BBQ Pizza', 'বি.বি.কিউ পিৎজা', 'Size: 8"-580, 10"-750, 12"-920', 'সাইজ: ৮"-৫৮০, ১০"-৭৫০, ১২"-৯২০', 'bbq-pizza', 580, 'cat_pizza', '/images/605102431_851589250973307_8466811291807877231_n.jpg', 1),
('piz_3', '4 Seasons Pizza', '৪ সিজন পিৎজা', 'Size: 8"-600, 10"-800, 12"-980', 'সাইজ: ৮"-৬০০, ১০"-৮০০, ১২"-৯৮০', '4-seasons-pizza', 600, 'cat_pizza', '/images/605102431_851589250973307_8466811291807877231_n.jpg', 1),
('piz_4', 'Mexican Pizza', 'মেক্সিকান পিৎজা', 'Size: 8"-590, 10"-750, 12"-900', 'সাইজ: ৮"-৫৯০, ১০"-৭৫০, ১২"-৯০০', 'mexican-pizza', 590, 'cat_pizza', '/images/605102431_851589250973307_8466811291807877231_n.jpg', 1),
('piz_5', 'Chicken Pepperoni Pizza', 'চিকেন পেপারনি পিৎজা', 'Size: 8"-600, 10"-780, 12"-950', 'সাইজ: ৮"-৬০০, ১০"-৭৮০, ১২"-৯৫০', 'chicken-pepperoni-pizza', 600, 'cat_pizza', '/images/605102431_851589250973307_8466811291807877231_n.jpg', 1),
('piz_6', 'Italian Pizza', 'ইতালিয়ান পিৎজা', 'Size: 8"-499, 10"-650, 12"-800', 'সাইজ: ৮"-৪৯৯, ১০"-৬৫০, ১২"-৮০০', 'italian-pizza', 499, 'cat_pizza', '/images/605102431_851589250973307_8466811291807877231_n.jpg', 1);

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

-- Burger, Sandwich & Momo (Image: 608536953...jpg, 606858522...jpg)
INSERT INTO menu_items (id, name_en, name_bn, description_en, description_bn, slug, price, category_id, featured_image, is_active) VALUES
('burg_1', 'Chicken Burger', 'চিকেন বার্গার', '', '', 'chicken-burger', 250, 'cat_burger', '/images/608536953_851589204306645_4473889673049446755_n.jpg', 1),
('burg_2', 'Super Chicken Burger', 'সুপার চিকেন বার্গার', '', '', 'super-chicken-burger', 440, 'cat_burger', '/images/608536953_851589204306645_4473889673049446755_n.jpg', 1),
('sub_1', 'Chicken Cheese Sub', 'চিকেন চিজ সাব', '', '', 'chicken-cheese-sub', 360, 'cat_burger', '/images/606858522_851589207639978_765950520261064099_n.jpg', 1),
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

-- Categories
INSERT OR IGNORE INTO categories (id, name, slug, is_active) VALUES ('cat_pizza', 'Pizza', 'pizza', 1);
INSERT OR IGNORE INTO categories (id, name, slug, is_active) VALUES ('cat_burger', 'Burger', 'burger', 1);

-- Menu Items (Pizzas)
-- Using existing cartoon assets as placeholders
INSERT OR IGNORE INTO menu_items (id, name_en, slug, price, category_id, description_en, featured_image, is_active) VALUES 
('pizza_1', 'Classic Margherita', 'margherita', 850, 'cat_pizza', 'Authentic Italian pizza with fresh mozzarella and basil.', '/images/pizza_margherita_real.png', 1),
('pizza_2', 'Spicy Pepperoni', 'pepperoni', 950, 'cat_pizza', 'Loaded with spicy pepperoni and chili flakes.', '/images/pizza_pepperoni_real.png', 1),
('pizza_3', 'BBQ Chicken Feast', 'bbq-chicken', 1050, 'cat_pizza', 'Tender chicken pieces tossed in smokey BBQ sauce.', '/images/pizza_bbq_chicken_real.png', 1),
('pizza_4', 'Veggie Supreme', 'veggie-supreme', 800, 'cat_pizza', 'Loaded with bell peppers, onions, and mushrooms.', '/images/pizza_veggie_real.png', 1),
('pizza_5', 'Seafood Delight', 'seafood-delight', 1200, 'cat_pizza', 'Fresh shrimp and crab meat with white sauce.', '/images/pizza_seafood_real.png', 1),
('pizza_6', 'Meat Lovers', 'meat-lovers', 1150, 'cat_pizza', 'Packed with pepperoni, sausage, beef, and bacon.', '/images/pizza_pepperoni_real.png', 1),
('pizza_7', 'Four Cheese', 'four-cheese', 900, 'cat_pizza', 'Blend of Mozzarella, Cheddar, Parmesan, and Gorgonzola.', '/images/pizza_margherita_real.png', 1),
('pizza_8', 'Hawaiian', 'hawaiian', 950, 'cat_pizza', 'Classic ham and pineapple combination.', '/images/pizza_veggie_real.png', 1);

-- Menu Item Variants (Sizes)
-- Pizza 1 (Margherita)
INSERT OR IGNORE INTO menu_item_variants (id, menu_item_id, name, price) VALUES 
('var_p1_s', 'pizza_1', 'Small (8")', 550),
('var_p1_m', 'pizza_1', 'Medium (12")', 850),
('var_p1_l', 'pizza_1', 'Large (16")', 1250);

-- Pizza 2 (Pepperoni)
INSERT OR IGNORE INTO menu_item_variants (id, menu_item_id, name, price) VALUES 
('var_p2_s', 'pizza_2', 'Small (8")', 650),
('var_p2_m', 'pizza_2', 'Medium (12")', 950),
('var_p2_l', 'pizza_2', 'Large (16")', 1350);

-- Pizza 3 (BBQ Chicken)
INSERT OR IGNORE INTO menu_item_variants (id, menu_item_id, name, price) VALUES 
('var_p3_s', 'pizza_3', 'Small (8")', 750),
('var_p3_m', 'pizza_3', 'Medium (12")', 1050),
('var_p3_l', 'pizza_3', 'Large (16")', 1450);

-- Pizza 4 (Veggie)
INSERT OR IGNORE INTO menu_item_variants (id, menu_item_id, name, price) VALUES 
('var_p4_s', 'pizza_4', 'Small (8")', 500),
('var_p4_m', 'pizza_4', 'Medium (12")', 800),
('var_p4_l', 'pizza_4', 'Large (16")', 1200);

-- Pizza 5 (Seafood)
INSERT OR IGNORE INTO menu_item_variants (id, menu_item_id, name, price) VALUES 
('var_p5_s', 'pizza_5', 'Small (8")', 900),
('var_p5_m', 'pizza_5', 'Medium (12")', 1200),
('var_p5_l', 'pizza_5', 'Large (16")', 1600);

-- Pizza 6 (Meat Lovers)
INSERT OR IGNORE INTO menu_item_variants (id, menu_item_id, name, price) VALUES 
('var_p6_s', 'pizza_6', 'Small (8")', 850),
('var_p6_m', 'pizza_6', 'Medium (12")', 1150),
('var_p6_l', 'pizza_6', 'Large (16")', 1550);

-- Pizza 7 (Four Cheese)
INSERT OR IGNORE INTO menu_item_variants (id, menu_item_id, name, price) VALUES 
('var_p7_s', 'pizza_7', 'Small (8")', 600),
('var_p7_m', 'pizza_7', 'Medium (12")', 900),
('var_p7_l', 'pizza_7', 'Large (16")', 1300);

-- Pizza 8 (Hawaiian)
INSERT OR IGNORE INTO menu_item_variants (id, menu_item_id, name, price) VALUES 
('var_p8_s', 'pizza_8', 'Small (8")', 650),
('var_p8_m', 'pizza_8', 'Medium (12")', 950),
('var_p8_l', 'pizza_8', 'Large (16")', 1350);

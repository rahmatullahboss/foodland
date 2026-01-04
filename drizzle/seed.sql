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

-- NOTE: Burger items are now in src/drizzle/seed_menu.sql with original menu data
-- This file only contains pizza data for legacy compatibility

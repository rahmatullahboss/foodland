CREATE TABLE `menu_item_variants` (
	`id` text PRIMARY KEY NOT NULL,
	`menu_item_id` text NOT NULL,
	`name` text NOT NULL,
	`price` real NOT NULL,
	`is_active` integer DEFAULT true,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `menu_items` (
	`id` text PRIMARY KEY NOT NULL,
	`name_en` text NOT NULL,
	`name_bn` text,
	`slug` text NOT NULL,
	`description_en` text,
	`description_bn` text,
	`price` real NOT NULL,
	`cost_price` real,
	`sku` text,
	`is_vegetarian` integer DEFAULT false,
	`is_vegan` integer DEFAULT false,
	`is_gluten_free` integer DEFAULT false,
	`spiciness_level` integer DEFAULT 0,
	`preparation_time` integer,
	`available_quantity` integer DEFAULT 0,
	`track_quantity` integer DEFAULT false,
	`category_id` text,
	`images` text DEFAULT '[]',
	`featured_image` text,
	`is_active` integer DEFAULT true,
	`is_featured` integer DEFAULT false,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `menu_items_slug_unique` ON `menu_items` (`slug`);--> statement-breakpoint
CREATE TABLE `reservations` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text,
	`table_id` text,
	`guest_count` integer NOT NULL,
	`reservation_time` integer NOT NULL,
	`status` text DEFAULT 'pending',
	`notes` text,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`table_id`) REFERENCES `tables`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tables` (
	`id` text PRIMARY KEY NOT NULL,
	`table_number` text NOT NULL,
	`capacity` integer NOT NULL,
	`location` text,
	`status` text DEFAULT 'available',
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tables_table_number_unique` ON `tables` (`table_number`);--> statement-breakpoint
DROP TABLE `product_variants`;--> statement-breakpoint
DROP TABLE `settings`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_support_tickets` (
	`id` text PRIMARY KEY NOT NULL,
	`ticket_number` text NOT NULL,
	`user_id` text,
	`order_id` text,
	`category` text NOT NULL,
	`subject` text NOT NULL,
	`description` text NOT NULL,
	`status` text DEFAULT 'open',
	`priority` text DEFAULT 'medium',
	`customer_name` text,
	`customer_email` text,
	`customer_phone` text,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`order_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_support_tickets`("id", "ticket_number", "user_id", "order_id", "category", "subject", "description", "status", "priority", "customer_name", "customer_email", "customer_phone", "created_at", "updated_at") SELECT "id", "ticket_number", "user_id", "order_id", "category", "subject", "description", "status", "priority", "customer_name", "customer_email", "customer_phone", "created_at", "updated_at" FROM `support_tickets`;--> statement-breakpoint
DROP TABLE `support_tickets`;--> statement-breakpoint
ALTER TABLE `__new_support_tickets` RENAME TO `support_tickets`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `support_tickets_ticket_number_unique` ON `support_tickets` (`ticket_number`);--> statement-breakpoint
CREATE TABLE `__new_reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`menu_item_id` text,
	`product_id` text,
	`user_id` text,
	`rating` integer NOT NULL,
	`title` text,
	`content` text,
	`is_verified` integer DEFAULT false,
	`is_approved` integer DEFAULT false,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_reviews`("id", "menu_item_id", "product_id", "user_id", "rating", "title", "content", "is_verified", "is_approved", "created_at", "updated_at") SELECT "id", "menu_item_id", "product_id", "user_id", "rating", "title", "content", "is_verified", "is_approved", "created_at", "updated_at" FROM `reviews`;--> statement-breakpoint
DROP TABLE `reviews`;--> statement-breakpoint
ALTER TABLE `__new_reviews` RENAME TO `reviews`;--> statement-breakpoint
ALTER TABLE `addresses` RENAME COLUMN `address_line_1` TO `address_line1`;--> statement-breakpoint
ALTER TABLE `addresses` RENAME COLUMN `address_line_2` TO `address_line2`;--> statement-breakpoint
ALTER TABLE `orders` ADD `order_type` text DEFAULT 'dine_in';--> statement-breakpoint
ALTER TABLE `orders` ADD `table_id` text REFERENCES tables(id);--> statement-breakpoint
ALTER TABLE `orders` RENAME COLUMN `shipping_address` TO `delivery_address`;--> statement-breakpoint
ALTER TABLE `orders` DROP COLUMN `billing_address`;
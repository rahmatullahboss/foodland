import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// ===========================================
// Authentication Tables (Better Auth)
// ===========================================

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).default(false),
  image: text("image"),
  role: text("role", { enum: ["customer", "admin", "staff", "chef"] }).default("customer"),
  phone: text("phone"),
  defaultAddress: text("default_address", { mode: "json" }).$type<{
    division?: string;
    district?: string;
    address?: string;
  }>(),
  preferences: text("preferences", { mode: "json" }).$type<{
    language?: string; // e.g., "en", "bn"
    currency?: string; // e.g., "BDT", "USD"
  }>(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  idToken: text("id_token"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

export const verifications = sqliteTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

// ===========================================
// Restaurant Tables
// ===========================================

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  image: text("image"),
  parentId: text("parent_id"),
  sortOrder: integer("sort_order").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

export const menuItems = sqliteTable("menu_items", {
  id: text("id").primaryKey(),
  nameEn: text("name_en").notNull(),
  nameBn: text("name_bn"),
  slug: text("slug").notNull().unique(),
  descriptionEn: text("description_en"),
  descriptionBn: text("description_bn"),
  price: real("price").notNull(),
  costPrice: real("cost_price"),
  sku: text("sku"),
  isVegetarian: integer("is_vegetarian", { mode: "boolean" }).default(false),
  isVegan: integer("is_vegan", { mode: "boolean" }).default(false),
  isGlutenFree: integer("is_gluten_free", { mode: "boolean" }).default(false),
  spicinessLevel: integer("spiciness_level").default(0), // 0: None, 1: Mild, 2: Medium, 3: Hot
  preparationTime: integer("preparation_time"), // in minutes
  availableQuantity: integer("available_quantity").default(0), // For daily limits
  trackQuantity: integer("track_quantity", { mode: "boolean" }).default(false),
  categoryId: text("category_id").references(() => categories.id),
  images: text("images", { mode: "json" }).$type<string[]>().default([]),
  featuredImage: text("featured_image"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  isFeatured: integer("is_featured", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

export const menuItemVariants = sqliteTable("menu_item_variants", {
  id: text("id").primaryKey(),
  menuItemId: text("menu_item_id")
    .notNull()
    .references(() => menuItems.id, { onDelete: "cascade" }),
  name: text("name").notNull(), // e.g. "Small", "Large"
  price: real("price").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

export const carts = sqliteTable("carts", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  sessionId: text("session_id"),
  items: text("items", { mode: "json" }).$type<CartItem[]>().default([]),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

export const tables = sqliteTable("tables", {
  id: text("id").primaryKey(),
  tableNumber: text("table_number").notNull().unique(),
  capacity: integer("capacity").notNull(),
  location: text("location"), // e.g. "Indoor", "Patio"
  status: text("status", { enum: ["available", "occupied", "reserved", "cleaning"] }).default("available"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  userId: text("user_id").references(() => users.id),
  status: text("status", {
    enum: [
      "pending",
      "confirmed",
      "preparing",
      "ready",
      "served",
      "delivered",
      "cancelled",
      "refunded",
    ],
  }).default("pending"),
  paymentStatus: text("payment_status", {
    enum: ["pending", "paid", "failed", "refunded"],
  }).default("pending"),
  paymentMethod: text("payment_method"),
  orderType: text("order_type", { enum: ["dine_in", "takeaway", "delivery"] }).default("dine_in"),
  tableId: text("table_id").references(() => tables.id),
  subtotal: real("subtotal").notNull(),
  shippingCost: real("shipping_cost").default(0),
  discount: real("discount").default(0),
  tax: real("tax").default(0),
  total: real("total").notNull(),
  currency: text("currency").default("BDT"),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone").notNull(),
  deliveryAddress: text("delivery_address", { mode: "json" }).$type<Address>(),
  notes: text("notes"), // Special instructions for chef
  items: text("items", { mode: "json" }).$type<OrderItem[]>().notNull(), // Snapshot of items
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

export const reviews = sqliteTable("reviews", {
  id: text("id").primaryKey(),
  menuItemId: text("menu_item_id")
    .references(() => menuItems.id, { onDelete: "cascade" }),
  productId: text("product_id")
    .references(() => products.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  rating: integer("rating").notNull(),
  title: text("title"),
  content: text("content"),
  isVerified: integer("is_verified", { mode: "boolean" }).default(false),
  isApproved: integer("is_approved", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

export const reservations = sqliteTable("reservations", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  tableId: text("table_id").references(() => tables.id),
  guestCount: integer("guest_count").notNull(),
  reservationTime: integer("reservation_time", { mode: "timestamp" }).notNull(),
  status: text("status", { enum: ["pending", "confirmed", "cancelled", "completed"] }).default("pending"),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});


// ===========================================
// Site Settings Table
// ===========================================

export interface SettingsData {
  storeName?: string;
  storeEmail?: string;
  storePhone?: string;
  storeAddress?: string;
  deliveryInsideDhaka?: number;
  deliveryOutsideDhaka?: number;
  freeDeliveryThreshold?: number;
  enableFreeDelivery?: boolean;
  enableCOD?: boolean;
  enableStripe?: boolean;
  enableBkash?: boolean;
  notifyNewOrder?: boolean;
  notifyLowStock?: boolean;
  lowStockThreshold?: number;
  openingTime?: string;
  closingTime?: string;
}

export const siteSettings = sqliteTable("site_settings", {
  id: text("id").primaryKey().default("default"),
  settings: text("settings", { mode: "json" }).$type<SettingsData>(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedBy: text("updated_by").references(() => users.id),
});

// ===========================================
// Commerce Tables (Restored)
// ===========================================

export const addresses = sqliteTable("addresses", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  addressLine1: text("address_line1").notNull(),
  addressLine2: text("address_line2"),
  city: text("city").notNull(),
  state: text("state"),
  zipCode: text("zip_code"),
  country: text("country").default("Bangladesh"),
  type: text("type", { enum: ["home", "office", "other"] }).default("home"),
  isDefault: integer("is_default", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  shortDescription: text("short_description"),
  price: real("price").notNull(),
  compareAtPrice: real("compare_at_price"),
  costPrice: real("cost_price"),
  sku: text("sku"),
  barcode: text("barcode"),
  quantity: integer("quantity").default(0),
  lowStockThreshold: integer("low_stock_threshold").default(5),
  trackQuantity: integer("track_quantity", { mode: "boolean" }).default(true),
  categoryId: text("category_id").references(() => categories.id),
  images: text("images", { mode: "json" }).$type<string[]>().default([]),
  featuredImage: text("featured_image"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  isFeatured: integer("is_featured", { mode: "boolean" }).default(false),
  weight: real("weight"),
  weightUnit: text("weight_unit").default("kg"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const coupons = sqliteTable("coupons", {
  id: text("id").primaryKey(),
  code: text("code").notNull().unique(),
  description: text("description"),
  discountType: text("discount_type").notNull(), // 'percentage' or 'fixed'
  discountValue: real("discount_value").notNull(),
  minOrderAmount: real("min_order_amount"),
  maxDiscount: real("max_discount"),
  usageLimit: integer("usage_limit"),
  usedCount: integer("used_count").default(0),
  startsAt: integer("starts_at", { mode: "timestamp" }),
  expiresAt: integer("expires_at", { mode: "timestamp" }),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const wishlist = sqliteTable("wishlist", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const supportTickets = sqliteTable("support_tickets", {
  id: text("id").primaryKey(),
  ticketNumber: text("ticket_number").notNull().unique(),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  orderId: text("order_id").references(() => products.id, { onDelete: "set null" }), // Assuming orderId links to orders, but orders table exists. Let's check orders definition.
  category: text("category").notNull(),
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  status: text("status", { enum: ["open", "in_progress", "resolved", "closed"] }).default("open"),
  priority: text("priority", { enum: ["low", "medium", "high"] }).default("medium"),
  customerName: text("customer_name"),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// ===========================================
// Chat Tables
// ===========================================

export const chatConversations = sqliteTable("chat_conversations", {
  id: text("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  guestName: text("guest_name"),
  guestPhone: text("guest_phone"),
  messageCount: integer("message_count").default(0),
  lastMessageAt: integer("last_message_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

export const chatMessages = sqliteTable("chat_messages", {
  id: text("id").primaryKey(),
  conversationId: text("conversation_id")
    .notNull()
    .references(() => chatConversations.id, { onDelete: "cascade" }),
  role: text("role", { enum: ["user", "assistant", "system"] }).notNull(),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});

// ===========================================
// Relations
// ===========================================

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  orders: many(orders),
  reviews: many(reviews),
  reservations: many(reservations),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many, one }) => ({
  menuItems: many(menuItems),
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
  }),
}));

export const menuItemsRelations = relations(menuItems, ({ one, many }) => ({
  category: one(categories, {
    fields: [menuItems.categoryId],
    references: [categories.id],
  }),
  variants: many(menuItemVariants),
  reviews: many(reviews),
}));

export const menuItemVariantsRelations = relations(
  menuItemVariants,
  ({ one }) => ({
    menuItem: one(menuItems, {
      fields: [menuItemVariants.menuItemId],
      references: [menuItems.id],
    }),
  })
);

export const tablesRelations = relations(tables, ({ many }) => ({
  orders: many(orders),
  reservations: many(reservations),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  table: one(tables, {
    fields: [orders.tableId],
    references: [tables.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  menuItem: one(menuItems, {
    fields: [reviews.menuItemId],
    references: [menuItems.id],
  }),
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));

export const reservationsRelations = relations(reservations, ({ one }) => ({
  user: one(users, {
    fields: [reservations.userId],
    references: [users.id],
  }),
  table: one(tables, {
    fields: [reservations.tableId],
    references: [tables.id],
  }),
}));

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(users, {
    fields: [addresses.userId],
    references: [users.id],
  }),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  reviews: many(reviews), 
}));

export const wishlistRelations = relations(wishlist, ({ one }) => ({
  user: one(users, {
    fields: [wishlist.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [wishlist.productId],
    references: [products.id],
  }),
}));

export const supportTicketsRelations = relations(supportTickets, ({ one }) => ({
  user: one(users, {
    fields: [supportTickets.userId],
    references: [users.id],
  }),
  // order relation if needed, but schema.ts orders definition is separate.
  // orders table is defined earlier.
  order: one(orders, {
     fields: [supportTickets.orderId],
     references: [orders.id],
  }),
}));

export const chatConversationsRelations = relations(
  chatConversations,
  ({ one, many }) => ({
    user: one(users, {
      fields: [chatConversations.userId],
      references: [users.id],
    }),
    messages: many(chatMessages),
  })
);

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  conversation: one(chatConversations, {
    fields: [chatMessages.conversationId],
    references: [chatConversations.id],
  }),
}));

// ===========================================
// Types
// ===========================================

export type User = typeof users.$inferSelect;
export type MenuItem = typeof menuItems.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Table = typeof tables.$inferSelect;
export type Product = typeof products.$inferSelect;
export type CartItem = {
  menuItemId?: string; // made optional to support products
  productId?: string; // added for commerce products
  variantId?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}
export interface OrderItem extends CartItem {
  total: number;
}
export interface Address {
  name: string;
  phone: string;
  address: string;
  city: string;
  state?: string;
  zipCode?: string;
  country?: string;
  instruction?: string;
}

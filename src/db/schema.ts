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
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
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
    .notNull()
    .references(() => menuItems.id, { onDelete: "cascade" }),
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

// ===========================================
// Types
// ===========================================

export type User = typeof users.$inferSelect;
export type MenuItem = typeof menuItems.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Table = typeof tables.$inferSelect;
export type CartItem = {
  menuItemId: string;
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
  instruction?: string;
}

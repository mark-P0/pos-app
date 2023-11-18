import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  sku: text("sku").primaryKey().notNull(),
  category: text("category").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  stock: integer("stock").notNull(),
  url: text("url"),
});
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export const users = sqliteTable("users", {
  username: text("username").primaryKey().notNull(),
  password: text("password").notNull(),
});
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

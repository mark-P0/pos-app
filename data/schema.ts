import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  sku: text("sku").primaryKey(),
  category: text("category"),
  name: text("name"),
  description: text("description"),
  price: integer("price"),
  stock: integer("stock"),
  url: text("url"),
});
export type Product = typeof products.$inferSelect;

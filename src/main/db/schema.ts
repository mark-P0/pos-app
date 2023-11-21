import Database from "better-sqlite3";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
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

/**
 * Reflect the schemas above in the statements below!
 *
 * Can take a look inside a pre-existing SQLite file
 */
export function createDb(path: string) {
  const sqlite = new Database(path);
  const db = drizzle(sqlite);

  db.run(sql`
    CREATE TABLE users (
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      PRIMARY KEY (username)
    )
  `);
  db.run(sql`
    CREATE TABLE products (
      sku TEXT NOT NULL,
      category TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price INTEGER NOT NULL,
      stock INTEGER NOT NULL,
      url TEXT,
      PRIMARY KEY (sku)
    )
  `);
}

import { eq } from "drizzle-orm";
import { db } from "../db.js";
import { NewProduct, Product, products } from "./schema.js";

export async function getAllProducts() {
  return await db.select().from(products);
}

export async function addProduct(product: NewProduct) {
  return await db.insert(products).values(product);
}

export async function deleteProduct(sku: Product["sku"]) {
  await db.delete(products).where(eq(products.sku, sku));
}

export async function editProduct(product: Product) {
  await db.update(products).set(product).where(eq(products.sku, product.sku));
}

export async function getProduct(sku: Product["sku"]) {
  const res = await db.select().from(products).where(eq(products.sku, sku));
  if (res.length === 0) {
    throw new Error(`Product of SKU \`${sku}\` does not exist!`);
  }
  /* Should be impossible as the username is a primary key */
  if (res.length > 1) {
    throw new Error(`There are multiple products of the SKU \`${sku}\`!`);
  }

  return res[0];
}

export async function isSKUExisting(sku: Product["sku"]) {
  try {
    await getProduct(sku);
    return true;
  } catch {
    return false;
  }
}

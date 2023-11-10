import { useCartContext } from "@renderer/contexts/CartContext.js";
import {
  Product,
  useProductsContext,
} from "@renderer/contexts/ProductsContext.js";
import { C, formatPrice } from "@renderer/utils.js";

function ProductListItemButton(props: { product: Product }) {
  const { product } = props;
  const { sku, name, category, price } = product;
  const { addToCart } = useCartContext();

  const imgUrl = `pos-app:///data/images/${sku}.png`;
  const imgAlt = `Image of product "${name}"`;

  const cls = C(
    "w-full text-left",
    "rounded-lg px-3 py-2",
    "border-2 border-cyan-950 dark:border-transparent dark:bg-white/10",
    "transition hover:bg-cyan-950/10 dark:hover:bg-white/20 active:scale-[.98]",
    "grid grid-cols-[1fr_4fr_1fr] gap-4",
  );
  return (
    <button onClick={() => addToCart(sku, 1)}>
      <section className={cls}>
        <img src={imgUrl} alt={imgAlt} />
        <div className="grid gap-1 auto-rows-min">
          <h2 className="text-lg font-head leading-tight">{name}</h2>
          <p className="text-xs uppercase tracking-widest opacity-80 dark:opacity-50">
            {category}
          </p>
        </div>
        <div className="w-full h-full">
          <p className="text-xs tracking-widest text-right font-bold">
            {formatPrice(price)}
          </p>
        </div>
      </section>
    </button>
  );
}

export function ProductList() {
  const { products } = useProductsContext();

  const cls = C(
    ...[
      "overflow-y-auto",
      "scrollbar-thin",
      "scrollbar-track-cyan-950/10 scrollbar-thumb-cyan-950",
      "dark:scrollbar-track-white/10 dark:scrollbar-thumb-white",
      "pr-3 pb-3",
    ],
    "grid gap-3",
    "select-none",
  );
  return (
    <ol className={cls}>
      {products.map((product) => (
        <li key={product.sku}>
          <ProductListItemButton product={product} />
        </li>
      ))}
    </ol>
  );
}

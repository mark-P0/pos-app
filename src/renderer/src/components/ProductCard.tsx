import { Product } from "@renderer/contexts/ProductsContext.js";
import { formatPrice } from "@renderer/utils.js";
import { C } from "@renderer/utils/classes.js";

export function ProductCard(props: { product: Product }) {
  const { product } = props;
  const { sku, name, category, price } = product;

  const imgUrl = `pos-app:///data/images/${sku}.png`;
  const imgAlt = `Image of product "${name}"`;

  const cls = C("grid grid-cols-[1fr_4fr_1fr] gap-4");
  return (
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
  );
}

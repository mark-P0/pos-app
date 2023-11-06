import { Screen } from "@renderer/components/Screen.js";
import { useProductsContext } from "@renderer/contexts/ProductsContext.js";
import { C } from "@renderer/utils.js";

type Product = ReturnType<typeof useProductsContext>["products"][number];

function formatPrice(price: number) {
  const formatter = Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "PHP",
    notation: "standard",
  });
  return formatter.format(price);
}

function ProductListItemButton(props: { product: Product }) {
  const { product } = props;
  const { name, category } = product;
  const price = formatPrice(product.price);

  const cls = C(
    "w-full text-left",
    "rounded-lg px-3 py-2",
    "border-2 border-cyan-950 dark:border-transparent dark:bg-white/10",
    "transition hover:bg-cyan-950/10 dark:hover:bg-white/20 active:scale-[.98]",
    "grid grid-cols-[4fr_1fr] gap-6",
  );
  return (
    <button className={cls}>
      <div className="grid gap-1">
        <h2 className="text-lg font-head leading-tight">{name}</h2>
        <p className="text-xs uppercase tracking-widest opacity-80 dark:opacity-50">
          {category}
        </p>
      </div>
      <div className="w-full h-full bg--green-500">
        <p className="text-xs tracking-widest text-right font-bold">{price}</p>
      </div>
    </button>
  );
}

function ProductList() {
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

export function POSScreen() {
  return (
    <Screen withLogoutButton withFeaturesButton>
      <section className="overflow-hidden h-full grid grid-cols-[2fr_2fr_1fr]">
        <div className="bg-red-500/25">receipt</div>
        <ProductList />
        <div className="bg-yellow-500/25">buttons</div>
      </section>
    </Screen>
  );
}

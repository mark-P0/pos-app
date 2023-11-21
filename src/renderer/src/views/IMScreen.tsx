import { ProductList } from "@renderer/components/ProductList.js";
import { Screen } from "@renderer/components/Screen.js";
import {
  DisplayProductsProvider,
  useDisplayProductsContext,
} from "@renderer/contexts/DisplayProductsContext.js";
import { useProductFormBasisContext } from "@renderer/contexts/ProductFormBasisContext.js";
import { Product } from "@renderer/contexts/ProductsContext.js";
import { useScreenContext } from "@renderer/contexts/ScreenContext.js";
import { State } from "@renderer/utils.js";
import {
  C,
  cls$button,
  cls$button$primary,
  cls$button$secondary,
  cls$scrollbar,
} from "@renderer/utils/classes.js";
import { ComponentProps, useState } from "react";

const cls$button$secondary$selected = C(
  cls$button,
  "bg-cyan-600",
  ...["enabled:hover:bg-cyan-600", "enabled:focus-visible:bg-cyan-600"],
  "text-white",
);
function RadioButtonFieldset<T extends string>(props: {
  className: ComponentProps<"fieldset">["className"];
  values: readonly T[];
  state?: State<T>;
}) {
  const { values, state } = props;
  const [selected, setSelected] = state ?? useState<T>(values[0]);

  const { className } = props;
  const attrs$fieldset: ComponentProps<"fieldset"> = { className };

  const cls$button$radio = (value: T) =>
    C(
      "px-6 py-3",
      value === selected ? cls$button$secondary$selected : cls$button$secondary,
      "transition",
    );
  return (
    <fieldset {...attrs$fieldset}>
      {values.map((value) => (
        <button
          key={value}
          type="button"
          className={cls$button$radio(value)}
          onClick={() => setSelected(value)}
        >
          {value}
        </button>
      ))}
    </fieldset>
  );
}

function CheckboxButtonFieldset<T extends string>(props: {
  className: ComponentProps<"fieldset">["className"];
  values: readonly T[];
  state?: State<Set<T>>;
}) {
  const { values, state } = props;
  const [selection, setSelection] = state ?? useState<Set<T>>(new Set());
  function toggle(value: T) {
    if (selection.has(value)) {
      selection.delete(value);
    } else {
      selection.add(value);
    }
    setSelection(new Set(selection));
  }

  const { className } = props;
  const attrs$fieldset: ComponentProps<"fieldset"> = { className };

  const cls$button$secondary$selected = C(
    cls$button,
    "bg-cyan-600",
    ...["enabled:hover:bg-cyan-600", "enabled:focus-visible:bg-cyan-600"],
    "text-white",
  );
  const cls$button$checkbox = (value: T) =>
    C(
      "px-6 py-3",
      selection.has(value)
        ? cls$button$secondary$selected
        : cls$button$secondary,
      "transition",
    );
  return (
    <fieldset {...attrs$fieldset}>
      {values.map((value) => (
        <button
          key={value}
          type="button"
          className={cls$button$checkbox(value)}
          onClick={() => toggle(value)}
        >
          {value}
        </button>
      ))}
    </fieldset>
  );
}

const cls$button$new = C("px-6 py-3", cls$button$primary, "transition");
function Actions() {
  const { changeProduct } = useProductFormBasisContext();
  const { changeScreen } = useScreenContext();
  const state = useDisplayProductsContext();
  const { sortOrders, sortOrder, setSortOrder } = state;
  const { sortKeys, sortKey, setSortKey } = state;
  const { categories, category, setCategory } = state;

  function newProduct() {
    changeProduct(null);
    changeScreen("product-form");
  }

  return (
    <form className="h-full flex flex-col gap-6 text-sm">
      <section className="grid gap-3">
        <header className="font-head text-2xl">Sort by:</header>
        <RadioButtonFieldset
          className="grid grid-cols-2 gap-3"
          values={sortOrders}
          state={[sortOrder, setSortOrder]}
        />
        <RadioButtonFieldset
          className="flex flex-wrap gap-3"
          values={sortKeys}
          state={[sortKey, setSortKey]}
        />
      </section>
      <section className="grid gap-3">
        <header className="font-head text-2xl">Categories:</header>
        <CheckboxButtonFieldset
          className="flex flex-wrap gap-3"
          values={categories}
          state={[category, setCategory]}
        />
      </section>
      <section className="mt-auto sticky bottom-0 grid">
        <button type="button" className={cls$button$new} onClick={newProduct}>
          New Product
        </button>
      </section>
    </form>
  );
}

const cls$aside = C(cls$scrollbar, "p-3 pt-0");
function ActionList() {
  return (
    <aside className={cls$aside}>
      <Actions />
    </aside>
  );
}

function IMProductList() {
  const { products } = useDisplayProductsContext();
  const { changeProduct } = useProductFormBasisContext();
  const { changeScreen } = useScreenContext();

  function editProduct(product: Product) {
    changeProduct(product);
    changeScreen("product-form");
  }

  return <ProductList products={products} onItemClick={editProduct} />;
}

export function IMScreen() {
  return (
    <DisplayProductsProvider>
      <Screen withLogoutButton withFeaturesButton>
        <section className="overflow-hidden h-full grid grid-cols-[3fr_1fr]">
          <IMProductList />
          <ActionList />
        </section>
      </Screen>
    </DisplayProductsProvider>
  );
}

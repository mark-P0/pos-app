import { ProductList } from "@renderer/components/ProductList.js";
import { Screen } from "@renderer/components/Screen.js";
import {
  C,
  cls$button,
  cls$button$secondary,
} from "@renderer/utils/classes.js";
import { ComponentProps, useState } from "react";

function RadioButtonFieldset<T extends string>(props: {
  className: ComponentProps<"fieldset">["className"];
  values: T[];
}) {
  const { values } = props;
  const [selected, setSelected] = useState<T>(values[0]);

  const { className } = props;
  const attrs$fieldset: ComponentProps<"fieldset"> = { className };

  const cls$button$secondary$selected = C(
    cls$button,
    "bg-cyan-600",
    ...["enabled:hover:bg-cyan-600", "enabled:focus-visible:bg-cyan-600"],
    "text-white",
  );
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

function SortOptions() {
  return (
    <form className="grid gap-6 text-sm">
      <section className="grid gap-3">
        <header className="font-head text-2xl">Sort by:</header>
        <RadioButtonFieldset
          className="grid grid-cols-2 gap-3"
          values={["Ascending", "Descending"]}
        />
        <RadioButtonFieldset
          className="flex flex-wrap gap-3"
          values={["SKU", "Name", "Price", "Category"]}
        />
      </section>
    </form>
  );
}

export function IMScreen() {
  return (
    <Screen withLogoutButton withFeaturesButton>
      <section className="overflow-hidden h-full grid grid-cols-[3fr_1fr]">
        <ProductList />
        <aside className="p-3 pt-0">
          <SortOptions />
        </aside>
      </section>
    </Screen>
  );
}

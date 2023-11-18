import { Screen } from "@renderer/components/Screen.js";
import {
  ProductFormProvider,
  useProductFormContext,
} from "@renderer/contexts/ProductFormContext.js";
import {
  C,
  cls$button$primary,
  cls$card,
  cls$interactiveHoverBg,
} from "@renderer/utils/classes.js";
import { FormEvent } from "react";

const Validators: Record<string, () => Promise<boolean>> = {};
async function runValidations() {
  const validations = Object.values(Validators);
  for (const validation of validations) {
    const status = await validation();
    if (!status) return;
  }
}

const cls$label = C(
  "grid grid-cols-[auto_1fr] items-center gap-3",
  "p-1 pl-3",
  cls$card,
  cls$interactiveHoverBg,
  "transition",
);
const cls$label$textarea = C(
  "flex flex-col gap-3",
  "[&>*:nth-child(2)]:flex-1",
  "p-2 px-3",
  cls$card,
  cls$interactiveHoverBg,
  "transition",
);
const cls$input = C("px-2 py-1", "bg-transparent");

function SKUInput() {
  const { sku, reflectSku } = useProductFormContext();

  return (
    <label className={`${cls$label} col-span-2`}>
      <span className="font-bold">SKU</span>
      <input
        type="text"
        className={cls$input}
        name="sku"
        value={sku}
        onChange={reflectSku}
        required
      />
    </label>
  );
}

function NameInput() {
  const { name, reflectName } = useProductFormContext();

  return (
    <label className={`${cls$label} col-span-2`}>
      <span className="font-bold">Name</span>
      <input
        type="text"
        className={cls$input}
        name="name"
        value={name}
        onChange={reflectName}
        required
      />
    </label>
  );
}

function CategoryInput() {
  const { category, reflectCategory } = useProductFormContext();

  return (
    <label className={`${cls$label} col-span-2`}>
      <span className="font-bold">Category</span>
      <input
        type="text"
        className={cls$input}
        name="category"
        value={category}
        onChange={reflectCategory}
        required
      />
    </label>
  );
}

function PriceInput() {
  const { price, reflectPrice } = useProductFormContext();

  return (
    <label className={cls$label}>
      <span className="font-bold">Price</span>
      <input
        type="number"
        className={cls$input}
        name="price"
        value={price}
        onChange={reflectPrice}
        required
      />
    </label>
  );
}

function StockInput() {
  const { stock, reflectStock } = useProductFormContext();

  return (
    <label className={cls$label}>
      <span className="font-bold">Stock</span>
      <input
        type="number"
        className={cls$input}
        name="stock"
        value={stock}
        onChange={reflectStock}
        required
      />
    </label>
  );
}

function DescriptionTextArea() {
  const { description, reflectDescription } = useProductFormContext();

  return (
    <label
      className={`${cls$label$textarea} col-span-3 row-[span_18_/_span_18]`}
    >
      <span className="font-bold">Description</span>
      <textarea
        className={`${cls$input} resize-none`}
        name="description"
        value={description}
        onChange={reflectDescription}
        required
      ></textarea>
    </label>
  );
}

function Fieldset() {
  return (
    <fieldset className="grid grid-cols-3 gap-3">
      <SKUInput />
      <NameInput />
      <CategoryInput />
      <PriceInput />
      <StockInput />
      <DescriptionTextArea />
      <section className="grid place-items-center col-start-3 row-start-1 row-span-4">
        <code className="bg-red-500 aspect-square h-full">
          product-image-picker
        </code>
      </section>
    </fieldset>
  );
}

function Form() {
  async function trySave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    await runValidations();
    form.reportValidity();
  }

  const cls$button$save = C("px-4 py-1", cls$button$primary, "transition");
  const cls$form = C(
    "h-full flex flex-col [&>*:nth-child(1)]:flex-1 gap-6 p-6 pt-0",
  );
  return (
    <form className={cls$form} onSubmit={trySave}>
      <Fieldset />
      <section className="grid place-items-end">
        <button className={cls$button$save}>Save</button>
      </section>
    </form>
  );
}

export function ProductFormScreen() {
  return (
    <ProductFormProvider>
      <Screen withLogoutButton withFeaturesButton withInventoryManagementButton>
        <Form />
      </Screen>
    </ProductFormProvider>
  );
}

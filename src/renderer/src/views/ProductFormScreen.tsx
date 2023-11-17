import { Screen } from "@renderer/components/Screen.js";
import { ProductFormProvider } from "@renderer/contexts/ProductFormContext.js";
import {
  C,
  cls$button$primary,
  cls$card,
  cls$interactiveHoverBg,
} from "@renderer/utils/classes.js";
import { ChangeEvent, useState } from "react";

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
  const [string, setString] = useState("");
  function reflectString(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    setString(input.value);
  }

  return (
    <label className={`${cls$label} col-span-2`}>
      <span className="font-bold">SKU</span>
      <input
        type="text"
        className={cls$input}
        name="sku"
        value={string}
        onChange={reflectString}
      />
    </label>
  );
}

function NameInput() {
  const [string, setString] = useState("");
  function reflectString(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    setString(input.value);
  }

  return (
    <label className={`${cls$label} col-span-2`}>
      <span className="font-bold">Name</span>
      <input
        type="text"
        className={cls$input}
        name="name"
        value={string}
        onChange={reflectString}
      />
    </label>
  );
}

function CategoryInput() {
  const [string, setString] = useState("");
  function reflectString(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    setString(input.value);
  }

  return (
    <label className={`${cls$label} col-span-2`}>
      <span className="font-bold">Category</span>
      <input
        type="text"
        className={cls$input}
        name="category"
        value={string}
        onChange={reflectString}
      />
    </label>
  );
}

function PriceInput() {
  const [number, setNumber] = useState(0);
  function reflectNumber(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    let newNumber = Number.parseInt(input.value);
    newNumber = Number.isNaN(newNumber) ? 0 : newNumber;
    setNumber(newNumber);
  }

  return (
    <label className={cls$label}>
      <span className="font-bold">Price</span>
      <input
        type="number"
        className={cls$input}
        name="price"
        value={number}
        onChange={reflectNumber}
      />
    </label>
  );
}

function StockInput() {
  const [number, setNumber] = useState(0);
  function reflectNumber(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    let newNumber = Number.parseInt(input.value);
    newNumber = Number.isNaN(newNumber) ? 0 : newNumber;
    setNumber(newNumber);
  }

  return (
    <label className={cls$label}>
      <span className="font-bold">Stock</span>
      <input
        type="number"
        className={cls$input}
        name="stock"
        value={number}
        onChange={reflectNumber}
      />
    </label>
  );
}

function DescriptionTextArea() {
  const [string, setString] = useState("");
  function reflectString(event: ChangeEvent<HTMLTextAreaElement>) {
    const input = event.currentTarget;
    setString(input.value);
  }

  return (
    <label
      className={`${cls$label$textarea} col-span-3 row-[span_18_/_span_18]`}
    >
      <span className="font-bold">Description</span>
      <textarea
        className={`${cls$input} resize-none`}
        name="description"
        value={string}
        onChange={reflectString}
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
  const cls$button$save = C("px-4 py-1", cls$button$primary, "transition");
  return (
    <form className="h-full flex flex-col [&>*:nth-child(1)]:flex-1 gap-6 p-6 pt-0">
      <Fieldset />
      <section className="grid place-items-end">
        <button type="button" className={cls$button$save}>
          Save
        </button>
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

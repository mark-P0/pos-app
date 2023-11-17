import { Screen } from "@renderer/components/Screen.js";
import {
  C,
  cls$card,
  cls$interactiveHoverBg,
} from "@renderer/utils/classes.js";

function ProductForm() {
  const cls$label = C(
    "grid grid-cols-[auto_1fr] items-center gap-3",
    "p-1 pl-3",
    cls$card,
    cls$interactiveHoverBg,
    "transition",
  );
  const cls$label$textarea = C(
    "flex flex-col gap-3",
    "p-2 px-3",
    cls$card,
    cls$interactiveHoverBg,
    "transition",
  );
  const cls$input = C("px-2 py-1", "bg-transparent");
  return (
    <form className="h-full grid grid-cols-3 gap-3 p-6 pt-0">
      <label className={`${cls$label} col-span-2`}>
        <span className="font-bold">SKU</span>
        <input type="text" className={cls$input} name="sku" />
      </label>
      <label className={`${cls$label} col-span-2`}>
        <span className="font-bold">Name</span>
        <input type="text" className={cls$input} name="name" />
      </label>
      <label className={`${cls$label} col-span-2`}>
        <span className="font-bold">Category</span>
        <input type="text" className={cls$input} name="category" />
      </label>
      <label className={cls$label}>
        <span className="font-bold">Price</span>
        <input type="number" className={cls$input} name="price" />
      </label>
      <label className={cls$label}>
        <span className="font-bold">Stock</span>
        <input type="number" className={cls$input} name="stock" />
      </label>
      <label
        className={`${cls$label$textarea} col-span-3 row-[span_18_/_span_18]`}
      >
        <span className="font-bold">Description</span>
        <textarea
          className={`${cls$input} flex-1 resize-none`}
          name="description"
        ></textarea>
      </label>
      <section className="grid place-items-center col-start-3 row-start-1 row-span-4">
        <code className="bg-red-500 aspect-square h-full">
          product-image-picker
        </code>
      </section>
    </form>
  );
}

export function ProductFormScreen() {
  return (
    <Screen withLogoutButton withFeaturesButton withInventoryManagementButton>
      <ProductForm />
    </Screen>
  );
}

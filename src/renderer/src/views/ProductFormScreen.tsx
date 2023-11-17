import { Screen } from "@renderer/components/Screen.js";
import { cls$card, cls$interactiveHoverBg } from "@renderer/utils/classes.js";

function ProductForm() {
  return (
    <form className="h-full grid grid-cols-3 gap-3 p-6 pt-0">
      <label
        className={`grid grid-cols-[auto_1fr] items-center gap-3 p-1 pl-3 ${cls$card} ${cls$interactiveHoverBg} transition col-span-2`}
      >
        <span className="font-bold">SKU</span>
        <input type="text" className="px-2 py-1 bg-transparent" name="sku" />
      </label>
      <label
        className={`grid grid-cols-[auto_1fr] items-center gap-3 p-1 pl-3 ${cls$card} ${cls$interactiveHoverBg} transition col-span-2`}
      >
        <span className="font-bold">Name</span>
        <input type="text" className="px-2 py-1 bg-transparent" name="name" />
      </label>
      <label
        className={`grid grid-cols-[auto_1fr] items-center gap-3 p-1 pl-3 ${cls$card} ${cls$interactiveHoverBg} transition col-span-2`}
      >
        <span className="font-bold">Category</span>
        <input
          type="text"
          className="px-2 py-1 bg-transparent"
          name="category"
        />
      </label>
      <label
        className={`grid grid-cols-[auto_1fr] items-center gap-3 p-1 pl-3 ${cls$card} ${cls$interactiveHoverBg} transition`}
      >
        <span className="font-bold">Price</span>
        <input
          type="number"
          className="px-2 py-1 bg-transparent"
          name="price"
        />
      </label>
      <label
        className={`grid grid-cols-[auto_1fr] items-center gap-3 p-1 pl-3 ${cls$card} ${cls$interactiveHoverBg} transition`}
      >
        <span className="font-bold">Stock</span>
        <input
          type="number"
          className="px-2 py-1 bg-transparent"
          name="stock"
        />
      </label>
      <label
        className={`flex-1 flex flex-col gap-3 p-2 px-3 ${cls$card} ${cls$interactiveHoverBg} transition col-span-3 row-span-6`}
      >
        <span className="font-bold">Description</span>
        <textarea
          className="px-2 py-1 bg-transparent flex-1 resize-none"
          name="description"
        ></textarea>
      </label>
      <section className="col-start-3 row-start-1 row-span-4 grid place-items-center">
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

import { Screen } from "@renderer/components/Screen.js";
import {
  ProductFormProvider,
  useProductFormContext,
} from "@renderer/contexts/ProductFormContext.js";
import { useProductsContext } from "@renderer/contexts/ProductsContext.js";
import { useScreenContext } from "@renderer/contexts/ScreenContext.js";
import { useNewRef } from "@renderer/utils.js";
import {
  C,
  cls$bg,
  cls$button$primary,
  cls$card,
  cls$interactiveHoverBg,
} from "@renderer/utils/classes.js";
import { ChangeEvent, FormEvent, useState } from "react";

const { ipcInvoke } = window.api;

const Validators: Record<string, () => Promise<boolean>> = {};
async function runValidations() {
  const validations = Object.values(Validators);
  for (const validation of validations) {
    const status = await validation();
    if (!status) return;
  }
}

const cls$label = C(cls$card, cls$interactiveHoverBg, "transition");
const cls$label$inline = C(
  cls$label,
  "grid grid-cols-[auto_1fr] items-center gap-3",
  "p-1 pl-3",
);
const cls$label$block = C(
  cls$label,
  "grid grid-rows-[auto_1fr] gap-3",
  "p-2 px-3",
);
const cls$input = C("px-2 py-1", "bg-transparent");
const cls$option = C(cls$bg);
const cls$option$disabled = C(cls$option, "text-amber-400 font-bold");

function SKUInput() {
  const { sku, reflectSku } = useProductFormContext();
  const [inputRef, accessInputRef] = useNewRef<HTMLInputElement>();

  Validators.SKU = async () => {
    const input = accessInputRef();

    const isSKUExisting = await ipcInvoke("db:isSKUExisting", sku);
    if (isSKUExisting) {
      input.setCustomValidity("SKU already exists");
      input.reportValidity();
      return false;
    }

    return true;
  };

  return (
    <label className={`${cls$label$inline} col-span-2`}>
      <span className="font-bold">SKU</span>
      <input
        ref={inputRef}
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
    <label className={`${cls$label$inline} col-span-2`}>
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
  const { categories } = useProductsContext();

  return (
    <label className={`${cls$label$inline} col-span-2`}>
      <span className="font-bold">Category</span>
      <select
        className={cls$input}
        name="category"
        value={category}
        onChange={reflectCategory}
        required
      >
        <option disabled value="" className={cls$option$disabled}>
          Select a category:
        </option>
        {categories.map((category) => (
          <option key={category} value={category} className={cls$option}>
            {category}
          </option>
        ))}
      </select>
    </label>
  );
}

function PriceInput() {
  const { price, reflectPrice } = useProductFormContext();

  return (
    <label className={cls$label$inline}>
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
    <label className={cls$label$inline}>
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
    <label className={`${cls$label$block} col-span-3 row-[span_18_/_span_18]`}>
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

function ImageInput() {
  const [file, setFile] = useState<File | null>(null);
  function reflectFile(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const { files } = input;
    if (files === null || files.length === 0) {
      setFile(null);
      return;
    }
    if (files.length > 1) {
      console.warn("Impossible; multiple selected files detected");
      setFile(null);
      return;
    }
    const file = files[0];
    setFile(file);
  }

  return (
    <label
      className={`${cls$label} grid place-items-center cursor-pointer col-start-3 row-start-1 row-span-4`}
    >
      {file === null && <span className="font-bold">Select an image</span>}
      {file !== null && (
        <figure>
          <figcaption>
            <div className="font-bold">Selected image:</div>
            <div className="text-sm opacity-75">
              (Clear by opening picker and cancelling)
            </div>
          </figcaption>
          <code>{file.name}</code>
        </figure>
      )}
      <input
        type="file"
        name="image"
        /**
         * Input triggered on label clicks
         * - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#examples
         * - https://github.com/mdn/content/blob/382893481d2bfc70264be43da7ea9da51aaeb244/files/en-us/web/html/element/input/file/index.md?plain=1#L276
         */
        className="hidden"
        onChange={reflectFile}
      />
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
      <ImageInput />
    </fieldset>
  );
}

function Form() {
  const { sku, name, category, price, stock, description } =
    useProductFormContext();
  const { changeScreen } = useScreenContext();
  const { reflectProducts } = useProductsContext();

  async function trySave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    await runValidations();
    const isFormValid = form.reportValidity();
    if (!isFormValid) return;
    save();
  }
  async function save() {
    const product = { name, description, sku, category, price, stock };
    ipcInvoke("db:addProduct", product);
    changeScreen("inv-mgmt");
    reflectProducts();
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

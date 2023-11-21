import { ProductCard } from "@renderer/components/ProductCard.js";
import { Prompt } from "@renderer/components/Prompt.js";
import { Screen } from "@renderer/components/Screen.js";
import { useModalContext } from "@renderer/contexts/ModalContext.js";
import { useProductFormBasisContext } from "@renderer/contexts/ProductFormBasisContext.js";
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
  cls$button$secondary,
  cls$card,
  cls$interactiveHoverBg,
} from "@renderer/utils/classes.js";
import { FormEvent } from "react";

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
  const { product } = useProductFormBasisContext();

  Validators.SKU = async () => {
    if (product === null) {
      const isSKUExisting = await ipcInvoke("db:isSKUExisting", sku);
      if (isSKUExisting) {
        const input = accessInputRef();
        input.setCustomValidity("SKU already exists");
        input.reportValidity();
        return false;
      }
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

const cls$span$grid = C(
  "grid gap-3 gap-y-1",
  "[&>*:nth-child(1)]:place-self-end",
  "[&>*:nth-child(2)]:col-start-2",
  "[&>*:nth-child(3)]:col-span-2 ",
);
function ImageInput() {
  const { file, reflectFile } = useProductFormContext();

  const src = file === null ? null : `pos-app:///data/temp/${file.name}`;
  return (
    <label
      className={`${cls$label} grid place-items-center cursor-pointer col-start-3 row-start-1 row-span-4`}
    >
      {file === null && <span className="font-bold">Select an image</span>}
      {src !== null && (
        <span className={cls$span$grid}>
          <span className="font-bold">Selected image:</span>
          <img
            src={src}
            alt="Chosen product image"
            className="h-24 overflow-hidden object-contain"
          />
          <span className="text-center text-sm opacity-75">
            (Clear by opening picker and cancelling)
          </span>
        </span>
      )}
      {/* {src !== null && (
        <span className="grid">
          <span className="flex items-end gap-3">
            <span className="font-bold">Selected image:</span>
            <img
              src={src}
              alt="Chosen product image"
              className="h-24 overflow-hidden object-contain"
            />
          </span>
          <span className="text-center text-sm opacity-75">
            (Clear by opening picker and cancelling)
          </span>
        </span>
      )} */}
      <input
        type="file"
        name="image"
        accept=".png"
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

const cls$div = C("px-3 py-2", cls$card);
const cls$button$confirm = C("px-4 py-1", cls$button$primary, "transition");
function DeletePrompt() {
  const { product } = useProductFormBasisContext();
  const { closeModal } = useModalContext();
  const { changeScreen } = useScreenContext();
  const { reflectProducts } = useProductsContext();

  async function confirm() {
    if (product === null) {
      throw new Error("Impossible; nothing to delete if no product");
    }

    const { sku } = product;
    await ipcInvoke("db:deleteProduct", sku);
    changeScreen("inv-mgmt");
    reflectProducts();
  }

  return (
    <Prompt onClose={closeModal}>
      <>Are you sure you want to delete the following product?</>

      <div className={cls$div}>
        {product !== null && <ProductCard product={product} />}
      </div>

      <>
        <button type="button" className={cls$button$confirm} onClick={confirm}>
          Yes
        </button>
      </>
    </Prompt>
  );
}

const cls$button$save = C("px-4 py-1", cls$button$primary, "transition");
const cls$button$delete = C("px-4 py-1", cls$button$secondary, "transition");
function Buttons() {
  const { product } = useProductFormBasisContext();
  const { showOnModal } = useModalContext();

  function showDeletePrompt() {
    showOnModal(<DeletePrompt />);
  }

  return (
    <footer className="flex flex-row-reverse gap-3">
      <button className={cls$button$save}>Save</button>
      {product !== null && (
        <button
          className={cls$button$delete}
          type="button"
          onClick={showDeletePrompt}
        >
          Delete
        </button>
      )}
    </footer>
  );
}

const cls$form = C(
  "h-full",
  "flex flex-col [&>*:nth-child(1)]:flex-1 gap-6",
  "p-6 pt-0",
);
function Form() {
  const values = useProductFormContext();
  const { sku, name, category, price, stock, description } = values;
  const { moveFileToImagesAsSku } = values;
  const { changeScreen } = useScreenContext();
  const { reflectProducts } = useProductsContext();
  const { product } = useProductFormBasisContext();

  async function trySave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    await runValidations();
    const isFormValid = form.reportValidity();
    if (!isFormValid) return;

    if (product === null) saveNew();
    if (product !== null) saveEdit();
  }
  async function saveNew() {
    const product = { name, description, sku, category, price, stock };
    await ipcInvoke("db:addProduct", product);
    changeScreen("inv-mgmt");
    await reflectProducts();
    moveFileToImagesAsSku();
  }
  async function saveEdit() {
    const url = product?.url ?? null;
    const edited = { name, description, sku, category, price, stock, url };
    await ipcInvoke("db:editProduct", edited);
    changeScreen("inv-mgmt");
    await reflectProducts();
    moveFileToImagesAsSku();
  }

  return (
    <form className={cls$form} onSubmit={trySave}>
      <Fieldset />
      <Buttons />
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

import { sleep } from "@renderer/utils/stdlib-ext.js";
import { ChangeEvent, useEffect, useState } from "react";
import { useProductFormBasisContext } from "./ProductFormBasisContext.js";
import { createNewContext } from "./utils.js";

const { ipcInvoke } = window.api;

type StringInputElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;
function useString<T extends StringInputElement>(initial = "") {
  const [string, setString] = useState(initial);
  function reflectString(event: ChangeEvent<T>) {
    const input = event.currentTarget;
    setString(input.value);
    input.setCustomValidity("");
  }

  return [string, setString, reflectString] as const;
}

function useNumber(initial = 0) {
  const [number, setNumber] = useState(initial);
  function reflectNumber(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    let newNumber = Number.parseInt(input.value);
    newNumber = Number.isNaN(newNumber) ? 0 : newNumber;
    setNumber(newNumber);
    input.setCustomValidity("");
  }

  return [number, setNumber, reflectNumber] as const;
}

function useFile() {
  const [file, setFile] = useState<File | null>(null);
  async function reflectFile(event: ChangeEvent<HTMLInputElement>) {
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
    /**
     * Minor safeguard against "All Files" selection
     * - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#examples
     * - https://github.com/mdn/content/blob/382893481d2bfc70264be43da7ea9da51aaeb244/files/en-us/web/html/element/input/file/index.md?plain=1#L345
     */
    if (file.type !== "image/png") {
      setFile(null);
      return;
    }

    /**
     * `.path` is added specifically by Electron;
     * it is not normally available on `File` objects
     *
     * https://www.electronjs.org/docs/latest/api/file-object
     */
    ipcInvoke("fs:copyFileToTemp", file.path);
    await sleep(250); // Extra time for writing(?)
    setFile(file);
  }

  return { file, setFile, reflectFile };
}

function useProductForm() {
  const [sku, setSku, reflectSku] = useString();
  const [name, setName, reflectName] = useString();
  const [category, setCategory, reflectCategory] = useString();
  const [price, setPrice, reflectPrice] = useNumber();
  const [stock, setStock, reflectStock] = useNumber();
  const [description, setDescription, reflectDescription] = useString();
  const { file, setFile, reflectFile } = useFile();

  async function moveFileToImagesAsSku() {
    if (file === null) {
      throw new Error("File is null");
    }

    const src = file.name;
    const dest = `${sku}.png`;
    await ipcInvoke("fs:moveTempFileToImages", src, dest);
  }

  const { product } = useProductFormBasisContext();
  useEffect(() => {
    if (product === null) return;
    const { sku, name, category, price, stock, description } = product;
    setSku(sku);
    setName(name);
    setCategory(category);
    setPrice(price);
    setStock(stock);
    setDescription(description);

    async function setupFile() {
      const filename = `${sku}.png`;
      const file = new File([], filename); // Only name attribute is important; content not accessed anywhere...
      await ipcInvoke("fs:copyImageFileToTemp", filename);
      setFile(file);
    }
    setupFile();
  }, [product]);

  return {
    ...{ sku, reflectSku },
    ...{ name, reflectName },
    ...{ category, reflectCategory },
    ...{ price, reflectPrice },
    ...{ stock, reflectStock },
    ...{ description, reflectDescription },
    ...{ file, reflectFile },
    moveFileToImagesAsSku,
  };
}

export const [useProductFormContext, ProductFormProvider] =
  createNewContext(useProductForm);

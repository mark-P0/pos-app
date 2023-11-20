import { sleep } from "@renderer/utils/stdlib-ext.js";
import { ChangeEvent, useState } from "react";
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

  return [string, reflectString] as const;
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

  return [number, reflectNumber] as const;
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

  return { file, reflectFile };
}

function useProductForm() {
  const [sku, reflectSku] = useString();
  const [name, reflectName] = useString();
  const [category, reflectCategory] = useString();
  const [price, reflectPrice] = useNumber();
  const [stock, reflectStock] = useNumber();
  const [description, reflectDescription] = useString();
  const { file, reflectFile } = useFile();

  async function moveFileToImagesAsSku() {
    if (file === null) {
      throw new Error("File is null");
    }

    const src = file.name;
    const dest = `${sku}.png`;
    await ipcInvoke("fs:moveTempFileToImages", src, dest);
  }

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

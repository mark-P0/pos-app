import { ChangeEvent, useState } from "react";
import { createNewContext } from "./utils.js";

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

function useProductForm() {
  const [sku, reflectSku] = useString();
  const [name, reflectName] = useString();
  const [category, reflectCategory] = useString();
  const [price, reflectPrice] = useNumber();
  const [stock, reflectStock] = useNumber();
  const [description, reflectDescription] = useString();


  return {
    ...{ sku, reflectSku },
    ...{ name, reflectName },
    ...{ category, reflectCategory },
    ...{ price, reflectPrice },
    ...{ stock, reflectStock },
    ...{ description, reflectDescription },
  };
}

export const [useProductFormContext, ProductFormProvider] =
  createNewContext(useProductForm);

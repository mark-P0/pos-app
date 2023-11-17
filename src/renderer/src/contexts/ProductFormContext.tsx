import { createNewContext } from "./utils.js";

function useProductForm() {}

export const [useProductFormContext, ProductFormProvider] =
  createNewContext(useProductForm);

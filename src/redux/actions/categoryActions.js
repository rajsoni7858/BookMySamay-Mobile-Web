import { CATEGORY } from "../action-types";

// LOAD
export const loadCategory = (params) => ({
  type: CATEGORY.LOAD,
  params,
});

export const loadCategorySucceeded = (data) => ({
  type: CATEGORY.LOAD_SUCCEEDED,
  data,
});

export const loadCategoryFailed = (error) => ({
  type: CATEGORY.LOAD_FAILED,
  error,
});

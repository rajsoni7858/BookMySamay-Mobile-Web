import { IMAGE } from "../action-types";

// DELETE
export const deleteImage = (params) => ({
  type: IMAGE.DELETE,
  params,
});

export const deleteImageSucceeded = (data) => ({
  type: IMAGE.DELETE_SUCCEEDED,
  data,
});

export const deleteImageFailed = (error) => ({
  type: IMAGE.DELETE_FAILED,
  error,
});

import { LOCATION } from "../action-types";

// LOAD
export const loadSearchLocation = (params) => ({
  type: LOCATION.SEARCH_LOAD,
  params,
});

export const loadSearchLocationSucceeded = (data) => ({
  type: LOCATION.SEARCH_LOAD_SUCCEEDED,
  data,
});

export const loadSearchLocationFailed = (error) => ({
  type: LOCATION.SEARCH_LOAD_FAILED,
  error,
});

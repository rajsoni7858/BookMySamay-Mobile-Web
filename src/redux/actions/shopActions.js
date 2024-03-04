import { SHOP } from "../action-types";

// LOAD
export const loadShops = (params) => ({
  type: SHOP.LOAD,
  params,
});

export const loadShopsSucceeded = (data) => ({
  type: SHOP.LOAD_SUCCEEDED,
  data,
});

export const loadShopsFailed = (error) => ({
  type: SHOP.LOAD_FAILED,
  error,
});

// UPDATE SHOP
export const updateShop = (params) => ({
  type: SHOP.UPDATE,
  params,
});

export const updateShopSucceeded = (data) => ({
  type: SHOP.UPDATE_SUCCEEDED,
  data,
});

export const updateShopFailed = (error) => ({
  type: SHOP.UPDATE_FAILED,
  error,
});

// SAVE SHOP
export const saveShop = (params) => ({
  type: SHOP.SAVE,
  params,
});

export const saveShopSucceeded = (data) => ({
  type: SHOP.SAVE_SUCCEEDED,
  data,
});

export const saveShopFailed = (error) => ({
  type: SHOP.SAVE_FAILED,
  error,
});

import { SHOP } from "../../action-types";

const initialShopLoadingState = false;

const ShopLoadingReducer = (state = initialShopLoadingState, action = {}) => {
  switch (action.type) {
    case SHOP.LOAD_SHOP:
      return true;
    case SHOP.LOAD_SHOP_SUCCEEDED:
      return false;
    case SHOP.LOAD_SHOP_FAILED:
      return false;
    default:
      return state;
  }
};

export default ShopLoadingReducer;

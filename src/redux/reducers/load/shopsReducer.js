import { SHOP } from "../../action-types";

const initialShopLoadingState = false;

const ShopsLoadingReducer = (state = initialShopLoadingState, action = {}) => {
  switch (action.type) {
    case SHOP.LOAD:
      return true;
    case SHOP.LOAD_SUCCEEDED:
      return false;
    case SHOP.LOAD_FAILED:
      return false;
    default:
      return state;
  }
};

export default ShopsLoadingReducer;

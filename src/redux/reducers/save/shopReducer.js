import { SHOP } from "../../action-types";

const initialShopSavingState = false;

const shopSavingReducer = (state = initialShopSavingState, action = {}) => {
  switch (action.type) {
    case SHOP.SAVE:
      return true;
    case SHOP.SAVE_SUCCEEDED:
      return false;
    case SHOP.SAVE_FAILED:
      return false;
    default:
      return state;
  }
};

export default shopSavingReducer;

import { SHOP } from "../../action-types";

const initialStaffUpdatingState = false;

const ShopUpdatingReducer = (
  state = initialStaffUpdatingState,
  action = {}
) => {
  switch (action.type) {
    case SHOP.UPDATE:
      return true;
    case SHOP.UPDATE_SUCCEEDED:
      return false;
    case SHOP.UPDATE_FAILED:
      return false;
    default:
      return state;
  }
};

export default ShopUpdatingReducer;

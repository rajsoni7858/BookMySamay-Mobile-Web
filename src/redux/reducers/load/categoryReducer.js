import { CATEGORY } from "../../action-types";

const initialCategoryLoadingState = false;

const CategoryLoadingReducer = (
  state = initialCategoryLoadingState,
  action = {}
) => {
  switch (action.type) {
    case CATEGORY.LOAD:
      return true;
    case CATEGORY.LOAD_SUCCEEDED:
      return false;
    case CATEGORY.LOAD_FAILED:
      return false;
    default:
      return state;
  }
};

export default CategoryLoadingReducer;

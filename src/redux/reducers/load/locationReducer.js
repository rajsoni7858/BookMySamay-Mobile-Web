import { LOCATION } from "../../action-types";

const initialSearchlocationLoadingState = false;

const SearchlocationLoadingReducer = (
  state = initialSearchlocationLoadingState,
  action = {}
) => {
  switch (action.type) {
    case LOCATION.SEARCH_LOAD:
      return true;
    case LOCATION.SEARCH_LOAD_SUCCEEDED:
      return false;
    case LOCATION.SEARCH_LOAD_FAILED:
      return false;
    default:
      return state;
  }
};

export default SearchlocationLoadingReducer;

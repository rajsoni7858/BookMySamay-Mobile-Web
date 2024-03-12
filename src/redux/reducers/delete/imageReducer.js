import { IMAGE } from "../../action-types";

const initialImageDeletingState = false;

const ImageDeletingReducer = (
  state = initialImageDeletingState,
  action = {}
) => {
  switch (action.type) {
    case IMAGE.DELETE:
      return true;
    case IMAGE.DELETE_SUCCEEDED:
      return false;
    case IMAGE.DELETE_FAILED:
      return false;
    default:
      return state;
  }
};

export default ImageDeletingReducer;

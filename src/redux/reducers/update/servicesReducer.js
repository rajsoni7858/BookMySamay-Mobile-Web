import { SERVICES } from "../../action-types";

const initialServicesUpdatingState = false;

const ServicesUpdatingReducer = (
  state = initialServicesUpdatingState,
  action = {}
) => {
  switch (action.type) {
    case SERVICES.UPDATE:
      return true;
    case SERVICES.UPDATE_SUCCEEDED:
      return false;
    case SERVICES.UPDATE_FAILED:
      return false;
    default:
      return state;
  }
};

export default ServicesUpdatingReducer;

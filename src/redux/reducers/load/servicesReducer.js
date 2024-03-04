import { SERVICES } from "../../action-types";

const initialServicesLoadingState = false;

const ServicesLoadingReducer = (
  state = initialServicesLoadingState,
  action = {}
) => {
  switch (action.type) {
    case SERVICES.LOAD:
      return true;
    case SERVICES.LOAD_SUCCEEDED:
      return false;
    case SERVICES.LOAD_FAILED:
      return false;
    default:
      return state;
  }
};

export default ServicesLoadingReducer;

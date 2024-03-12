import { SERVICES } from "../../action-types";

const initialServicesLoadingState = {
  menServices: [],
  womenServices: [],
  packages: [],
};

const ServicesLoadingReducer = (
  state = initialServicesLoadingState,
  action = {}
) => {
  switch (action.type) {
    case SERVICES.LOAD:
      return {
        ...state,
        menServices: [],
        womenServices: [],
        packages: [],
      };
    case SERVICES.LOAD_SUCCEEDED:
      return {
        ...state,
        menServices: action.data.menServices,
        womenServices: action.data.womenServices,
        packages: action.data.packages,
      };
    case SERVICES.LOAD_FAILED:
      return {
        ...state,
        menServices: [],
        womenServices: [],
        packages: [],
      };
    default:
      return state;
  }
};

export default ServicesLoadingReducer;

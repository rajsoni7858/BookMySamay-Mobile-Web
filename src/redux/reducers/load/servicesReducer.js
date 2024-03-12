import { SERVICES } from "../../action-types";

const initialServicesLoadingState = {
  loading: false,
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
        loading: true,
        menServices: [],
        womenServices: [],
        packages: [],
      };
    case SERVICES.LOAD_SUCCEEDED:
      return {
        ...state,
        loading: false,
        menServices: action.data.menServices,
        womenServices: action.data.womenServices,
        packages: action.data.packages,
      };
    case SERVICES.LOAD_FAILED:
      return {
        ...state,
        loading: false,
        menServices: [],
        womenServices: [],
        packages: [],
      };
    default:
      return state;
  }
};

export default ServicesLoadingReducer;

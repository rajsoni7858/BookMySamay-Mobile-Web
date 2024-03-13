import { SERVICES } from "../../action-types";

const initialServiceSavingState = {
  service: null,
  type: null,
};

const ServiceSavingReducer = (
  state = initialServiceSavingState,
  action = {}
) => {
  switch (action.type) {
    case SERVICES.SAVE:
      return {
        ...state,
        type: action.data?.type,
        service: action.data?.service,
      };
    default:
      return state;
  }
};

export default ServiceSavingReducer;

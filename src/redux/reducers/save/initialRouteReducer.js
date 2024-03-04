import {ROUTE} from '../../action-types';

const initialRouteState = {
  initialRoute: null,
};

const initialRouteReducer = (state = initialRouteState, action = {}) => {
  switch (action.type) {
    case ROUTE.SAVE:
      return {
        ...state,
        initialRoute: null,
      };
    case ROUTE.SAVE_SUCCEEDED:
      return {
        ...state,
        initialRoute: action.data,
      };
    case ROUTE.SAVE_FAILED:
      return {
        ...state,
        initialRoute: null,
      };
    default:
      return state;
  }
};

export default initialRouteReducer;

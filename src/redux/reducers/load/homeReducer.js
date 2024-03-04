import {HOME} from '../../action-types';

const initialHomeLoadingState = {
  loading: false,
  data: null,
};

const HomeLoadingReducer = (state = initialHomeLoadingState, action = {}) => {
  switch (action.type) {
    case HOME.LOAD:
      return {
        ...state,
        loading: true,
      };
    case HOME.LOAD_SUCCEEDED:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case HOME.LOAD_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
      };
    default:
      return state;
  }
};

export default HomeLoadingReducer;

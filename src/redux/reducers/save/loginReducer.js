import {LOGIN} from '../../action-types';

const initialLoginState = false;

const LoginReducer = (state = initialLoginState, action = {}) => {
  switch (action.type) {
    case LOGIN.GET_OTP:
      return true;
    case LOGIN.GET_OTP_SUCCEEDED:
      return false;
    case LOGIN.GET_OTP_FAILED:
      return false;
    default:
      return state;
  }
};

export default LoginReducer;

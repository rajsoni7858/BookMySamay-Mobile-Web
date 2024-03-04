import {OTP} from '../../action-types';

const initialOtpState = {
  isLoggedIn: false,
};

const otpReducer = (state = initialOtpState, action = {}) => {
  switch (action.type) {
    case OTP.VERIFY_OTP:
      return {
        ...state,
        isLoggedIn: false,
      };
    case OTP.VERIFY_OTP_SUCCEEDED:
      return {
        ...state,
        isLoggedIn: true,
      };
    case OTP.VERIFY_OTP_FAILED:
      return {
        ...state,
        isLoggedIn: false,
      };
    case OTP.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default otpReducer;

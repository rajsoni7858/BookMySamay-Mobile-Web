import {OTP} from '../action-types';

export const verifyOtp = params => ({
  type: OTP.VERIFY_OTP,
  params,
});

export const verifyOtpSucceeded = data => ({
  type: OTP.VERIFY_OTP_SUCCEEDED,
  data,
});

export const verifyOtpFailed = error => ({
  type: OTP.VERIFY_OTP_FAILED,
  error,
});

export const logout = () => ({
  type: OTP.LOGOUT,
});

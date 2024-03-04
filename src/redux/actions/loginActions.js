import {LOGIN} from '../action-types';

export const getOtp = params => ({
  type: LOGIN.GET_OTP,
  params,
});

export const getOtpSucceeded = data => ({
  type: LOGIN.GET_OTP_SUCCEEDED,
  data,
});

export const getOtpFailed = error => ({
  type: LOGIN.GET_OTP_FAILED,
  error,
});

// Resend
export const resendOtp = params => ({
  type: LOGIN.RESEND_OTP,
  params,
});

export const resendOtpSucceeded = data => ({
  type: LOGIN.RESEND_OTP_SUCCEEDED,
  data,
});

export const resendOtpFailed = error => ({
  type: LOGIN.RESEND_OTP_FAILED,
  error,
});

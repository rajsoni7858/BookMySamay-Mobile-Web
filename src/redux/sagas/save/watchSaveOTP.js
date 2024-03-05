import { call, put, take } from "redux-saga/effects";
import { OTP } from "../../action-types";
import { verifyOtpFailed, verifyOtpSucceeded } from "../../actions";
import saveAPI from "../../../apis/saveAPI";

function* processSaveOTP(params) {
  const { data, onSuccess, onFailure } = params;

  try {
    const response = yield call(saveAPI, "admin/auth/verify-otp", data);

    if (response.status === 200 && response.data.success) {
      yield put(verifyOtpSucceeded());
      yield call(onSuccess, response.data);
    } else {
      yield put(verifyOtpFailed());
      yield call(onFailure, response.statusText);
    }
  } catch (error) {
    yield put(verifyOtpFailed());
    yield call(onFailure, error);
  }
}

export default function* watchSaveOTP() {
  while (true) {
    const { params } = yield take(OTP.VERIFY_OTP);
    yield call(processSaveOTP, params);
  }
}

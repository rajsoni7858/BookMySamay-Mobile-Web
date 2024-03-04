import {call, put, take} from 'redux-saga/effects';
import {LOGIN} from '../../action-types';
import {getOtpFailed, getOtpSucceeded} from '../../actions';
import saveAPI from '../../../apis/saveAPI';

function* processSaveLogin(params) {
  const {data, onSuccess, onFailure} = params;

  try {
    const response = yield call(saveAPI, 'auth/staff/login', data);

    if (response.status === 200 && response.data.success) {
      yield put(getOtpSucceeded());
      yield call(onSuccess, response.data);
    } else {
      yield put(getOtpFailed());
      yield call(onFailure, response.data);
    }
  } catch (error) {
    yield put(getOtpFailed());
    yield call(onFailure, error);
  }
}

export default function* watchSaveLogin() {
  while (true) {
    const {params} = yield take(LOGIN.GET_OTP);
    yield call(processSaveLogin, params);
  }
}

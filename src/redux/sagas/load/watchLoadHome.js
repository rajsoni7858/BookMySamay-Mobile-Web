import {call, put, take} from 'redux-saga/effects';
import loadAPI from '../../../apis/loadAPI';
import {HOME} from '../../action-types';
import {loadHomeFailed, loadHomeSucceeded} from '../../actions';

function* processLoadHome(params) {
  const {onSuccess, onFailure} = params;

  try {
    const response = yield call(loadAPI, 'staff/home-details');

    if (response.status === 200 && response.data.success) {
      yield put(loadHomeSucceeded(response.data.homeDetails));
      yield call(onSuccess, response.data.homeDetails);
    } else {
      yield put(loadHomeFailed());
      yield call(onFailure, response.statusText);
    }
  } catch (error) {
    yield put(loadHomeFailed());
    yield call(onFailure, error);
  }
}

export default function* watchLoadHome() {
  while (true) {
    const {params} = yield take(HOME.LOAD);
    yield call(processLoadHome, params);
  }
}

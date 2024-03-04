import { call, put, take } from "redux-saga/effects";
import loadAPI from "../../../apis/loadAPI";
import { SERVICES } from "../../action-types";
import { loadServicesFailed, loadServicesSucceeded } from "../../actions";

function* processLoadServices(params) {
  const { onSuccess, onFailure } = params;

  try {
    const response = yield call(loadAPI, "api/admin/shops/1/services");

    if (response.status === 200 && response.data.success) {
      yield put(loadServicesSucceeded());
      yield call(onSuccess, response.data.services);
    } else {
      yield put(loadServicesFailed());
      yield call(onFailure, response.statusText);
    }
  } catch (error) {
    yield put(loadServicesFailed());
    yield call(onFailure, error);
  }
}

export default function* watchLoadServices() {
  while (true) {
    const { params } = yield take(SERVICES.LOAD);
    yield call(processLoadServices, params);
  }
}

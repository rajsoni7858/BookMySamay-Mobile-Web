import { call, put, take } from "redux-saga/effects";
import loadAPI from "../../../apis/loadAPI";
import { SERVICES } from "../../action-types";
import { loadServicesFailed, loadServicesSucceeded } from "../../actions";

function* processLoadServices(params) {
  const { fetchParams, onSuccess, onFailure } = params;

  try {
    const response = yield call(
      loadAPI,
      `admin/shops/${fetchParams.id}/services`
    );

    if (response.status === 200 && response.data.success) {
      yield put(loadServicesSucceeded(response.data.shopInfo));
      yield call(onSuccess, response.data.shopInfo);
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

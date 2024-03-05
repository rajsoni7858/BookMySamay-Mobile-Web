import { call, put, take } from "redux-saga/effects";
import { SERVICES } from "../../action-types";
import { updateServicesFailed, updateServicesSucceeded } from "../../actions";
import updateAPI from "../../../apis/updateAPI";

function* processUpdateServices(params) {
  const { data, onSuccess, onFailure } = params;

  try {
    const response = yield call(updateAPI, "admin/shops/services", data);

    if (response.status === 200 && response.data.success) {
      yield put(updateServicesSucceeded());
      yield call(onSuccess, response.data);
    } else {
      yield put(updateServicesFailed());
      yield call(onFailure, response.statusText);
    }
  } catch (error) {
    yield put(updateServicesFailed());
    yield call(onFailure, error);
  }
}

export default function* watchUpdateServices() {
  while (true) {
    const { params } = yield take(SERVICES.UPDATE);
    yield call(processUpdateServices, params);
  }
}

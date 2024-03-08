import { call, put, take } from "redux-saga/effects";
import searchAPI from "../../../apis/searchAPI";
import { LOCATION } from "../../action-types";
import {
  loadSearchLocationFailed,
  loadSearchLocationSucceeded,
} from "../../actions";

function* processLoadSearchLocation(params) {
  const { fetchParams, onSuccess, onFailure } = params;

  try {
    const response = yield call(
      searchAPI,
      `admin/locations/search?${fetchParams.url}`,
      fetchParams
    );

    if (response.status === 200 && response.data.success) {
      yield put(loadSearchLocationSucceeded());
      yield call(onSuccess, response.data.locations);
    } else {
      yield put(loadSearchLocationFailed());
      yield call(onFailure, response.statusText);
    }
  } catch (error) {
    yield put(loadSearchLocationFailed());
    yield call(onFailure, error);
  }
}

export default function* watchLoadSearchLocation() {
  while (true) {
    const { params } = yield take(LOCATION.SEARCH_LOAD);
    yield call(processLoadSearchLocation, params);
  }
}

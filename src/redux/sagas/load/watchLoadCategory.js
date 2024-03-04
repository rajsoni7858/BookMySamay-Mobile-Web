import { call, put, take } from "redux-saga/effects";
import loadAPI from "../../../apis/loadAPI";
import { CATEGORY } from "../../action-types";
import { loadCategoryFailed, loadCategorySucceeded } from "../../actions";

function* processLoadCategory(params) {
  const { onSuccess, onFailure } = params;

  try {
    const response = yield call(loadAPI, "api/admin/categories");

    if (response.status === 200 && response.data.success) {
      yield put(loadCategorySucceeded());
      yield call(onSuccess, response.data.categories);
    } else {
      yield put(loadCategoryFailed());
      yield call(onFailure, response.statusText);
    }
  } catch (error) {
    yield put(loadCategoryFailed());
    yield call(onFailure, error);
  }
}

export default function* watchLoadCategory() {
  while (true) {
    const { params } = yield take(CATEGORY.LOAD);
    yield call(processLoadCategory, params);
  }
}

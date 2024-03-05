import { call, put, take } from "redux-saga/effects";
import loadAPI from "../../../apis/loadAPI";
import { SHOP } from "../../action-types";
import { loadShopsFailed, loadShopsSucceeded } from "../../actions";

function* processLoadShops(params) {
  const { onSuccess, onFailure } = params;

  try {
    const response = yield call(loadAPI, "admin/shops");

    if (response.status === 200 && response.data.success) {
      yield put(loadShopsSucceeded());
      yield call(onSuccess, response.data.shops);
    } else {
      yield put(loadShopsFailed());
      yield call(onFailure, response.statusText);
    }
  } catch (error) {
    yield put(loadShopsFailed());
    yield call(onFailure, error);
  }
}

export default function* watchLoadShops() {
  while (true) {
    const { params } = yield take(SHOP.LOAD);
    yield call(processLoadShops, params);
  }
}

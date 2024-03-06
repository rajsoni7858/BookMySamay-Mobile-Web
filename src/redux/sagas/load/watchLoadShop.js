import { call, put, take } from "redux-saga/effects";
import loadAPI from "../../../apis/loadAPI";
import { SHOP } from "../../action-types";
import { loadShopFailed, loadShopSucceeded } from "../../actions";

function* processLoadShop(params) {
  const { fetchParams, onSuccess, onFailure } = params;

  try {
    const response = yield call(loadAPI, `admin/shops/${fetchParams.id}`);

    if (response.status === 200 && response.data.success) {
      yield put(loadShopSucceeded());
      yield call(onSuccess, response.data.shop);
    } else {
      yield put(loadShopFailed());
      yield call(onFailure, response.statusText);
    }
  } catch (error) {
    yield put(loadShopFailed());
    yield call(onFailure, error);
  }
}

export default function* watchLoadShop() {
  while (true) {
    const { params } = yield take(SHOP.LOAD_SHOP);
    yield call(processLoadShop, params);
  }
}

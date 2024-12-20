import { call, put, take } from "redux-saga/effects";
import { SHOP } from "../../action-types";
import { updateShopFailed, updateShopSucceeded } from "../../actions";
import updateAPI from "../../../apis/updateAPI";

function* processUpdateShop(params) {
  const { data, onSuccess, onFailure } = params;

  try {
    const response = yield call(updateAPI, "admin/shops", data);

    if (response.status === 200 && response.data.success) {
      yield put(updateShopSucceeded());
      yield call(onSuccess, response.data);
    } else {
      yield put(updateShopFailed());
      yield call(onFailure, response.data);
    }
  } catch (error) {
    yield put(updateShopFailed());
    yield call(onFailure, error);
  }
}

export default function* watchUpdateShop() {
  while (true) {
    const { params } = yield take(SHOP.UPDATE);
    yield call(processUpdateShop, params);
  }
}

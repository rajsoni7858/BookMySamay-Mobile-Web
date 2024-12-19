import { call, put, take } from "redux-saga/effects";
import { SHOP } from "../../action-types";
import { saveShopFailed, saveShopSucceeded } from "../../actions";
import saveAPI from "../../../apis/saveAPI";

function* processSaveShop(params) {
  const { data, onSuccess, onFailure } = params;

  delete data.owner_name;
  delete data.mobile_number;

  try {
    const response = yield call(saveAPI, "admin/shops", data);

    if (response.status === 200 && response.data.success) {
      yield put(saveShopSucceeded());
      yield call(
        onSuccess,
        response.data.success ? response.data.shop : response.data
      );
    } else {
      yield put(saveShopFailed());
      yield call(onFailure, response.statusText);
    }
  } catch (error) {
    yield put(saveShopFailed());
    yield call(onFailure, error);
  }
}

export default function* watchSaveShop() {
  while (true) {
    const { params } = yield take(SHOP.SAVE);
    yield call(processSaveShop, params);
  }
}

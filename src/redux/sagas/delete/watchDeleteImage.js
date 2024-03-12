import { call, put, take } from "redux-saga/effects";
import { IMAGE } from "../../action-types";
import { deleteImageFailed, deleteImageSucceeded } from "../../actions";
import deleteAPI from "../../../apis/deleteAPI";

function* processDeleteImage(params) {
  const { data, onSuccess, onFailure } = params;

  try {
    const response = yield call(
      deleteAPI,
      `admin/shops/${data.id}/images/${data.imgId}`,
      data
    );

    if (response.status === 200 && response.data.success) {
      yield put(deleteImageSucceeded());
      yield call(onSuccess, response.data);
    } else {
      yield put(deleteImageFailed());
      yield call(onFailure, response.statusText);
    }
  } catch (error) {
    yield put(deleteImageFailed());
    yield call(onFailure, error);
  }
}

export default function* watchDeleteImage() {
  while (true) {
    const { params } = yield take(IMAGE.DELETE);
    yield call(processDeleteImage, params);
  }
}

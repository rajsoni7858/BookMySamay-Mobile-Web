// rootSaga.js
import { all } from "redux-saga/effects";
import watchLoadHome from "./sagas/load/watchLoadHome";
import watchSaveLogin from "./sagas/save/watchSaveLogin";
import watchSaveOTP from "./sagas/save/watchSaveOTP";
import watchLoadCategory from "./sagas/load/watchLoadCategory";
import watchLoadServices from "./sagas/load/watchLoadServices";
import watchLoadShops from "./sagas/load/watchLoadShops";
import watchSaveShop from "./sagas/save/watchSaveShop";
import watchUpdateShop from "./sagas/update/watchUpdateShop";
import watchUpdateServices from "./sagas/update/watchUpdateServices";
import watchLoadShop from "./sagas/load/watchLoadShop";
import watchLoadSearchLocation from "./sagas/load/watchLoadSearchLocation";
import watchDeleteImage from "./sagas/delete/watchDeleteImage";

// Combine all sagas into the root saga
export default function* rootSaga() {
  yield all([
    watchLoadHome(),
    watchLoadCategory(),
    watchLoadServices(),
    watchLoadShops(),
    watchLoadShop(),
    watchLoadSearchLocation(),
    watchSaveShop(),
    watchUpdateShop(),
    watchUpdateServices(),
    watchSaveLogin(),
    watchSaveOTP(),
    watchDeleteImage(),
  ]);
}

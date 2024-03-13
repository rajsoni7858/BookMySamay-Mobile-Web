import { call, put, take } from "redux-saga/effects";
import loadAPI from "../../../apis/loadAPI";
import { SERVICES } from "../../action-types";
import { loadServicesFailed, loadServicesSucceeded } from "../../actions";

function updateSelectedCountsAndAddShopId(services, id) {
  return services.map((service) => ({
    ...service,
    selected_count: service.type.filter((item) => item.selected).length,
    type: service.type.map((item) => ({
      ...item,
      shop_id: parseInt(id),
    })),
  }));
}

function* processLoadServices(params) {
  const { fetchParams, onSuccess, onFailure } = params;

  try {
    const response = yield call(
      loadAPI,
      `admin/shops/${fetchParams.id}/services`
    );

    if (response.status === 200 && response.data.success) {
      const updatedShopInfo = { ...response.data.shopInfo };
      updatedShopInfo.menServices = updateSelectedCountsAndAddShopId(
        updatedShopInfo.menServices,
        fetchParams.id
      );
      updatedShopInfo.womenServices = updateSelectedCountsAndAddShopId(
        updatedShopInfo.womenServices,
        fetchParams.id
      );
      yield put(loadServicesSucceeded(updatedShopInfo));
      yield call(onSuccess, updatedShopInfo);
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

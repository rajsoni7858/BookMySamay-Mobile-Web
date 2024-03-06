import { combineReducers } from "@reduxjs/toolkit";
import HomeLoadingReducer from "./load/homeReducer";
import LoginReducer from "./save/loginReducer";
import otpReducer from "./save/otpReducer";
import initialRouteReducer from "./save/initialRouteReducer";
import CategoryLoadingReducer from "./load/categoryReducer";
import ShopLoadingReducer from "./load/shopReducer";
import ServicesLoadingReducer from "./load/servicesReducer";
import shopSavingReducer from "./save/shopReducer";
import ShopUpdatingReducer from "./update/shopReducer";
import ServicesUpdatingReducer from "./update/servicesReducer";
import ShopsLoadingReducer from "./load/shopsReducer";

const rootReducer = combineReducers({
  LoadHome: HomeLoadingReducer,
  LoadCategory: CategoryLoadingReducer,
  LoadShops: ShopsLoadingReducer,
  LoadShop: ShopLoadingReducer,
  LoadServices: ServicesLoadingReducer,
  SaveLogin: LoginReducer,
  SaveOTP: otpReducer,
  SaveInitialRoute: initialRouteReducer,
  SaveShop: shopSavingReducer,
  UpdateShop: ShopUpdatingReducer,
  UpdateServices: ServicesUpdatingReducer,
});

export default rootReducer;

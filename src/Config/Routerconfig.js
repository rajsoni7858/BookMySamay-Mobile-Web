import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../Pages/DashboardComponent";
import Shop from "../Pages/ShopComponent/ShopComponent.jsx";
import User from "../Pages/UserComponent.jsx";
import Editshop from "../Pages/ShopComponent/EditShopComponent.jsx";
import AddShop from "../Pages/ShopComponent/AddShopComponent.jsx";

function Routerconfig() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/shop" component={Shop} />
      <Route path="/editshop/:id" component={Editshop} />
      <Route path="/addshop" component={AddShop} />
      <Route path="/user" component={User} />
    </Switch>
  );
}
export default Routerconfig;

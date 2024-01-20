import React from "react";
import { Switch, Route } from "react-router-dom";
import Shop from "../Pages/ShopComponent/ShopComponent.jsx";
import User from "../Pages/UserComponent.jsx";
import Editshop from "../Pages/ShopComponent/EditShopComponent.jsx";
import AddShop from "../Pages/ShopComponent/AddShopComponent.jsx";
import Dashboard from "../Pages/Dashboard/DashboardComponent.jsx";

function Routerconfig() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/shop" component={Shop} />
      <Route path="/editshop/:id" component={Editshop} />
      <Route path="/addshop" component={AddShop} />
      <Route path="/user" component={User} />
      <Route path="/" component={Dashboard} />
    </Switch>
  );
}
export default Routerconfig;

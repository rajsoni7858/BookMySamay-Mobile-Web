import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/DashboardComponent.jsx";
import UsersComponent from "../Pages/Users/UsersComponent.jsx";
import AddShopComponent from "../Pages/ShopComponent/Components/AddShopComponent.jsx";
import EditshopComponent from "../Pages/ShopComponent/Components/EditShopComponent.jsx";
import ShopsComponent from "../Pages/ShopComponent/ShopsComponent.jsx";

function Routerconfig() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/shops" component={ShopsComponent} />
      <Route path="/addshop" component={AddShopComponent} />
      <Route path="/editshop/:id" component={EditshopComponent} />
      <Route path="/users" component={UsersComponent} />
      <Route path="/" component={Dashboard} />
    </Switch>
  );
}
export default Routerconfig;

import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/DashboardComponent.jsx";
import UsersComponent from "../Pages/Users/UsersComponent.jsx";
import ShopsComponent from "../Pages/Shops/ShopsComponent.jsx";
import AddShopComponent from "../Pages/Shops/Components/AddShopComponent.jsx";
import EditshopComponent from "../Pages/Shops/Components/EditShopComponent.jsx";

function Routerconfig() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route exact path="/shops" component={ShopsComponent} />
      <Route path="/shops/addshop" component={AddShopComponent} />
      <Route path="/shops/editshop/:id" component={EditshopComponent} />
      <Route path="/users" component={UsersComponent} />
      <Route path="/" component={Dashboard} />
    </Switch>
  );
}
export default Routerconfig;

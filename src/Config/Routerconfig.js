import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginForm from "../Pages/Login/LoginComponent";
import Dashboard from "../Pages/Dashboard/DashboardComponent.jsx";
import UsersComponent from "../Pages/Users/UsersComponent.jsx";
import ShopsComponent from "../Pages/Shops/ShopsComponent.jsx";
import AddShopComponent from "../Pages/Shops/Components/AddShopComponent.jsx";
import EditshopComponent from "../Pages/Shops/Components/EditShopComponent.jsx";
import ServicesComponent from "../Pages/Shops/ServicesComponent.jsx";

function Routerconfig() {
  return (
    <Switch>
      <Route path="/" exact={true} component={LoginForm} />
      <Route path="/login" exact={true} component={LoginForm} />
      <Route path="/dashboard" component={Dashboard} />
      <Route exact path="/shops" component={ShopsComponent} />
      <Route path="/shops/addshop" component={AddShopComponent} />
      <Route path="/shops/editshop/:id" component={EditshopComponent} />
      <Route exact path="/shops/services" component={ServicesComponent} />
      <Route path="/users" component={UsersComponent} />
    </Switch>
  );
}
export default Routerconfig;

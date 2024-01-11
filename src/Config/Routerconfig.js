import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Shop from "../Pages/Shop.js";
import User from "../Pages/User.js";

function Routerconfig() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/shop" component={Shop} />
      <Route path="/user" component={User} />
    </Switch>
  );
}
export default Routerconfig;

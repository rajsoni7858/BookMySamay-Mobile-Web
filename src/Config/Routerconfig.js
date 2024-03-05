import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginForm from "../Pages/Login/LoginComponent";

function Routerconfig() {
  return (
    <Switch>
      <Route path="/" exact={true} component={LoginForm} />
      <Route path="/login" exact={true} component={LoginForm} />
      <Redirect to="/login" />
    </Switch>
  );
}
export default Routerconfig;

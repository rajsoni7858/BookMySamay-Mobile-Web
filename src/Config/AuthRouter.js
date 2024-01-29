import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "../Pages/Login/LoginComponent";

const AuthRouterconfig = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={LoginForm} />
      <Route path="/login" exact={true} component={LoginForm} />
      <Redirect from="/" to="/login" />
    </Switch>
  );
};

export default AuthRouterconfig;

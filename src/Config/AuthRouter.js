import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "../Pages/Login/LoginComponent";

const AuthRouterconfig = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={LoginForm} />
      <Route path="/login" exact={true} component={LoginForm} />
    </Switch>
  );
};

export default AuthRouterconfig;

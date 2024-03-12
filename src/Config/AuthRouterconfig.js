import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/DashboardComponent.jsx";
import UsersComponent from "../Pages/Users/UsersComponent.jsx";
import ShopsComponent from "../Pages/Shops/ShopsComponent.jsx";
import AddShopComponent from "../Pages/Shops/Components/AddShopComponent.jsx";
import EditshopComponent from "../Pages/Shops/Components/EditShopComponent.jsx";
import ServicesComponent from "../Pages/Shops/ServicesComponent.jsx";
import HospitalsComponent from "../Pages/Hospitals/HospitalsComponent.jsx";
import AddHospitalComponent from "../Pages/Hospitals/Components/AddHospitalComponent.jsx";
import EditHospitalComponent from "../Pages/Hospitals/Components/EditHospitalComponent.jsx";
import ServiceDetailsComponent from "../Pages/Shops/ServiceDetailsComponent.jsx";

function AuthRouterconfig() {
  return (
    <Switch>
      {/* <Route exact path="/" component={Dashboard} /> */}
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/3/hospital" component={HospitalsComponent} />
      <Route exact path="/3/hospital/add" component={AddHospitalComponent} />
      <Route
        exact
        path="/3/hospital/:id/edit"
        component={EditHospitalComponent}
      />
      <Route exact path="/:categoryId/:category" component={ShopsComponent} />
      <Route path="/:categoryId/:category/add" component={AddShopComponent} />
      <Route
        path="/:categoryId/:category/:id/edit"
        component={EditshopComponent}
      />
      <Route
        exact
        path="/:categoryId/:category/:id/services"
        component={ServicesComponent}
      />
      <Route
        exact
        path="/:categoryId/:category/:id/services/:serviceId"
        component={ServiceDetailsComponent}
      />
      <Route path="/users" component={UsersComponent} />
      <Redirect to="/dashboard" />
    </Switch>
  );
}
export default AuthRouterconfig;

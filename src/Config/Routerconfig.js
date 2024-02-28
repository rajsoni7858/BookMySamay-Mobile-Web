import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginForm from "../Pages/Login/LoginComponent";
import Dashboard from "../Pages/Dashboard/DashboardComponent.jsx";
import UsersComponent from "../Pages/Users/UsersComponent.jsx";
import ShopsComponent from "../Pages/Shops/ShopsComponent.jsx";
import AddShopComponent from "../Pages/Shops/Components/AddShopComponent.jsx";
import EditshopComponent from "../Pages/Shops/Components/EditShopComponent.jsx";
import ServicesComponent from "../Pages/Shops/ServicesComponent.jsx";
import HospitalsComponent from "../Pages/Hospitals/HospitalsComponent.jsx";
import AddHospitalComponent from "../Pages/Hospitals/Components/AddHospitalComponent.jsx";
import EditHospitalComponent from "../Pages/Hospitals/Components/EditHospitalComponent.jsx";

function Routerconfig() {
  return (
    <Switch>
      <Route path="/" exact={true} component={LoginForm} />
      <Route path="/login" exact={true} component={LoginForm} />
      <Route path="/dashboard" component={Dashboard} />
      <Route exact path="/salons" component={ShopsComponent} />
      <Route path="/salons/add-salon" component={AddShopComponent} />
      <Route path="/salons/:id/edit-salon" component={EditshopComponent} />
      <Route exact path="/salons/:id/services" component={ServicesComponent} />
      <Route exact path="/hospitals" component={HospitalsComponent} />
      <Route path="/hospitals/add-hospital" component={AddHospitalComponent} />
      <Route
        path="/hospitals/:id/edit-hospital"
        component={EditHospitalComponent}
      />
      <Route path="/users" component={UsersComponent} />
    </Switch>
  );
}
export default Routerconfig;

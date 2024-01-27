import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routerconfig from "./Config/Routerconfig";
import HeaderComponent from "./Component/Header/HeaderComponent";
import AuthRouterconfig from "./Config/AuthRouter";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div className="App">
          {/* <HeaderComponent /> */}
          <AuthRouterconfig />
          {/* <Routerconfig /> */}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;

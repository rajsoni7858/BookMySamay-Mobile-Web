import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routerconfig from "./Config/Routerconfig";
import HeaderComponent from "./Component/Header/HeaderComponent";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div className="App">
          <HeaderComponent />
          <Routerconfig />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;

import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routerconfig from "./Config/Routerconfig";
import HeaderComponent from "./Component/HeaderComponent";

const App = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

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

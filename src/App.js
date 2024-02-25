import { BrowserRouter } from "react-router-dom";
import Routerconfig from "./Config/Routerconfig";
import HeaderComponent from "./Component/Header/HeaderComponent";
import { ConfigProvider } from "antd";
import "./App.css";

const App = () => {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: { colorPrimary: "#1C4792" },
        }}
      >
        <BrowserRouter>
          <div className="App">
            <HeaderComponent />
            <Routerconfig />
          </div>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
};

export default App;

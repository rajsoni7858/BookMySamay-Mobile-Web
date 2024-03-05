import React, { Suspense, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtpSucceeded } from "./redux/actions";
import HeaderComponent from "./Component/Header/HeaderComponent";
import "./App.css";

const LazyAppRouterComponent = React.lazy(() =>
  import("./Config/Routerconfig")
);
const LazyAppAuthRouterComponent = React.lazy(() =>
  import("./Config/AuthRouterconfig")
);

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.SaveOTP.isLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(verifyOtpSucceeded());
    }
  }, [dispatch]);

  return (
    <div>
      <ConfigProvider theme={{ token: { colorPrimary: "#1C4792" } }}>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="common__wrapper">
                <Spin size="large" />
              </div>
            }
          >
            <div className="App">
              {isLoggedIn ? (
                <>
                  <HeaderComponent />
                  <LazyAppAuthRouterComponent />
                </>
              ) : (
                <LazyAppRouterComponent />
              )}
            </div>
          </Suspense>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import { Layout, Avatar, Dropdown } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import "./Header.css"; // Import your CSS file
import CustomDrawer from "../Drawer/DrawerComponent";

const { Header } = Layout;

const HeaderComponent = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const onClick = ({ key }) => {};

  const items = [
    {
      label: "Settings",
      key: "1",
    },
    {
      label: "Logout",
      key: "2",
    },
  ];

  return (
    <Layout>
      <Header className="header">
        <div className="mobile-menu">
          <MenuOutlined style={{ fontSize: "16px" }} onClick={showDrawer} />
          <CustomDrawer onClose={onCloseDrawer} open={drawerVisible} />
        </div>
        <div className="logo">
          <img
            src={require("../../Assets/Images/logo.png")}
            alt="Your Logo"
            style={{ display: "block", width: 94, Height: 32 }}
          />
        </div>
        <div className="user-menu">
          <Dropdown
            menu={{
              items,
              onClick,
            }}
            placement="bottomRight"
          >
            <Avatar size="small" icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </Header>
    </Layout>
  );
};

export default HeaderComponent;

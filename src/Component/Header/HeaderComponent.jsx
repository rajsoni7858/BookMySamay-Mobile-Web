import React, { useState } from "react";
import { Layout, Avatar, Dropdown } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import CustomDrawer from "../Drawer/DrawerComponent";
import LogoutModal from "../Logout/LogoutModal";
import "./Header.css";

const { Header } = Layout;

const HeaderComponent = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  // logout
  const showModal = () => {
    setModalVisible(true);
  };

  const handleMenuClick = (item) => {
    if (item.key === "2") {
      showModal();
    } else {
      console.log("Clicked on", item.label);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setModalVisible(false);
  };

  const items = [
    // {
    //   label: "Settings",
    //   key: "1",
    // },
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
            style={{ display: "block", width: 94, height: 32 }}
          />
        </div>
        <div className="user-menu">
          <Dropdown
            menu={{
              items,
              onClick: handleMenuClick,
            }}
            placement="bottomRight"
          >
            <Avatar size="small" icon={<UserOutlined />} />
          </Dropdown>
        </div>

        {/* Logout Confirmation Modal */}
        <LogoutModal
          visible={modalVisible}
          onOk={handleLogout}
          onCancel={() => setModalVisible(false)}
        />
      </Header>
    </Layout>
  );
};

export default HeaderComponent;

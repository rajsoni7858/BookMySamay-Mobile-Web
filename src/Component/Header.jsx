// HeaderComponent.js
import React, { useState } from "react";
import { Layout, Row, Col, Menu, Avatar, Image } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import logo from "/Users/Raj/BookMySamay-Mobile-Web/src/Assets/Images/logo.png";
import SideDrawer from "./SideDrawer";
import menuIcon1 from "../Assets/Images/Avatar.png"; // Adjust the path

const { Header } = Layout;

const HeaderComponent = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const user = {
    firstname: "Raj",
    lastname: "Soni",
  };
  const userLetter = user.firstname ? user.firstname[0].toUpperCase() : "";

  return (
    <Header
      style={{ background: "#fff", padding: "0 20px", margin: "10px 0 0" }}
    >
      <Row justify="space-between" align="middle">
        {/* Left Side (Hamburger Menu) */}
        {/* Hamburger Menu */}
        <Col>
          <MenuOutlined
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={toggleDrawer}
          />
        </Col>

        {/* Center (Logo) */}
        <Col>
          <div className="logo">
            <img
              src={logo}
              alt=""
              style={{ display: "block", width: 100, Height: 40 }}
            />
          </div>
        </Col>

        {/* Right Side (User Account) */}
        <Col>
          <Menu mode="horizontal">
            <Avatar size={32} icon={<Image src={menuIcon1} />} />
          </Menu>
        </Col>
        {/* Side Drawer */}
        <SideDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
      </Row>
    </Header>
  );
};

export default HeaderComponent;

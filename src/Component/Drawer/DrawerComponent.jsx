import React from "react";
import { Drawer, Image, Typography } from "antd";
import { useHistory, useLocation } from "react-router-dom";

const { Text } = Typography;

const menuItems = [
  {
    route: "/dashboard",
    label: "Dashboard",
    icon: "dashboard.png",
    active: "dashboard-active.png",
  },
  {
    route: "/1/salon",
    label: "Salon",
    icon: "salon-menu.png",
    active: "salon-active.png",
  },
  {
    route: "/2/beauty-parlor",
    label: "Beauty Parlour",
    icon: "hospital-menu.png",
    active: "hospital-active.png",
  },
  {
    route: "/3/hospital",
    label: "Hospital",
    icon: "hospital-menu.png",
    active: "hospital-active.png",
  },
  {
    route: "/users",
    label: "User",
    icon: "user.png",
    active: "user-active.png",
  },
];

const CustomDrawer = ({ onClose, open }) => {
  const history = useHistory();
  const location = useLocation();

  const handleMenuClick = (route) => {
    history.push(route);
    onClose();
  };

  return (
    <Drawer
      placement="left"
      onClose={onClose}
      open={open}
      width="60%"
      closable={false}
      style={{ border: "none", padding: "10px" }}
    >
      {menuItems.map((item) => {
        const active = location.pathname.includes(item.route);

        return (
          <div
            key={item.route}
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "1.8rem",
              cursor: "pointer",
            }}
            onClick={() => handleMenuClick(item.route)}
          >
            <Image
              src={require(`../../Assets/Images/${
                active ? item.active : item.icon
              }`)}
              width={20}
              preview={false}
              sizes="small"
            />
            <Text
              style={{
                fontFamily: "Inter",
                marginLeft: "0.6rem",
                color: active ? "#0DB7AA" : "inherit",
              }}
            >
              {item.label}
            </Text>

            {active && (
              <div
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "#0DB7AA",
                  marginLeft: "0.8rem",
                  marginTop: "1px",
                }}
              />
            )}
          </div>
        );
      })}
    </Drawer>
  );
};

export default CustomDrawer;

// SideDrawer.js
import React from "react";
import { NavLink } from "react-router-dom";
import dashboard from "../Assets/Images/dashboard (1).png";
import shop from "../Assets/Images/shop.png";
import user from "../Assets/Images/user.png";
import logout from "../Assets/Images/logout.png";
const SideDrawer = ({ isOpen, onClose }) => {
  return (
    <div className={`side-drawer ${isOpen ? "open" : ""}`}>
      {/* Close button */}
      <button onClick={onClose}>Close Drawer</button>
      {/* Conditional rendering of links */}
      {isOpen && (
        <nav>
          <ul>
            <li>
              <NavLink to="/dashboard" activeClassName="active">
                <img
                  src={dashboard}
                  alt="dashboard.png"
                  style={{ width: 100, height: 100 }}
                />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" activeClassName="active">
                <img
                  src={shop}
                  alt="shop.png"
                  style={{ width: 100, height: 100 }}
                />
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/user" activeClassName="active">
                <img
                  src={user}
                  alt="user.png"
                  style={{ width: 100, height: 100 }}
                />
                User
              </NavLink>
            </li>
            <li>
              <NavLink to="/logout" activeClassName="active">
                <img
                  src={logout}
                  alt="logout.png"
                  style={{ width: 100, height: 100 }}
                />
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default SideDrawer;

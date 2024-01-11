// SideDrawer.js
import React from "react";

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
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/shop">Shop</a>
            </li>
            <li>
              <a href="/user">User</a>
            </li>
            <li>
              <a href="/logout">Logout</a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default SideDrawer;

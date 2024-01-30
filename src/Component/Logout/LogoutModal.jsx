import React from "react";
import { Modal } from "antd";
import { useHistory } from "react-router-dom"; // Import useHistory from react-router-dom
import "../../Component/Logout/LogoutModal.css";

const LogoutModal = ({ visible, onOk, onCancel }) => {
  const history = useHistory();

  const handleLogout = () => {
    // Perform any additional logout actions if needed
    onOk();

    // Navigate to the login page
    history.push("/login"); // Replace "/login" with your actual login page path
  };

  return (
    <Modal
      title="Logout Confirmation"
      centered
      open={visible}
      onOk={handleLogout}
      onCancel={onCancel}
    >
      <p>Are you sure you want to logout?</p>
    </Modal>
  );
};

export default LogoutModal;

import React from "react";
import { Modal } from "antd";
import { logout } from "../../redux/actions";
import { useDispatch } from "react-redux";
import "../../Component/Logout/LogoutModal.css";

const LogoutModal = ({ visible, onOk, onCancel }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    onOk();
    dispatch(logout());
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

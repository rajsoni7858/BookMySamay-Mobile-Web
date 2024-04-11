import React, { useState } from "react";
import { Table, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import EditUserComponent from "./Components/EditUserComponent";

const { Text } = Typography;

const UsersComponent = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const data = [
    {
      key: "1",
      mobileNumber: "123-456-7890",
      username: "Ronak Soni",
      role: "Developer",
    },
    {
      key: "2",
      mobileNumber: "987-654-3210",
      username: "Gaurav Soni",
      role: "Manager",
    },
    {
      key: "3",
      mobileNumber: "123-456-7890",
      username: "Apurv Soni",
      role: "Developer",
    },
    {
      key: "4",
      mobileNumber: "987-654-3210",
      username: "Kuldeep Soni",
      role: "Manager",
    },
    {
      key: "5",
      mobileNumber: "987-654-3210",
      username: "Raj Soni",
      role: "Manager",
    },
  ];

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <span
          style={{
            fontFamily: "Poppins-SemiBold",
            color: "#192A3E",
            fontSize: "0.75rem",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <Text
          style={{
            fontFamily: "Poppins",
            color: "#90A0B7",
            fontSize: "0.75rem",
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Edit",
      key: "edit",
      width: "15%",
      align: "center",
      render: (text, record) => (
        <img
          src={require("../../Assets/Images/edit.png")}
          alt="Your Logo"
          style={{ width: "17px", Height: "17px", padding: "3px" }}
          onClick={() => handleEdit(record)}
        />
      ),
    },
  ];

  const handleEdit = (record) => {
    setEditUser(record);
    setEditModalVisible(true);
  };

  const handleEditModalOk = () => {
    setEditModalVisible(false);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  return (
    <div style={{ backgroundColor: "#eff3fd", height: "calc(100dvh - 55px)" }}>
      <Content style={{ padding: "1.2rem", minHeight: 280 }}>
        {/* Table */}
        <Table bordered dataSource={data} columns={columns} />
      </Content>

      <EditUserComponent
        visible={editModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
        initialValues={editUser}
      />
    </div>
  );
};

export default UsersComponent;

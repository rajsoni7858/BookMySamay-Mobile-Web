import React, { useState } from "react";
import { Table, Space, Modal, Form, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";

const UserPage = () => {
  const [form] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const data = [
    {
      key: "1",
      companyName: "Company A",
      username: "UserA",
      role: "Developer",
    },
    { key: "2", companyName: "Company B", username: "UserB", role: "Manager" },
    // Add more dummy data as needed
  ];

  const columns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Edit",
      key: "edit",
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined onClick={() => handleEdit(record)} />
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditingUser(record);
    setEditModalVisible(true);
  };

  const handleEditModalOk = () => {
    // Implement your update logic here
    setEditModalVisible(false);
  };

  const handleEditModalCancel = () => {
    form.resetFields();
    setEditModalVisible(false);
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        style={{ width: "100%", padding: 20 }}
        bordered
        className="custom-table"
      />

      <Modal
        title="Organization Details"
        visible={editModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
        width="100%" // Set the width to 100%
      >
        <Space direction="vertical">
          <Form form={form} layout="vertical">
            <Form.Item name="companyName" label="Company Name">
              <Input />
            </Form.Item>
            <Form.Item name="username" label="Username">
              <Input />
            </Form.Item>
            <Form.Item name="role" label="Role">
              <Input />
            </Form.Item>
          </Form>
        </Space>
      </Modal>
    </div>
  );
};

export default UserPage;

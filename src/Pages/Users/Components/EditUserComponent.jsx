import React from "react";
import { Modal, Form, Input, Space } from "antd";
import "./EditUser.css";

const EditUserComponent = ({ visible, onOk, onCancel, initialValues }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, visible, initialValues]);

  return (
    <Modal
      title="Edit User"
      open={visible}
      onOk={() => {
        form.validateFields().then((values) => {
          form.resetFields();
          onOk(values);
        });
      }}
      onCancel={onCancel}
      width="100%"
      height="100%"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins",
      }}
      destroyOnClose
      centered
    >
      <Space direction="vertical" style={{ marginTop: "10px", width: "100%" }}>
        <Form form={form} layout="vertical">
          <Form.Item name="username" label="Username:">
            <Input />
          </Form.Item>
          <Form.Item name="mobileNumber" label="Mobile Number:">
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role:">
            <Input />
          </Form.Item>
        </Form>
      </Space>
    </Modal>
  );
};

export default EditUserComponent;

import React from "react";
import { Form, Input, Typography } from "antd";

const { Title } = Typography;

const Step4Component = ({ form }) => {
  return (
    <Form form={form}>
      <Title
        level={5}
        style={{
          textAlign: "center",
          margin: 0,
          padding: "1.4rem 0rem",
          fontFamily: "Inter",
        }}
      >
        Payment Method
      </Title>

      {/* Content */}
      <Form.Item
        name="upiMode"
        rules={[{ required: true, message: "Please select UPI mode" }]}
        style={{ marginBottom: "3rem" }}
      >
        <Input placeholder="Enter your UPI here" />
      </Form.Item>
    </Form>
  );
};

export default Step4Component;

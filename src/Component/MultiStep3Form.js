// ServicesSelectionForm.js
import React from "react";
import { Form, Select, Button } from "antd";

const { Option } = Select;

const ServicesSelectionForm = () => {
  return (
    <>
      <h5
        style={{
          fontSize: 20,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Add services from the dropdown with cost
      </h5>
      <Form.Item
        style={{ padding: 20 }}
        label="Hair Services"
        name="hair services"
        rules={[{ required: true, message: "Please select services" }]}
      >
        <Select mode="multiple" placeholder="Select Hair services">
          <Option value="service1">Service 1</Option>
          <Option value="service2">Service 2</Option>
          {/* Add more service options */}
        </Select>
      </Form.Item>
      <Form.Item
        style={{ padding: 20 }}
        label="Beard Services"
        name="services"
        rules={[{ required: true, message: "Please select services" }]}
      >
        <Select mode="multiple" placeholder="Select Beard services">
          <Option value="service1">Service 1</Option>
          <Option value="service2">Service 2</Option>
          {/* Add more service options */}
        </Select>
      </Form.Item>
      <Form.Item
        style={{ padding: 20 }}
        label="Massage Services"
        name="services"
        rules={[{ required: true, message: "Please select services" }]}
      >
        <Select mode="multiple" placeholder="Select Massage services">
          <Option value="service1">Service 1</Option>
          <Option value="service2">Service 2</Option>
          {/* Add more service options */}
        </Select>
      </Form.Item>
    </>
  );
};

export default ServicesSelectionForm;

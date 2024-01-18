// ServicesSelectionForm.js
import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Select, Space, Form, Typography } from "antd";
const { Option } = Select;
const ServicesSelectionForm = () => {
  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }
  return (
    <>
      <h5
        style={{
          fontSize: 17,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Add services from the dropdown with cost
      </h5>
      <Form.Item
        style={{ padding: 0 }}
        label="Hair Services"
        name="services"
        rules={[{ required: true, message: "Please select services" }]}
      >
        <Select
          defaultValue="default"
          style={{ width: "100%" }}
          onChange={handleChange}
        >
          <Option value="default" disabled>
            Select an option
          </Option>
          <Option value="option1">Hair Service 1</Option>
          <Option value="option2">Hair Service 2</Option>
        </Select>
      </Form.Item>
      <Form.Item
        style={{ padding: 0 }}
        label="Massage Services"
        name="services"
        rules={[{ required: true, message: "Please select services" }]}
      >
        <Select
          defaultValue="default"
          style={{ width: "100%" }}
          onChange={handleChange}
        >
          <Option value="default" disabled>
            Select an option
          </Option>
          <Option value="option1">Massage Service 1</Option>
          <Option value="option2">Massage Service 2</Option>
        </Select>
      </Form.Item>
      <Form.Item
        style={{ padding: 0 }}
        label="Beard Services"
        name="services"
        rules={[{ required: true, message: "Please select services" }]}
      >
        <Select
          defaultValue="default"
          style={{ width: "100%" }}
          onChange={handleChange}
        >
          <Option value="default" disabled>
            Select an option
          </Option>
          <Option value="option1">Beard Service1</Option>
          <Option value="option2">Beard Service2</Option>
        </Select>
      </Form.Item>
    </>
  );
};

export default ServicesSelectionForm;

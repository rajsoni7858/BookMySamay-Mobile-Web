import React from "react";
import { Select, Form, Typography } from "antd";

const { Option } = Select;
const { Title } = Typography;

const Step3Component = () => {
  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }
  return (
    <Form>
      <Title
        level={5}
        style={{
          textAlign: "center",
          margin: 0,
          padding: "1.4rem 0rem",
          fontFamily: "Inter",
        }}
      >
        Add services from the dropdown with cost
      </Title>

      {/* Content */}
      <Form.Item
        label="Hair Services"
        name="services"
        rules={[{ required: true, message: "Please select services" }]}
      >
        <Select onChange={handleChange} placeholder="Select an option">
          <Option value="option1">Hair Service 1</Option>
          <Option value="option2">Hair Service 2</Option>
        </Select>
      </Form.Item>

      {/* 2 */}
      <Form.Item
        label="Massage Services"
        name="services1"
        rules={[{ required: true, message: "Please select services" }]}
      >
        <Select onChange={handleChange} placeholder="Select an option">
          <Option value="option1">Massage Service 1</Option>
          <Option value="option2">Massage Service 2</Option>
        </Select>
      </Form.Item>

      {/* 3 */}
      <Form.Item
        label="Beard Services"
        name="services2"
        rules={[{ required: true, message: "Please select services" }]}
      >
        <Select onChange={handleChange} placeholder="Select an option">
          <Option value="option1">Beard Service1</Option>
          <Option value="option2">Beard Service2</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default Step3Component;

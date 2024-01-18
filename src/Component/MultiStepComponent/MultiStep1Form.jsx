// BasicDetailsForm.js
import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  Space,
  DatePicker,
  TimePicker,
} from "antd";
import "../../App.css";
const BasicDetailsForm = () => {
  const [selectedHolidays, setSelectedHolidays] = useState(null);

  const options = [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
  ];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div style={{ padding: 0 }}>
      <Form>
        <h5
          style={{
            fontSize: 17,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Here you need to fill the shop details
        </h5>

        <Form.Item
          label="Shop Name"
          name="shopName"
          rules={[{ required: true, message: "Please enter the Shop Name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Shop Owner"
          name="shopOwner"
          rules={[{ required: true, message: "Please enter the Shop Owner" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Shop Location"
          name="shopLocation"
          rules={[
            { required: true, message: "Please enter the Shop Location" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Set Location"
          name="setLocation"
          rules={[{ required: true, message: "Please enter the Set Location" }]}
        >
          <Input />
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item
              label="Working Days"
              name="workingDays"
              rules={[
                { required: true, message: "Please enter the Shop Owner" },
              ]}
            >
              <Space
                style={{
                  width: "100%",
                }}
                direction="vertical"
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please select"
                  onChange={handleChange}
                  options={options}
                />
              </Space>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Holiday in Week" name="holidayInWeek">
              <Space
                style={{
                  width: "100%",
                }}
                direction="vertical"
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please select"
                  onChange={handleChange}
                  options={options}
                />
              </Space>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Opening Time" name="openingTime">
              <TimePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Closing Time" name="closingTime">
              <TimePicker />
            </Form.Item>
          </Col>
        </Row>
        {/* ... (add other form fields) */}
      </Form>
    </div>
  );
};

export default BasicDetailsForm;

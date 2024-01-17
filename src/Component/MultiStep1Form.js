// BasicDetailsForm.js
import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { Form, Input, Row, Col, Select, DatePicker, TimePicker } from "antd";
import { MultiSelect } from "primereact/multiselect";
import "../App.css";
const BasicDetailsForm = () => {
  const [selectedDays, setSelectedDays] = useState(null);
  const [selectedHolidays, setSelectedHolidays] = useState(null);
  const days = [
    { name: "Monday", code: "M" },
    { name: "Tuesday", code: "T" },
    { name: "Wednesday", code: "W" },
    { name: "Thursday", code: "T" },
    { name: "Friday", code: "F" },
    { name: "Saturday", code: "S" },
    { name: "Sunday", code: "S" },
  ];

  return (
    <div style={{ padding: 0 }}>
      <Form>
        <h5
          style={{
            fontSize: 20,
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
              <div className="card flex justify-content-center">
                <MultiSelect
                  value={selectedDays}
                  onChange={(e) => setSelectedDays(e.value)}
                  options={days}
                  optionLabel="name"
                  filter
                  placeholder="Select Days"
                  maxSelectedLabels={2}
                  className="w-full md:w-20rem"
                />
              </div>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Holiday in Week" name="holidayInWeek">
              <div className="card flex justify-content-center">
                <MultiSelect
                  value={selectedHolidays}
                  onChange={(e) => setSelectedHolidays(e.value)}
                  options={days}
                  optionLabel="name"
                  filter
                  placeholder="Select Days"
                  maxSelectedLabels={2}
                  className="w-full md:w-20rem"
                />
              </div>
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

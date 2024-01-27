import React from "react";
import { Form, Input, Row, Col, Select, TimePicker, Typography } from "antd";
import moment from "moment";

const { Title } = Typography;

const Step1Component = () => {
  const disabledMinutes = (hour) => {
    // Disable minutes that are not at 00 or 30
    const minutes = [];
    for (let i = 0; i < 60; i++) {
      if (i % 30 !== 0) {
        minutes.push(i);
      }
    }
    return minutes;
  };
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
        Here you need to fill the shop details
      </Title>

      {/* Content */}
      <Form.Item
        label="Shop Name:"
        name="shopName"
        rules={[{ required: true, message: "Please enter the Shop Name" }]}
      >
        <Input placeholder="Enter shop name" />
      </Form.Item>
      <Form.Item
        label="Shop Owner:"
        name="shopOwner"
        rules={[{ required: true, message: "Please enter the Shop Owner" }]}
      >
        <Input placeholder="Enter shop Owner" />
      </Form.Item>
      <Form.Item
        label="Shop Location:"
        name="shopLocation"
        rules={[{ required: true, message: "Please enter the Shop Location" }]}
      >
        <Input placeholder="Enter shop location" />
      </Form.Item>
      <Form.Item
        label="Set Location:"
        name="setLocation"
        rules={[{ required: true, message: "Please enter the Set Location" }]}
      >
        <Input />
      </Form.Item>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            label="Working Days:"
            name="workingDays"
            rules={[{ required: true, message: "Please enter the Shop Owner" }]}
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              onChange={handleChange}
              options={options}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Holiday in Week:" name="holidayInWeek">
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              onChange={handleChange}
              options={options}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label="Opening Time:" name="openingTime">
            <TimePicker
              minuteStep={30}
              disabledMinutes={disabledMinutes}
              format="h:mm A"
              defaultValue={moment("09:00", "HH:mm")}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Closing Time:" name="closingTime">
            <TimePicker
              minuteStep={30}
              disabledMinutes={disabledMinutes}
              format="h:mm A"
              defaultValue={moment("09:00", "HH:mm")}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Step1Component;

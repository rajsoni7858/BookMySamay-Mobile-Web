import React from "react";
import { Form, Input, Row, Col, Select, TimePicker, Typography } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const { Title } = Typography;

const Step1Component = () => {
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

  const validateTime = (rule, value, callback) => {
    if (value) {
      const selectedTime = dayjs(value);
      const currentTime = dayjs();
      if (selectedTime.isBefore(currentTime)) {
        callback();
      } else {
        callback();
      }
    } else {
      // Remove the error message for empty values
      callback();
    }
  };

  const disabledClosingHours = () => {
    const hours = [];
    for (let i = 0; i < 12; i++) {
      hours.push(i);
    }
    return hours;
  };

  return (
    <>
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
        rules={[{ required: true, message: "Please enter shop name" }]}
      >
        <Input placeholder="Enter shop name" />
      </Form.Item>
      <Form.Item
        label="Shop Owner:"
        name="shopOwner"
        rules={[{ required: true, message: "Please enter shop owner" }]}
      >
        <Input placeholder="Enter shop Owner" />
      </Form.Item>
      <Form.Item
        label="Shop Location:"
        name="shopLocation"
        rules={[{ required: true, message: "Please enter shop location" }]}
      >
        <Input placeholder="Enter shop location" />
      </Form.Item>
      <Form.Item
        label="Set Location:"
        name="setLocation"
        rules={[{ required: true, message: "Please enter set location" }]}
      >
        <Input placeholder="Enter set location " />
      </Form.Item>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            label="Working Days:"
            name="workingDays"
            rules={[{ required: true, message: "Please select working days" }]}
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
          <Form.Item
            label="Holiday in Week:"
            name="holidayInWeek"
            rules={[
              { required: true, message: "Please select holiday in week" },
            ]}
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
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            label="Opening Time:"
            name="openingTime"
            rules={[
              {
                required: true,
                message: "Please select opening time",
              },
              {
                validator: validateTime,
              },
            ]}
          >
            <TimePicker
              minuteStep={30}
              format="h:mm A"
              // defaultValue={dayjs("13:30", "HH:mm")}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Closing Time:"
            name="closingTime"
            rules={[
              {
                required: true,
                message: "Please select closing time",
              },
              {
                validator: validateTime,
              },
            ]}
          >
            <TimePicker
              minuteStep={30}
              format="h:mm A"
              // defaultValue={dayjs("13:30", "HH:mm")}
              style={{ width: "100%" }}
              disabledClosingHours={disabledClosingHours}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default Step1Component;

import React, { useState } from "react";
import { Collapse, TimePicker, Button, Space } from "antd";

const { Panel } = Collapse;

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Step2Component = () => {
  const [timeValues, setTimeValues] = useState(
    Array.from({ length: 7 }, () => Array(4).fill(""))
  );

  const handleTimeChange = (dayIndex, timeIndex, time) => {
    const newTimeValues = [...timeValues];
    newTimeValues[dayIndex][timeIndex] = time;
    setTimeValues(newTimeValues);
  };

  const handleCopyFromAbove = (dayIndex) => {
    const newTimeValues = [...timeValues];
    const aboveDayIndex = dayIndex > 0 ? dayIndex - 1 : 6;
    newTimeValues[dayIndex] = [...timeValues[aboveDayIndex]];
    setTimeValues(newTimeValues);
  };

  const renderTimePickers = (dayIndex) => {
    return (
      <Space style={{ width: "100%" }} direction="horizontal">
        <Space direction="vertical">
          <div>Open At:</div>
          <TimePicker
            value={timeValues[dayIndex][0]}
            onChange={(time) => handleTimeChange(dayIndex, 0, time)}
            format="h:mm a"
            minuteStep={15}
            placeholder="Select Time"
            style={{ width: "100%" }}
            required
          />
        </Space>
        <Space direction="vertical">
          <div>Close At:</div>
          <TimePicker
            value={timeValues[dayIndex][1]}
            onChange={(time) => handleTimeChange(dayIndex, 1, time)}
            format="h:mm a"
            minuteStep={15}
            placeholder="Select Time"
            style={{ width: "100%" }}
            required
          />
        </Space>
        <Space direction="vertical">
          <div>Break Start:</div>
          <TimePicker
            value={timeValues[dayIndex][2]}
            onChange={(time) => handleTimeChange(dayIndex, 2, time)}
            format="h:mm a"
            minuteStep={15}
            placeholder="Select Time"
            style={{ width: "100%" }}
            required
          />
        </Space>
        <Space direction="vertical">
          <div>Break End:</div>
          <TimePicker
            value={timeValues[dayIndex][3]}
            onChange={(time) => handleTimeChange(dayIndex, 3, time)}
            format="h:mm a"
            minuteStep={15}
            placeholder="Select Time"
            style={{ width: "100%" }}
            required
          />
        </Space>
      </Space>
    );
  };

  return (
    <div style={{ paddingTop: "0.6rem" }}>
      <Collapse
        defaultActiveKey={daysOfWeek.map((day, index) => `${index}`)}
        bordered={false}
      >
        {daysOfWeek.map((day, index) => (
          <Panel
            collapsible="disabled"
            header={day}
            key={index}
            extra={
              index !== 0 && (
                <Button
                  type="primary"
                  size="small"
                  style={{ fontSize: "12px" }}
                  onClick={() => handleCopyFromAbove(index)}
                >
                  Copy From Above
                </Button>
              )
            }
            style={{
              borderBottom: 0,
            }}
            showArrow={false}
          >
            {renderTimePickers(index)}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Step2Component;

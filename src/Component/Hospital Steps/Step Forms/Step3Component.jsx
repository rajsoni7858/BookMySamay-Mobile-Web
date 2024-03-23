import React, { useEffect, useState } from "react";
import { Collapse, TimePicker, Button, Space } from "antd";
import dayjs from "dayjs";
import CustomBreadcrumb from "../../Breadcrumb/CustomBreadcrumbComponent";
import { disabledMinutes } from "../../../utils/utils";

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

const initialTimeValues = Array.from({ length: 7 }, (_, dayIndex) => ({
  day_of_week: daysOfWeek[dayIndex],
  is_open: 0,
  opening_time: "",
  closing_time: "",
  lunch_start_time: "",
  lunch_end_time: "",
  op_type: "Patient",
}));

const Step3Component = ({ formId, onPrevious, onNext }) => {
  const [timeValues, setTimeValues] = useState([]);

  const storedData = JSON.parse(sessionStorage.getItem("salon"));

  const handleTimeChange = (dayIndex, name, time) => {
    const newTimeValues = [...timeValues];
    newTimeValues[dayIndex] = {
      ...newTimeValues[dayIndex],
      [name]: time ? time.format("HH:mm") : "",
    };
    setTimeValues(newTimeValues);
  };

  const handleCopyFromAbove = (dayIndex) => {
    const newTimeValues = [...timeValues];
    const aboveDayIndex = dayIndex === 0 ? 6 : dayIndex - 1; // Adjust index for Sunday
    newTimeValues[dayIndex] = {
      ...newTimeValues[aboveDayIndex],
      day_of_week: newTimeValues[dayIndex].day_of_week,
    };
    setTimeValues(newTimeValues);
  };

  const handleNext = async () => {
    const payload = timeValues.map((item) => {
      const is_open = item.opening_time && item.closing_time ? 1 : 0;
      return {
        ...item,
        is_open,
      };
    });

    sessionStorage.setItem(
      "salon",
      JSON.stringify({ ...storedData, shop_daily_operational_details: payload })
    );
    onNext();
  };

  useEffect(() => {
    if (storedData && storedData.shop_daily_operational_details) {
      setTimeValues(storedData.shop_daily_operational_details);
    } else {
      setTimeValues(initialTimeValues);
    }
  }, []);

  const formattedTime = (time) => {
    return time ? dayjs(time, "HH:mm") : "";
  };

  const renderTimePickers = (dayIndex) => {
    return (
      <Space style={{ width: "100%" }} direction="horizontal">
        <Space direction="vertical">
          <div>Open At:</div>
          <TimePicker
            value={formattedTime(timeValues[dayIndex].opening_time)}
            onChange={(time) =>
              handleTimeChange(dayIndex, "opening_time", time)
            }
            format="h:mm a"
            minuteStep={15}
            placeholder="Select Time"
            style={{ width: "100%" }}
            name="opening_time"
            showNow={false}
            disabledMinutes={disabledMinutes}
            use12Hours
            required
          />
        </Space>
        <Space direction="vertical">
          <div>Close At:</div>
          <TimePicker
            value={formattedTime(timeValues[dayIndex].closing_time)}
            onChange={(time) =>
              handleTimeChange(dayIndex, "closing_time", time)
            }
            format="h:mm a"
            minuteStep={15}
            placeholder="Select Time"
            style={{ width: "100%" }}
            name="closing_time"
            showNow={false}
            disabledMinutes={disabledMinutes}
            use12Hours
            required
          />
        </Space>
        <Space direction="vertical">
          <div>Break Start:</div>
          <TimePicker
            value={formattedTime(timeValues[dayIndex].lunch_start_time)}
            onChange={(time) =>
              handleTimeChange(dayIndex, "lunch_start_time", time)
            }
            format="h:mm a"
            minuteStep={15}
            placeholder="Select Time"
            style={{ width: "100%" }}
            name="lunch_start_time"
            showNow={false}
            disabledMinutes={disabledMinutes}
            use12Hours
            required
          />
        </Space>
        <Space direction="vertical">
          <div>Break End:</div>
          <TimePicker
            value={formattedTime(timeValues[dayIndex].lunch_end_time)}
            onChange={(time) =>
              handleTimeChange(dayIndex, "lunch_end_time", time)
            }
            format="h:mm a"
            minuteStep={15}
            placeholder="Select Time"
            style={{ width: "100%" }}
            name="lunch_end_time"
            showNow={false}
            disabledMinutes={disabledMinutes}
            use12Hours
            required
          />
        </Space>
      </Space>
    );
  };

  return (
    <div
      style={{
        paddingTop: "0.6rem",
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <CustomBreadcrumb
          items={[
            {
              title: "Hospital",
            },
            {
              title: storedData?.name,
            },
            {
              title: formId === "editHospitalForm" ? `Edit` : `Add`,
            },
          ]}
          path={"/3/hospital"}
        />

        <Collapse
          activeKey={timeValues.map((day, index) => `${index}`)}
          bordered={false}
        >
          {timeValues.map((item, index) => (
            <Panel
              collapsible="disabled"
              header={item.day_of_week}
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

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1.5rem",
        }}
      >
        <Button
          style={{
            width: "100%",
            color: "#1C4792",
            borderColor: "#1C4792",
            borderRadius: "12px",
            fontFamily: "Poppins",
            height: "2.5rem",
            marginRight: "0.4rem",
            background: "white",
          }}
          onClick={onPrevious}
        >
          PREVIOUS
        </Button>

        <Button
          style={{
            width: "100%",
            background: "#1C4792",
            borderRadius: "12px",
            fontFamily: "Poppins",
            height: "2.5rem",
            marginLeft: "0.4rem",
          }}
          type="primary"
          onClick={handleNext}
        >
          NEXT
        </Button>
      </div>
    </div>
  );
};

export default Step3Component;

import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  InputNumber,
  Select,
  TimePicker,
  Typography,
} from "antd";
import CustomBreadcrumb from "../../Breadcrumb/CustomBreadcrumbComponent";
import "../Step.css";
import { disabledMinutes } from "../../../utils/utils";

const { Title, Text } = Typography;

const Step2Component = ({ form, formId, onPrevious, onNext }) => {
  const storedData = JSON.parse(sessionStorage.getItem("salon"));
  const [check, setCheck] = useState();

  const handleNext = async () => {
    try {
      await form.validateFields().then((values) => {
        const payload = {
          ...values,
          op_type: "Marketing",
          opening_time: values?.opening_time?.format("HH:mm"),
          closing_time: values?.closing_time?.format("HH:mm"),
          detail_id: storedData?.detail_id,
        };

        sessionStorage.setItem(
          "salon",
          JSON.stringify(
            check
              ? {
                  ...storedData,
                  mr_fee: values.mr_fee,
                  max_no_appointment: values.max_no_appointment,
                  mr_details: payload,
                  is_marketing: check,
                }
              : {
                  ...storedData,
                  is_marketing: check,
                }
          )
        );
        onNext();
      });
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  useEffect(() => {
    const initialValue =
      storedData && formId === "editHospitalForm"
        ? storedData?.is_marketing
        : true;
    setCheck(initialValue ?? false);
  }, []);

  return (
    <Form
      form={form}
      id={formId}
      layout="vertical"
      style={{ display: "flex", flex: 1, flexDirection: "column" }}
    >
      <div
        style={{
          paddingTop: "0.6rem",
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
              title: formId === "editHospitalForm" ? "Edit" : "Add",
            },
          ]}
          path={"/3/hospital"}
        />

        <Title
          level={5}
          style={{
            textAlign: "center",
            margin: 0,
            paddingTop: "0.4rem",
            paddingBottom: "1.4rem",
            fontFamily: "Inter",
          }}
        >
          Here you need to fill the Marketing details
        </Title>

        {/* Content */}
        <div
          style={{
            display: "flex",
            marginBottom: "15px",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            id="checkbox"
            checked={check}
            onChange={(e) => setCheck(e.target.checked)}
          />
          <Text
            style={{
              fontFamily: "Poppins",
              color: "black",
              fontSize: "15px",
              marginLeft: "6px",
            }}
          >
            Check to add marketing details.
          </Text>
        </div>
        {check && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item
                label="Day"
                name="day_of_week"
                style={{ width: "32%" }}
                rules={[{ required: true, message: "Please select a day" }]}
              >
                <Select
                  placeholder="Select a day"
                  style={{ fontFamily: "Poppins", height: "38px" }}
                  options={[
                    { value: "Monday", label: "Monday" },
                    { value: "Tuesday", label: "Tuesday" },
                    { value: "Wednesday", label: "Wednesday" },
                    { value: "Thursday", label: "Thursday" },
                    { value: "Friday", label: "Friday" },
                    { value: "Saturday", label: "Saturday" },
                    { value: "Sunday", label: "Sunday" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="Open At:"
                name="opening_time"
                style={{ width: "32%" }}
                rules={[
                  { required: true, message: "Please select opening time" },
                ]}
              >
                <TimePicker
                  style={{ width: "100%", height: "38px" }}
                  format="h:mm a"
                  minuteStep={15}
                  placeholder="Select Time"
                  showNow={false}
                  disabledMinutes={disabledMinutes}
                  use12Hours
                  inputReadOnly
                />
              </Form.Item>
              <Form.Item
                label="Close At:"
                name="closing_time"
                style={{ width: "32%" }}
                rules={[
                  { required: true, message: "Please select closing time" },
                ]}
              >
                <TimePicker
                  style={{ width: "100%", height: "38px" }}
                  format="h:mm a"
                  minuteStep={15}
                  placeholder="Select Time"
                  showNow={false}
                  disabledMinutes={disabledMinutes}
                  use12Hours
                  inputReadOnly
                />
              </Form.Item>
            </div>
            <Form.Item
              label="Total Number of Appointment:"
              name="max_no_appointment"
              rules={[
                {
                  required: true,
                  message: "Please enter total number of appointment",
                },
              ]}
            >
              <InputNumber
                placeholder="Enter number of appointment"
                type="number"
                style={{
                  width: "100%",
                  borderRadius: 8,
                  padding: "0.2rem",
                  border: "1px solid #1C4792",
                }}
              />
            </Form.Item>
            <Form.Item
              label="Appointment Fee:"
              name="mr_fee"
              rules={[
                { required: true, message: "Please enter appointment fee" },
              ]}
            >
              <InputNumber
                placeholder="Enter appointment fee"
                type="number"
                style={{
                  width: "100%",
                  borderRadius: 8,
                  padding: "0.2rem",
                  border: "1px solid #1C4792",
                }}
              />
            </Form.Item>
          </>
        )}
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
    </Form>
  );
};

export default Step2Component;

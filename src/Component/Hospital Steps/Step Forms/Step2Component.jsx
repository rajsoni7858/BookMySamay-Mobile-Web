import React from "react";
import { Button, Form, Input, InputNumber, Select, Typography } from "antd";

const { Title } = Typography;

const Step2Component = ({ form, formId, onNext }) => {
  const handleNext = async () => {
    onNext();
    // try {
    //   await form.validateFields().then((values) => {
    //     console.log("hi ronak", values);
    //     onNext();
    //   });
    // } catch (errorInfo) {
    //   console.log("Validation failed:", errorInfo);
    // }
  };

  return (
    <Form
      form={form}
      id={formId}
      layout="vertical"
      style={{ display: "flex", flex: 1, flexDirection: "column" }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <Title
          level={5}
          style={{
            textAlign: "center",
            margin: 0,
            padding: "1.4rem 0rem",
            fontFamily: "Inter",
          }}
        >
          Here you need to fill the Marketing details
        </Title>

        {/* Content */}
        <Form.Item
          label="Marketing time slots:"
          name="general_timeslot"
          rules={[
            {
              required: true,
              message: "Please select marketing time slots",
            },
          ]}
        >
          <Select
            placeholder="select marketing time slots"
            style={{ fontFamily: "Poppins", height: "38px" }}
            options={[
              { value: "15", label: "15" },
              { value: "30", label: "30" },
              { value: "45", label: "45" },
              { value: "60", label: "60" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Total Number of Appointment:"
          name="shopLocation"
          rules={[
            {
              required: true,
              message: "Please enter total number of appointment",
            },
          ]}
        >
          <InputNumber
            placeholder="Enter  number of appointment"
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
          name="shopLocation"
          rules={[
            {
              required: true,
              message: "Please enter appointment fee",
            },
          ]}
        >
          <InputNumber
            placeholder="Enter appointment fee"
            style={{
              width: "100%",
              borderRadius: 8,
              padding: "0.2rem",
              border: "1px solid #1C4792",
            }}
          />
        </Form.Item>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "1.5rem",
        }}
      >
        <Button
          style={{
            width: "80%",
            background: "#1C4792",
            borderRadius: "12px",
            fontFamily: "Poppins",
            height: "2.5rem",
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

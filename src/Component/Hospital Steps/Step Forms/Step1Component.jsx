import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber, Select, Typography } from "antd";

const { Title } = Typography;

const Step1Component = ({ form, formId, onNext }) => {
  const storedData = JSON.parse(localStorage.getItem("salon"));

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

  useEffect(() => {
    if (storedData) {
      form.setFieldsValue(storedData);
    }
  }, [form, storedData]);

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
          Here you need to fill the hospital details
        </Title>

        {/* Content */}
        <Form.Item
          label="Hospital Name:"
          name="name"
          rules={[{ required: true, message: "Please enter hospital name" }]}
        >
          <Input placeholder="Enter hospital name" />
        </Form.Item>
        {/* <Form.Item
          label="Hospital Speciality:"
          name="shopOwner"
          rules={[
            { required: true, message: "Please enter hospital speciality" },
          ]}
        >
          <Input placeholder="Enter hospital speciality" />
        </Form.Item> */}
        <Form.Item
          label="Current Location:"
          name="location_name"
          rules={[
            { required: true, message: "Please select current location" },
          ]}
        >
          <Input placeholder="Enter hospital location" />
        </Form.Item>
        <Form.Item
          label="Hospital Address:"
          name="address"
          rules={[{ required: true, message: "Please enter hospital Address" }]}
        >
          <Input placeholder="Enter hospital address" />
        </Form.Item>
        <Form.Item
          label="Mobile No:"
          name="mobile_number"
          rules={[{ required: true, message: "Please enter mobile number" }]}
        >
          <Input placeholder="Enter mobile no." />
        </Form.Item>
        <Form.Item
          label="Number of Doctors:"
          name="staff_count"
          rules={[
            { required: true, message: "Please enter number of doctors" },
          ]}
        >
          <Input placeholder="Enter number of doctors" />
        </Form.Item>
        <Form.Item
          label="Time slots taken for patient:"
          name="slot_duration"
          rules={[
            {
              required: true,
              message: "Please select time slots taken for patient",
            },
          ]}
        >
          <Select
            placeholder="select time slots taken for patient"
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
          label="Old Case Consultation Fee:"
          name="old_case_fee"
          rules={[
            {
              required: true,
              message: "Please enter old case consultation fee",
            },
          ]}
        >
          <InputNumber
            placeholder="As per case"
            style={{
              width: "100%",
              borderRadius: 8,
              padding: "0.2rem",
              border: "1px solid #1C4792",
            }}
          />
        </Form.Item>
        <Form.Item
          label="New Case Consultation Fee:"
          name="new_case_fee"
          rules={[
            {
              required: true,
              message: "Please enter new case consultation fee",
            },
          ]}
        >
          <InputNumber
            placeholder="As per case"
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

export default Step1Component;

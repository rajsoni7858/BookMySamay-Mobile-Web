import React from "react";
import {
  Button,
  Form,
  InputNumber,
  Select,
  TimePicker,
  Typography,
} from "antd";
import CustomBreadcrumb from "../../Breadcrumb/CustomBreadcrumbComponent";

const { Title } = Typography;

const Step2Component = ({ form, formId, onPrevious, onNext }) => {
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
          paddingTop: "0.6rem",
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <CustomBreadcrumb
          items={[
            {
              title: "Hospitals",
            },
            {
              title: "Application Center",
            },
            {
              title:
                formId === "editHospitalForm"
                  ? "Edit Hospital"
                  : "Add Hospital",
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item
            label="Day"
            name="day"
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
            label="Opening Time"
            name="openingTime"
            style={{ width: "32%" }}
            rules={[{ required: true, message: "Please select opening time" }]}
          >
            <TimePicker
              style={{ width: "100%", height: "38px" }}
              format="h:mm a"
              minuteStep={15}
              placeholder="Select Time"
            />
          </Form.Item>
          <Form.Item
            label="Closing Time"
            name="closingTime"
            style={{ width: "32%" }}
            rules={[{ required: true, message: "Please select closing time" }]}
          >
            <TimePicker
              style={{ width: "100%", height: "38px" }}
              format="h:mm a"
              minuteStep={15}
              placeholder="Select Time"
            />
          </Form.Item>
        </div>
        <Form.Item
          label="Total Number of Appointment:"
          name="totalAppointment"
          rules={[
            {
              required: true,
              message: "Please enter total number of appointment",
            },
          ]}
        >
          <InputNumber
            placeholder="Enter number of appointment"
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
          name="appointmentFee"
          rules={[{ required: true, message: "Please enter appointment fee" }]}
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

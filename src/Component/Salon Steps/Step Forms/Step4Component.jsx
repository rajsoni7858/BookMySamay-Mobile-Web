import React from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CustomBreadcrumb from "../../Breadcrumb/CustomBreadcrumbComponent";

const { Title } = Typography;

const Step4Component = ({ formId }) => {
  const history = useHistory();

  const handleFinish = () => {
    message.success("Form submitted successfully!");
    history.push("/salons");
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
          flexDirection: "column",
          flex: 1,
        }}
      >
        <CustomBreadcrumb
          items={[
            {
              title: "Salons",
            },
            {
              title: "Application Center",
            },
            {
              title: formId === "editForm" ? "Edit Salon" : "Add Salon",
            },
          ]}
          path={"/salons"}
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
          Payment Method
        </Title>

        {/* Content */}
        <Form.Item
          name="upiMode"
          rules={[{ required: true, message: "Please select UPI mode" }]}
          style={{ marginBottom: "3rem" }}
        >
          <Input placeholder="Enter your UPI here" />
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
          onClick={handleFinish}
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

export default Step4Component;

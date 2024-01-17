// MultiStepForm.js
import React, { useState } from "react";
import { Form, Button, Steps, message } from "antd";
import BasicDetailsForm from "./MultiStep1Form";
import ImageUploadForm from "./MultiStep2Form";
import ServicesSelectionForm from "./MultiStep3Form";
import UpiPaymentForm from "./MultiStep4Form";
import { CheckOutlined } from "@ant-design/icons";

const { Step } = Steps;

const MultiStepForm = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { content: <BasicDetailsForm /> },
    { content: <ImageUploadForm /> },
    { content: <ServicesSelectionForm /> },
    { content: <UpiPaymentForm /> },
    // Add more steps as needed
  ];

  const handleNext = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    });
  };

  const handleFinish = () => {
    form.validateFields().then((values) => {
      // Handle submission logic
      message.success("Form submitted successfully!");
      console.log(values);
    });
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      layout="vertical"
      style={{ paddingTop: 50, margin: 20 }}
    >
      <Steps current={currentStep}>
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>
      <div style={{ marginTop: "16px", padding: 20 }}>
        {steps[currentStep].content}
      </div>
      <div style={{ marginTop: "16px" }}>
        {currentStep < steps.length - 1 && (
          <Button
            style={{ width: "80%", background: "#1C4792", margin: 20 }}
            type="primary"
            onClick={handleNext}
          >
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button
            style={{ width: "80%", background: "#1C4792", margin: 20 }}
            type="primary"
            htmlType="submit"
          >
            Submit
            <CheckOutlined />
          </Button>
        )}
      </div>
    </Form>
  );
};
export default MultiStepForm;

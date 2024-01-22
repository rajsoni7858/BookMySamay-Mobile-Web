import React, { useState } from "react";
import { Form, Button, Steps, message } from "antd";
import Step1Component from "./Step Forms/Step1Component";
import Step2Component from "./Step Forms/Step2Component";
import Step3Component from "./Step Forms/Step3Component";
import Step4Component from "./Step Forms/Step4Component";
import "./Step.css";

const { Step } = Steps;

const MultiStepFormComponent = ({ form, formId }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 1, content: <Step1Component /> },
    { id: 2, content: <Step2Component /> },
    { id: 3, content: <Step3Component /> },
    { id: 4, content: <Step4Component /> },
  ];

  const handleNext = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    });
  };

  const handleFinish = () => {
    form.validateFields().then((values) => {
      message.success("Form submitted successfully!");
      console.log(values);
    });
  };

  return (
    <Form
      form={form}
      id={formId}
      onFinish={handleFinish}
      layout="vertical"
      style={{ margin: "2rem", padding: 0 }}
    >
      {/* Steps */}
      <Steps
        current={currentStep}
        responsive={false}
        style={{ padding: "1rem 0rem" }}
      >
        {steps.map((step) => (
          <Step key={step.id} title={null} />
        ))}
      </Steps>

      {/* Content */}
      <div>{steps[currentStep].content}</div>
      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        {currentStep < steps.length - 1 && (
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
        )}
        {currentStep === steps.length - 1 && (
          <Button
            style={{
              width: "80%",
              background: "#1C4792",
              borderRadius: "12px",
              fontFamily: "Poppins",
              height: "2.5rem",
            }}
            type="primary"
            htmlType="submit"
          >
            SUBMIT
          </Button>
        )}
      </div>
    </Form>
  );
};
export default MultiStepFormComponent;

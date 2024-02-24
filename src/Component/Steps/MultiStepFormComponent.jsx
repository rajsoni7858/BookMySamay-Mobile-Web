import React, { useState } from "react";
import { Form, Button, Steps, message } from "antd";
import Step1Component from "./Step Forms/Step1Component";
import Step3Component from "./Step Forms/Step3Component";
import Step2Component from "./Step Forms/Step2Component";
import Step4Component from "./Step Forms/Step4Component";
import { useHistory } from "react-router-dom";
import "./Step.css";

const { Step } = Steps;

const MultiStepFormComponent = ({ form, formId }) => {
  let history = useHistory();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 1,
      content: (
        <Step1Component
          form={form}
          onNext={() => setCurrentStep(currentStep + 1)}
        />
      ),
    },
    {
      id: 2,
      content: (
        <Step2Component
          form={form}
          onNext={() => setCurrentStep(currentStep + 1)}
        />
      ),
    },
    {
      id: 3,
      content: (
        <Step3Component
          form={form}
          onNext={() => setCurrentStep(currentStep + 1)}
        />
      ),
    },
    {
      id: 4,
      content: (
        <Step4Component
          form={form}
          onNext={() => setCurrentStep(currentStep + 1)}
        />
      ),
    },
  ];

  const handleNext = async () => {
    try {
      // await form.validateFields().then((values) => {
      //   console.log("hi ronak", values);
      // });
      setCurrentStep(currentStep + 1);
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  const handleFinish = () => {
    form.validateFields().then((values) => {
      message.success("Form submitted successfully!");
    });
    history.push("/shops");
  };

  return (
    <Form
      form={form}
      id={formId}
      onFinish={handleFinish}
      layout="vertical"
      style={{ margin: "1.4rem", padding: 0 }}
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
      <div style={{ minHeight: "calc(100vh - 250px)" }}>
        {steps[currentStep].content}
      </div>

      {/* Button */}
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
            onClick={handleFinish}
          >
            SUBMIT
          </Button>
        )}
      </div>
    </Form>
  );
};
export default MultiStepFormComponent;

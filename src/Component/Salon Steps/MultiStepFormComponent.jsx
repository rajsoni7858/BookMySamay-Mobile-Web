import React, { useEffect, useState } from "react";
import { Steps } from "antd";
import Step1Component from "./Step Forms/Step1Component";
import Step3Component from "./Step Forms/Step3Component";
import Step2Component from "./Step Forms/Step2Component";
import Step4Component from "./Step Forms/Step4Component";
import "./Step.css";

const { Step } = Steps;

const MultiStepFormComponent = ({ form, formId }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 1,
      content: (
        <Step1Component
          form={form}
          formId={formId}
          onNext={() =>
            setCurrentStep((prevStep) => {
              const nextStep = prevStep + 1;
              window.location.hash = `#${nextStep + 1}`;
              return nextStep;
            })
          }
        />
      ),
    },
    {
      id: 2,
      content: (
        <Step2Component
          form={form}
          formId={formId}
          onNext={() =>
            setCurrentStep((prevStep) => {
              const nextStep = prevStep + 1;
              window.location.hash = `#${nextStep + 1}`;
              return nextStep;
            })
          }
        />
      ),
    },
    {
      id: 3,
      content: (
        <Step3Component
          form={form}
          formId={formId}
          onNext={() =>
            setCurrentStep((prevStep) => {
              const nextStep = prevStep + 1;
              window.location.hash = `#${nextStep + 1}`;
              return nextStep;
            })
          }
        />
      ),
    },
    {
      id: 4,
      content: (
        <Step4Component
          form={form}
          formId={formId}
          onNext={() =>
            setCurrentStep((prevStep) => {
              const nextStep = prevStep + 1;
              window.location.hash = `#${nextStep + 1}`;
              return nextStep;
            })
          }
        />
      ),
    },
  ];

  useEffect(() => {
    // Listen for hash changes
    const handleHashChange = () => {
      const step = parseInt(window.location.hash.replace("#", ""), 10) - 1;
      if (!isNaN(step) && step !== currentStep) {
        setCurrentStep(step);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [currentStep]);

  useEffect(() => {
    // Listen for popstate event (browser back/forward)
    const handlePopState = () => {
      const step = parseInt(window.location.hash.replace("#", ""), 10) - 1;
      if (!isNaN(step) && step !== currentStep) {
        setCurrentStep(step);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [currentStep]);

  return (
    <div style={{ margin: "1.4rem", padding: 0 }}>
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
      <div
        style={{ display: "flex", flex: 1, minHeight: "calc(100vh - 165px)" }}
      >
        {steps[currentStep].content}
      </div>
    </div>
  );
};
export default MultiStepFormComponent;

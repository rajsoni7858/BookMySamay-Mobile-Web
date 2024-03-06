import React, { useEffect, useState } from "react";
import { Spin, Steps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Step1Component from "./Step Forms/Step1Component";
import Step3Component from "./Step Forms/Step3Component";
import Step2Component from "./Step Forms/Step2Component";
import Step4Component from "./Step Forms/Step4Component";
import "./Step.css";
import LoadParams from "../../models/LoadParams";
import { loadShop } from "../../redux/actions/shopActions";

const { Step } = Steps;

const MultiStepFormComponent = ({ form, formId }) => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const shopLoading = useSelector((state) => state.LoadShop);
  const [currentStep, setCurrentStep] = useState(0);

  const handlePrevious = () => {
    setCurrentStep((prevStep) => {
      const nextStep = prevStep;
      window.location.hash = `#${nextStep}`;
      return nextStep;
    });
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      const nextStep = prevStep + 1;
      window.location.hash = `#${nextStep + 1}`;
      return nextStep;
    });
  };

  const steps = [
    {
      id: 1,
      content: (
        <Step1Component form={form} formId={formId} onNext={handleNext} />
      ),
    },
    {
      id: 2,
      content: (
        <Step2Component
          form={form}
          formId={formId}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      ),
    },
    {
      id: 3,
      content: (
        <Step3Component
          form={form}
          formId={formId}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      ),
    },
    {
      id: 4,
      content: (
        <Step4Component
          form={form}
          formId={formId}
          onPrevious={handlePrevious}
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

  const handleLoadShopSuccessed = (data) => {
    const updatedData = {
      ...data[0],
      ...data[0].shop_operational_details,
      owner_name: data[0].staff.name,
      mobile_number: data[0].staff.mobile_number,
    };
    delete updatedData.mr_fee;
    delete updatedData.new_case_fee;
    delete updatedData.old_case_fee;
    localStorage.setItem("salon", JSON.stringify(updatedData));
  };

  useEffect(() => {
    if (formId === "editForm") {
      dispatch(
        loadShop(new LoadParams({ id }, handleLoadShopSuccessed, () => {}))
      );
    }
  }, []);

  return (
    <div>
      {shopLoading ? (
        <div className="common__wrapper">
          <Spin size="large" />
        </div>
      ) : (
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
            style={{
              display: "flex",
              flex: 1,
              minHeight: "calc(100vh - 165px)",
            }}
          >
            {steps[currentStep].content}
          </div>
        </div>
      )}
    </div>
  );
};
export default MultiStepFormComponent;

import React, { useEffect, useState } from "react";
import { Spin, Steps } from "antd";
import Step1Component from "./Step Forms/Step1Component";
import Step2Component from "./Step Forms/Step2Component";
import Step3Component from "./Step Forms/Step3Component";
import Step4Component from "./Step Forms/Step4Component";
import Step5Component from "./Step Forms/Step5Component";
import { useDispatch, useSelector } from "react-redux";
import { loadShop } from "../../redux/actions/shopActions";
import LoadParams from "../../models/LoadParams";
import { useParams } from "react-router-dom";
import "./Step.css";

const { Step } = Steps;

const MultiStepHospitalFormComponent = ({ form, formId }) => {
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
          onNext={handleNext}
        />
      ),
    },
    {
      id: 5,
      content: (
        <Step5Component
          form={form}
          formId={formId}
          onPrevious={handlePrevious}
        />
      ),
    },
  ];

  const handleLoadShopSuccessed = (data) => {
    const marketingDetails = data?.shop_daily_operational_details?.filter(
      (detail) => detail.op_type === "Marketing"
    );
    const patientDetails = data?.shop_daily_operational_details?.filter(
      (detail) => detail.op_type === "Patient"
    );

    const mrDetails =
      marketingDetails?.length > 0
        ? {
            mr_details: marketingDetails[0],
            day_of_week: marketingDetails[0]?.day_of_week,
            opening_time: marketingDetails[0]?.opening_time,
            closing_time: marketingDetails[0]?.closing_time,
            detail_id: marketingDetails[0]?.detail_id,
          }
        : {};

    const updatedData = {
      ...data,
      ...data.shop_operational_details,
      ...mrDetails,
      shop_daily_operational_details: patientDetails,
      owner_name: data.staff.name,
      mobile_number: data.staff.mobile_number,
      location_name: `${data.location_name} - ${data.postcode}`,
    };
    sessionStorage.setItem("salon", JSON.stringify(updatedData));
  };

  useEffect(() => {
    if (currentStep === 0) {
      window.location.hash = "#1";
    }
  }, [currentStep]);

  useEffect(() => {
    if (formId === "editHospitalForm") {
      dispatch(
        loadShop(new LoadParams({ id }, handleLoadShopSuccessed, () => {}))
      );
    }
  }, []);

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
    <div style={{ backgroundColor: "white", marginBottom: "1.4rem" }}>
      {shopLoading ? (
        <div className="common__wrapper">
          <Spin size="large" />
        </div>
      ) : (
        <div
          style={{
            margin: "0 1.4rem",
            backgroundColor: "white",
          }}
        >
          {/* Steps */}
          <div
            style={{
              backgroundColor: "white",
              position: "sticky",
              top: 54.5,
              zIndex: 1000,
              paddingTop: "2.4rem",
              paddingBottom: "1.4rem",
            }}
          >
            <Steps current={currentStep} responsive={false}>
              {steps.map((step) => (
                <Step key={step.id} title={null} />
              ))}
            </Steps>
          </div>

          {/* Content */}
          <div
            style={{
              display: "flex",
              flex: 1,
              minHeight: "calc(100dvh - 170px)",
              overflow: "auto",
            }}
          >
            {steps[currentStep].content}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiStepHospitalFormComponent;

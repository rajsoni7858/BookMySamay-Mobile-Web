import React from "react";
import { Form } from "antd";
import MultiStepHospitalFormComponent from "../../../Component/Hospital Steps/MultiStepHospitalFormComponent";

function AddHospitalComponent() {
  const [form] = Form.useForm();
  return (
    <MultiStepHospitalFormComponent form={form} formId="addHospitalForm" />
  );
}

export default AddHospitalComponent;

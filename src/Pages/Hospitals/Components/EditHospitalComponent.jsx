import React from "react";
import { Form } from "antd";
import MultiStepHospitalFormComponent from "../../../Component/Hospital Steps/MultiStepHospitalFormComponent";

function EditHospitalComponent() {
  const [form] = Form.useForm();
  return (
    <MultiStepHospitalFormComponent form={form} formId="editHospitalForm" />
  );
}

export default EditHospitalComponent;

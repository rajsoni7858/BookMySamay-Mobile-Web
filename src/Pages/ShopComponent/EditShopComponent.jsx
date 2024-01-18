import React from "react";
import MultiStepForm from "../../Component/MultiStepComponent/MultiStepForm";
import { Form } from "antd";

function Editshop() {
  const [form] = Form.useForm();

  return <MultiStepForm form={form} formId="editForm" />;
}

export default Editshop;

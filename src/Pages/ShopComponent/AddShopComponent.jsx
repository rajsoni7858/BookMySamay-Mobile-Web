import React from "react";
import MultiStepForm from "../../Component/MultiStepComponent/MultiStepForm";
import { Form } from "antd";
function AddShop() {
  const [form] = Form.useForm();
  return <MultiStepForm form={form} formId="addform" />;
}

export default AddShop;

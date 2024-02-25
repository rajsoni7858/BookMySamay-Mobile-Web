import React from "react";
import { Form } from "antd";
import MultiStepFormComponent from "../../../Component/Salon Steps/MultiStepFormComponent";

function AddShopComponent() {
  const [form] = Form.useForm();
  return <MultiStepFormComponent form={form} formId="addform" />;
}

export default AddShopComponent;

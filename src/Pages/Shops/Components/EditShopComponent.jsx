import React from "react";
import { Form } from "antd";
import MultiStepFormComponent from "../../../Component/Salon Steps/MultiStepFormComponent";

function EditshopComponent() {
  const [form] = Form.useForm();

  return <MultiStepFormComponent form={form} formId="editForm" />;
}

export default EditshopComponent;

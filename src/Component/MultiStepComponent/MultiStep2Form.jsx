// ImageUploadForm.js
import React from "react";
import { Form, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ImageUploadForm = () => {
  return (
    <>
      <h5
        style={{
          fontSize: 17,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Upload Your shop images here
      </h5>
      <Form.Item
        style={{ padding: 20 }}
        label="Upload Image"
        name="image"
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
        rules={[{ required: true, message: "Please upload an image" }]}
      >
        <Upload beforeUpload={() => false} listType="picture">
          <Button icon={<UploadOutlined />}>Browse to select file</Button>
          <div
            style={{
              paddingTop: 50,
              fontSize: 15,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Image Preview
          </div>
        </Upload>
      </Form.Item>
    </>
  );
};

export default ImageUploadForm;

import React from "react";
import { Form, Upload, Typography, message } from "antd";

const { Title, Text } = Typography;
const { Dragger } = Upload;

const Step2Component = () => {
  const props = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      <Title
        level={5}
        style={{
          textAlign: "center",
          margin: 0,
          padding: "1.4rem 0rem",
          fontFamily: "Inter",
        }}
      >
        Upload Your shop images here
      </Title>

      {/* Content */}
      <Form.Item
        name="image"
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
        rules={[{ required: true, message: "Please upload an image" }]}
      >
        <Dragger {...props} listType="picture-card">
          <div className="drag-and-drop-text">
            <p>
              <img
                src={require("../../../Assets/Images/upload.png")}
                alt="Group Member Icon"
                className="upload-img"
              />
            </p>
            <Text style={{ fontFamily: "Poppins", fontSize: "0.75rem" }}>
              Browse to select file
            </Text>
          </div>
        </Dragger>
      </Form.Item>
    </>
  );
};

export default Step2Component;

import React from "react";
import { Form, Upload, Typography, message, Button } from "antd";
import CustomBreadcrumb from "../../Breadcrumb/CustomBreadcrumbComponent";

const { Title, Text } = Typography;
const { Dragger } = Upload;

const Step4Component = ({ formId, onPrevious, onNext }) => {
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

  const handleNext = async () => {
    onNext();
  };

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}
    >
      <div
        style={{
          paddingTop: "0.6rem",
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <CustomBreadcrumb
          items={[
            {
              title: "Hospitals",
            },
            {
              title: "Application Center",
            },
            {
              title:
                formId === "editHospitalForm"
                  ? "Edit Hospital"
                  : "Add Hospital",
            },
          ]}
          path={"/3/hospital"}
        />

        <Title
          level={5}
          style={{
            textAlign: "center",
            margin: 0,
            paddingTop: "0.4rem",
            paddingBottom: "1.4rem",
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
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1.5rem",
        }}
      >
        <Button
          style={{
            width: "100%",
            color: "#1C4792",
            borderColor: "#1C4792 !important",
            borderRadius: "12px",
            fontFamily: "Poppins",
            height: "2.5rem",
            marginRight: "0.4rem",
            background: "white !important",
          }}
          onClick={onPrevious}
        >
          PREVIOUS
        </Button>

        <Button
          style={{
            width: "100%",
            background: "#1C4792",
            borderRadius: "12px",
            fontFamily: "Poppins",
            height: "2.5rem",
            marginLeft: "0.4rem",
          }}
          type="primary"
          onClick={handleNext}
        >
          NEXT
        </Button>
      </div>
    </div>
  );
};

export default Step4Component;

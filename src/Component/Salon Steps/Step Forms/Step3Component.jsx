import React, { useState } from "react";
import { Form, Upload, Typography, message, Button } from "antd";
import CustomBreadcrumb from "../../Breadcrumb/CustomBreadcrumbComponent";
import { URL } from "../../../utils/utils";
import axios from "axios";

const { Title, Text } = Typography;
const { Dragger } = Upload;

const Step3Component = ({ formId, onPrevious, onNext }) => {
  const [images, setImages] = useState([]);
  const storedData = JSON.parse(localStorage.getItem("salon"));

  const handleSubmit = async (image) => {
    const formData = new FormData();
    formData.append(`image`, image);
    formData.append(`sequence`, 1);

    try {
      const response = await axios.post(
        URL + `admin/shops/upload/${storedData.shop_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload successful:", response.data);
      setImages([...images, response.data]);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const props = {
    name: "file",
    multiple: true,
    // action: `${URL}admin/shops/upload/${storedData.shop_id}`,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        handleSubmit(info.file.originFileObj);
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
              title: "Salons",
            },
            {
              title: storedData?.name,
            },
            {
              title: formId === "editForm" ? "Edit Salon" : "Add Salon",
            },
          ]}
          path={"/salons"}
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
            borderColor: "#1C4792",
            borderRadius: "12px",
            fontFamily: "Poppins",
            height: "2.5rem",
            marginRight: "0.4rem",
            background: "white",
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

export default Step3Component;

import React, { useEffect, useState } from "react";
import { Form, Upload, Typography, message, Button } from "antd";
import CustomBreadcrumb from "../../Breadcrumb/CustomBreadcrumbComponent";
import { useDispatch } from "react-redux";
import axios from "axios";
import { deleteImage } from "../../../redux/actions/imageActions";
import DeleteParams from "../../../models/DeleteParams";
import { URL } from "../../../utils/utils";

const { Title, Text } = Typography;
const { Dragger } = Upload;

const Step4Component = ({ formId, onPrevious, onNext }) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const storedData = JSON.parse(sessionStorage.getItem("salon"));

  const handleSubmit = async (image) => {
    const formData = new FormData();
    formData.append(`image`, image);
    formData.append(`sequence`, images.length + 1);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        URL + `admin/shops/upload/${storedData.shop_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setImages((prevImages) => [...prevImages, response.data.data]);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleRemoveSuccessed = (payload) => {
    const updatedImages = images.filter(
      (img) =>
        img.image_id !== payload.imgId || img.image_url !== payload.imageKey
    );

    sessionStorage.setItem(
      "salon",
      JSON.stringify({ ...storedData, images: updatedImages })
    );
    setImages(updatedImages);
  };

  const handleRemove = (img) => {
    const payload = {
      imageKey: img.name,
      id: storedData.shop_id,
      imgId: img.image_id,
    };
    dispatch(
      deleteImage(
        new DeleteParams(
          payload,
          () => {
            handleRemoveSuccessed(payload);
          },
          () => {}
        )
      )
    );
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const props = {
    name: "file",
    multiple: true,
    onChange(info) {
      const { status } = info.file;
      if (status === "uploading" || status === "done") {
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
    sessionStorage.setItem(
      "salon",
      JSON.stringify({ ...storedData, images: images })
    );

    onNext();
  };

  useEffect(() => {
    if (storedData && storedData.images) {
      setImages(storedData.images);
    }
  }, []);

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
              title: "Hospital",
            },
            {
              title: storedData?.name,
            },
            {
              title: formId === "editHospitalForm" ? "Edit" : "Add",
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
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Dragger
            customRequest={dummyRequest}
            listType="picture-card"
            fileList={images.map((url, index) => ({
              image_id: url.image_id,
              uid: index,
              name: url.image_url || url.imageUrl,
              status: "done",
              url:
                "https://bookmysamay-data.s3.ap-south-1.amazonaws.com/" +
                  url.image_url || url.imageUrl,
            }))}
            onRemove={handleRemove}
            {...props}
          >
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

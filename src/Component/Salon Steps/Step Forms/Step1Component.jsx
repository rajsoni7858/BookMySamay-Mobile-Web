import React from "react";
import { Button, Form, Input, Select, Typography } from "antd";

const { Title } = Typography;

const Step1Component = ({ form, formId, onNext }) => {
  const handleNext = async () => {
    onNext();
    // try {
    //   await form.validateFields().then((values) => {
    //     console.log("hi ronak", values);
    //     onNext();
    //   });
    // } catch (errorInfo) {
    //   console.log("Validation failed:", errorInfo);
    // }
  };

  return (
    <Form
      form={form}
      id={formId}
      layout="vertical"
      style={{ display: "flex", flex: 1, flexDirection: "column" }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <Title
          level={5}
          style={{
            textAlign: "center",
            margin: 0,
            padding: "1.4rem 0rem",
            fontFamily: "Inter",
          }}
        >
          Here you need to fill the shop details
        </Title>

        {/* Content */}
        <Form.Item
          label="Shop Name:"
          name="shopName"
          rules={[{ required: true, message: "Please enter shop name" }]}
        >
          <Input placeholder="Enter shop name" />
        </Form.Item>
        <Form.Item
          label="Shop Owner:"
          name="shopOwner"
          rules={[{ required: true, message: "Please enter shop owner" }]}
        >
          <Input placeholder="Enter shop Owner" />
        </Form.Item>
        <Form.Item
          label="Shop Location:"
          name="shopLocation"
          rules={[{ required: true, message: "Please enter shop location" }]}
        >
          <Input placeholder="Enter shop location" />
        </Form.Item>
        <Form.Item
          label="Set Location:"
          name="setLocation"
          rules={[{ required: true, message: "Please enter set location" }]}
        >
          <Input placeholder="Enter set location " />
        </Form.Item>
        <Form.Item
          label="Services offered:"
          name="service_type"
          rules={[{ required: true, message: "Please select service" }]}
        >
          <Select
            mode="multiple"
            placeholder="men, women, unisex"
            style={{ fontFamily: "Poppins", height: "38px" }}
            options={[
              { value: "men", label: "Men" },
              { value: "women", label: "Women" },
              { value: "unisex", label: "Unisex" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="General Time Slot:"
          name="general_timeslot"
          rules={[
            { required: true, message: "Please select general time slot" },
          ]}
        >
          <Select
            placeholder="select general time slot"
            style={{ fontFamily: "Poppins", height: "38px" }}
            options={[
              { value: "15", label: "15" },
              { value: "30", label: "30" },
              { value: "45", label: "45" },
              { value: "60", label: "60" },
            ]}
          />
        </Form.Item>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "1.5rem",
        }}
      >
        <Button
          style={{
            width: "80%",
            background: "#1C4792",
            borderRadius: "12px",
            fontFamily: "Poppins",
            height: "2.5rem",
          }}
          type="primary"
          onClick={handleNext}
        >
          NEXT
        </Button>
      </div>
    </Form>
  );
};

export default Step1Component;

import React from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CustomBreadcrumb from "../../Breadcrumb/CustomBreadcrumbComponent";
import { updateShop } from "../../../redux/actions/shopActions";
import SaveParams from "../../../models/SaveParams";
import { useDispatch } from "react-redux";

const { Title } = Typography;

const Step4Component = ({ form, formId, onPrevious }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const storedData = JSON.parse(localStorage.getItem("salon"));

  const handleShopSuccessed = () => {
    message.success("Form submitted successfully!");
    localStorage.removeItem("salon");
    history.push("/salons");
  };

  const handleFinish = () => {
    form
      .validateFields()
      .then((values) => {
        const payload = {
          ...storedData,
          shop_operational_details: {
            op_type: storedData.op_type,
            slot_duration: storedData.slot_duration,
            upi_id: values.upi_id,
          },
        };

        dispatch(
          updateShop(new SaveParams(payload, handleShopSuccessed, () => {}))
        );
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  return (
    <div
      style={{
        paddingTop: "0.6rem",
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        style={{ display: "flex", flex: 1, flexDirection: "column" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
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
            Payment Method
          </Title>

          {/* Content */}
          <Form.Item
            name="upi_id"
            rules={[{ required: true, message: "Please select UPI mode" }]}
            style={{ marginBottom: "3rem" }}
          >
            <Input placeholder="Enter your UPI here" />
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
            onClick={handleFinish}
          >
            SUBMIT
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Step4Component;

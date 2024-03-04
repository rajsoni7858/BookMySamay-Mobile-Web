import { useState, useCallback } from "react";
import { Input, InputNumber, Button, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import "./Services.css";
import CustomBreadcrumb from "../../Component/Breadcrumb/CustomBreadcrumbComponent";

const { Text, Title } = Typography;

const sampleData = {
  type: "Face Treatment",
  sub_services: [
    { name: "Hair Cut" },
    { name: "Hair Cut" },
    { name: "Hair Cut" },
    { name: "Hair Cut" },
  ],
};

const ServiceDetailsComponent = () => {
  const [data, setData] = useState(sampleData);

  const handleInputChange = useCallback((value, subServiceIndex, key) => {
    setData((prevData) => {
      const newData = { ...prevData };
      newData.sub_services[subServiceIndex][key] = value;
      return newData;
    });
  }, []);

  const handleCheckboxChange = useCallback((subServiceIndex, checked) => {
    setData((prevData) => {
      const newData = { ...prevData };
      newData.sub_services[subServiceIndex].selected = checked;
      return newData;
    });
  }, []);

  const handleAddExtra = useCallback(() => {
    setData((prevData) => {
      const newData = { ...prevData };
      newData.sub_services.push({
        name: "",
        time: "",
        charge: "",
        selected: false,
      });
      return newData;
    });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#FAFAFA",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        minHeight: "calc(100vh - 88px)",
        padding: "0 1.4rem",
        paddingTop: "2rem",
      }}
    >
      <CustomBreadcrumb
        items={[
          {
            title: "Salons",
          },
          {
            title: "Application Center",
          },
          {
            title: "Services",
          },
        ]}
        path={"/salons"}
      />

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
            paddingTop: "0.5rem",
            paddingBottom: "0.4rem",
            marginBottom: "1rem",
            fontFamily: "Inter",
            borderBottom: "1px solid #C1C1C1",
          }}
        >
          {data.type}
        </Title>

        {data &&
          data.sub_services.map((subService, subServiceIndex) => (
            <div
              key={subServiceIndex}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              {!subService.name ? (
                <Input
                  placeholder="Enter other services"
                  value={subService.name}
                  onChange={(e) =>
                    handleInputChange(e.target.value, subServiceIndex, "name")
                  }
                  style={{
                    width: "41%",
                    fontFamily: "Poppins",
                    borderRadius: 8,
                    padding: "0.35rem",
                    border: "1px solid #1C4792",
                  }}
                />
              ) : (
                <Text
                  style={{
                    fontFamily: "Poppins",
                    color: "black",
                    fontSize: "15px",
                    width: "41%",
                  }}
                >
                  {subService.name}
                </Text>
              )}
              <InputNumber
                placeholder="Time in min"
                value={subService.time}
                onChange={(value) =>
                  handleInputChange(value, subServiceIndex, "time")
                }
                style={{
                  width: "23%",
                  borderRadius: 8,
                  padding: "0.1rem",
                  border: "1px solid #1C4792",
                }}
              />
              <InputNumber
                placeholder="Charges"
                value={subService.charge}
                onChange={(value) =>
                  handleInputChange(value, subServiceIndex, "charge")
                }
                style={{
                  width: "23%",
                  borderRadius: 8,
                  padding: "0.1rem",
                  border: "1px solid #1C4792",
                }}
              />
              <input
                type="checkbox"
                id="checkbox"
                checked={subService.selected}
                onChange={(e) =>
                  handleCheckboxChange(subServiceIndex, e.target.checked)
                }
              />
            </div>
          ))}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <Button
            type="text"
            onClick={handleAddExtra}
            style={{
              borderRadius: "8px",
              backgroundColor: "rgb(235 235 235)",
              fontFamily: "Poppins",
              paddingTop: "5px",
            }}
          >
            <PlusCircleOutlined size="large" style={{ fontSize: "16px" }} /> Add
            Other Services
          </Button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: "0.8rem",
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
          // onClick={handleNext}
        >
          SAVE
        </Button>
      </div>
    </div>
  );
};

export default ServiceDetailsComponent;

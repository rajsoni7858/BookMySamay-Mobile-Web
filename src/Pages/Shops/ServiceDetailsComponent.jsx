import { useState, useCallback, useEffect } from "react";
import { Input, InputNumber, Button, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import "./Services.css";
import CustomBreadcrumb from "../../Component/Breadcrumb/CustomBreadcrumbComponent";
import { useDispatch, useSelector } from "react-redux";
import { loadServicesSucceeded } from "../../redux/actions";
import { useHistory, useParams } from "react-router-dom";

const { Text, Title } = Typography;

const ServiceDetailsComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  const serviceData = useSelector((state) => state.LoadServices);
  const storedData = JSON.parse(sessionStorage.getItem("service"));
  const selectedType = sessionStorage.getItem("type");
  const [data, setData] = useState();

  const handleInputChange = useCallback((value, subServiceIndex, key) => {
    setData((prevData) => {
      const newData = { ...prevData };
      newData.type[subServiceIndex][key] = value;
      return newData;
    });
  }, []);

  const handleCheckboxChange = useCallback((subServiceIndex, checked) => {
    setData((prevData) => {
      const newData = { ...prevData };
      newData.type[subServiceIndex].selected = checked;
      if (checked) {
        newData.type[subServiceIndex].shop_id = parseInt(id);
      } else {
        delete newData.type[subServiceIndex]?.shop_id;
      }
      return newData;
    });
  }, []);

  const handleAddExtra = useCallback(() => {
    setData((prevData) => {
      const newData = { ...prevData };
      newData.type.push({
        name: "",
        duration: "",
        price: "",
        selected: false,
      });
      return newData;
    });
  }, []);

  const handleSave = () => {
    const updatedServices = { ...serviceData };
    const selectedCount = data.type.reduce(
      (count, item) => (item.selected ? count + 1 : count),
      0
    );
    const filteredData = data.type.filter((item) => item.name);
    const serviceTypeArray =
      selectedType === "Women" ? "womenServices" : "menServices";

    updatedServices[serviceTypeArray] = updatedServices[serviceTypeArray].map(
      (service) => {
        if (service.service_type === data?.service_type) {
          return { ...filteredData, selectedCount };
        }
        return service;
      }
    );

    dispatch(loadServicesSucceeded(updatedServices));
    history.goBack();
    sessionStorage.removeItem("service");
    sessionStorage.removeItem("type");
  };

  useEffect(() => {
    if (storedData) {
      setData(storedData);
    }
  }, []);

  useEffect(() => {
    if (!serviceData.menServices.length && !serviceData.womenServices.length) {
      history.goBack();
    }
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
          {data?.service_type}
        </Title>

        {data &&
          data.type.map((subService, subServiceIndex) => (
            <div
              key={subServiceIndex}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              {subService.service_type_id ? (
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
              ) : (
                <Input
                  placeholder="Enter service name"
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
              )}
              <InputNumber
                placeholder="Time in min"
                value={subService.duration}
                onChange={(value) =>
                  handleInputChange(value, subServiceIndex, "duration")
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
                value={subService.price}
                onChange={(value) =>
                  handleInputChange(value, subServiceIndex, "price")
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
          onClick={handleSave}
        >
          SAVE
        </Button>
      </div>
    </div>
  );
};

export default ServiceDetailsComponent;

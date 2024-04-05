import { useState, useCallback, useEffect } from "react";
import { Input, InputNumber, Button, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import CustomBreadcrumb from "../../Component/Breadcrumb/CustomBreadcrumbComponent";
import { useDispatch, useSelector } from "react-redux";
import { loadServicesSucceeded, saveService } from "../../redux/actions";
import { useHistory, useParams } from "react-router-dom";
import { convertToTitleCase } from "../../utils/utils";
import "./Services.css";

const { Text, Title } = Typography;

const ServiceDetailsComponent = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { categoryId, category, id } = useParams();
  const servicesData = useSelector((state) => state.LoadServices);
  const selectedService = useSelector((state) => state.SaveService);
  const [data, setData] = useState({ type: [] });

  const { shopName } = props.location.state;

  useEffect(() => {
    return () => {
      dispatch(saveService({ type: null, service: null }));
    };
  }, []);

  useEffect(() => {
    if (selectedService && selectedService.service) {
      setData(selectedService.service);
    }
  }, [selectedService]);

  useEffect(() => {
    if (
      !servicesData.menServices.length &&
      !servicesData.womenServices.length
    ) {
      history.goBack();
    }
  }, [servicesData, history]);

  const handleInputChange = useCallback((value, subServiceIndex, key) => {
    setData((prevData) => {
      const newData = {
        ...prevData,
        type: prevData.type.map((item, index) => {
          if (index === subServiceIndex) {
            return {
              ...item,
              [key]: value,
            };
          }
          return item;
        }),
      };
      return newData;
    });
  }, []);

  const handleCheckboxChange = useCallback(
    (subServiceIndex, checked) => {
      setData((prevData) => {
        const newData = {
          ...prevData,
          type: prevData.type.map((item, index) => {
            if (index === subServiceIndex) {
              return {
                ...item,
                selected: checked,
                shop_id: checked ? parseInt(id) : undefined,
                gender: selectedService.type,
              };
            }
            return item;
          }),
        };
        return newData;
      });
    },
    [id]
  );

  const handleAddExtra = useCallback(() => {
    setData((prevData) => {
      const newData = {
        ...prevData,
        type: [
          ...prevData.type,
          {
            name: "",
            duration: "",
            price: "",
            selected: true,
            shop_id: parseInt(id),
            gender: selectedService.type,
            service_type_id: prevData.type[0].service_type_id,
          },
        ],
      };
      return newData;
    });
  }, []);

  const handleSave = () => {
    const filteredData = data.type.filter((item) => item.name);
    const serviceTypeArray =
      selectedService.type === "Women" ? "womenServices" : "menServices";
    const updatedServices = {
      ...servicesData,
      [serviceTypeArray]: servicesData[serviceTypeArray].map((service) => {
        if (service.service_type === data?.service_type) {
          return {
            ...service,
            type: filteredData,
            service_type: data.service_type,
            selected_count: filteredData.reduce(
              (count, item) => (item.selected ? count + 1 : count),
              0
            ),
          };
        }
        return service;
      }),
    };

    dispatch(loadServicesSucceeded(updatedServices));
    history.goBack();
  };

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
            title: convertToTitleCase(category),
          },
          {
            title: shopName,
          },
          {
            title: data?.service_type,
          },
          {
            title: "Services",
          },
        ]}
        path={`/${categoryId}/${category}`}
      />

      {data && (
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
            {data.service_type}
          </Title>

          {data.type.map((subService, subServiceIndex) => (
            <div
              key={subServiceIndex}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              {subService.service_id ? (
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
              <PlusCircleOutlined size="large" style={{ fontSize: "16px" }} />{" "}
              Add Other Services
            </Button>
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: "0.8rem",
          marginTop: "1.5rem",
        }}
      >
        <Button
          style={{
            width: "80%",
            color: "#1C4792",
            borderColor: "#1C4792",
            borderRadius: "12px",
            fontFamily: "Poppins",
            height: "2.5rem",
            marginRight: "1rem",
            background: "white",
          }}
          onClick={() => history.goBack()}
        >
          BACK
        </Button>
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

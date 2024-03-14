import { useState, useCallback, useEffect } from "react";
import {
  Tabs,
  Input,
  InputNumber,
  Button,
  Typography,
  message,
  Spin,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import CustomBreadcrumb from "../../Component/Breadcrumb/CustomBreadcrumbComponent";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadParams from "../../models/LoadParams";
import { loadServices, saveService, updateServices } from "../../redux/actions";
import SaveParams from "../../models/SaveParams";
import { convertToTitleCase } from "../../utils/utils";
import "./Services.css";

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Text } = Typography;

const ServicesComponent = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const serviceData = useSelector((state) => state.LoadServices);
  let { categoryId, category, id } = useParams();
  const [packages, setPackages] = useState([]);

  const samplePackage = {
    name: null,
    description: null,
    price: null,
    duration: null,
    shop_id: parseInt(id),
  };

  const { shopName } = props.location.state;

  const handleSubmit = () => {
    const filteredPackages = packages.filter((item) => item.name);
    dispatch(
      updateServices(
        new SaveParams(
          { ...serviceData, packages: filteredPackages },
          () => {
            history.goBack();
            message.success("Services updated successfully!");
          },
          () => {}
        )
      )
    );
  };

  const handleInputChange = useCallback((value, subServiceIndex, key) => {
    setPackages((prevData) => {
      const newData = [...prevData];
      newData[subServiceIndex][key] = value;
      return newData;
    });
  }, []);

  const handleAddExtra = useCallback(() => {
    setPackages((prevData) => {
      const newData = [...prevData];
      newData.push(samplePackage);
      return newData;
    });
  }, []);

  const handleLoadServicesSuccessed = (data) => {
    const updatedData =
      data.packages.length > 0 ? data.packages : [samplePackage];
    setPackages(updatedData);
  };

  useEffect(() => {
    if (!serviceData.menServices.length && !serviceData.womenServices.length) {
      dispatch(
        loadServices(
          new LoadParams({ id }, handleLoadServicesSuccessed, () => {})
        )
      );
    }

    if (serviceData.packages.length === 0) {
      setPackages([samplePackage]);
    }
  }, []);

  const renderServiceTab = (name, data, index) => {
    return (
      <TabPane tab={name} key={index}>
        {data.map((service, serviceIndex) => (
          <div
            key={serviceIndex}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.7rem",
              borderBottom: "1px solid #C1C1C1",
            }}
            onClick={() => {
              dispatch(saveService({ type: name, service }));
              history.push(
                `/${categoryId}/${category}/${id}/services/${serviceIndex + 1}`,
                { shopName }
              );
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins",
                color: "black",
                fontSize: "15px",
              }}
            >
              {service.service_type}
            </Text>
            {service?.selected_count > 0 && (
              <Text style={{ fontFamily: "Poppins" }}>
                {service.selected_count} services Added
              </Text>
            )}
          </div>
        ))}
      </TabPane>
    );
  };

  const renderPackageTab = (data, index) => {
    return (
      <TabPane tab={"Package"} key={index}>
        {data.map((subService, subServiceIndex) => (
          <div
            key={subServiceIndex}
            style={{
              paddingBottom: "0.4rem",
              marginBottom: "0.8rem",
              borderBottom: "1px solid #858181",
            }}
          >
            {/* Input for package name */}
            <Input
              placeholder="Package Name"
              value={subService.name}
              onChange={(e) =>
                handleInputChange(e.target.value, subServiceIndex, "name")
              }
              style={{
                marginBottom: "0.5rem",
                fontFamily: "Poppins",
                borderRadius: 8,
                padding: "0.4rem",
                paddingLeft: "0.6rem",
                border: "1px solid #1C4792",
              }}
            />
            {/* Inputs for time and charge */}
            <div
              style={{
                display: "flex",
                marginBottom: "0.5rem",
              }}
            >
              <InputNumber
                placeholder="Time in min"
                value={subService.duration}
                onChange={(value) =>
                  handleInputChange(value, subServiceIndex, "duration")
                }
                style={{
                  width: "50%",
                  marginRight: "0.5rem",
                  fontFamily: "Poppins",
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
                  width: "50%",
                  fontFamily: "Poppins",
                  borderRadius: 8,
                  padding: "0.1rem",
                  border: "1px solid #1C4792",
                }}
              />
            </div>
            {/* Textarea for package description */}
            <TextArea
              placeholder="Enter list of all services to add in a single package. Ex:- Hair, Beard, Facial, Massage."
              value={subService.description}
              onChange={(e) =>
                handleInputChange(
                  e.target.value,
                  subServiceIndex,
                  "description"
                )
              }
              autoSize={{ minRows: 3, maxRows: 5 }}
              style={{
                marginBottom: "0.5rem",
                fontFamily: "Poppins",
                borderRadius: 8,
                padding: "0.35rem",
                paddingLeft: "0.55rem",
                border: "1px solid #1C4792",
              }}
            />
          </div>
        ))}

        {/* Add Other Services button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
            Package
          </Button>
        </div>
      </TabPane>
    );
  };

  return (
    <div style={{ backgroundColor: "#FAFAFA" }}>
      {serviceData.loading ? (
        <div
          className="common__wrapper"
          style={{ height: "calc(100vh - 57px)" }}
        >
          <Spin size="large" />
        </div>
      ) : (
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
                title: "Services",
              },
            ]}
            path={`/${categoryId}/${category}`}
          />

          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
            }}
          >
            <Tabs
              defaultActiveKey="0"
              centered
              size="large"
              style={{
                marginTop: "0.5rem",
                marginBottom: "0.8rem",
                fontFamily: "Poppins",
              }}
              tabBarStyle={{
                backgroundColor: "#f0f2f5",
                borderRadius: "8px",
                paddingTop: "3px",
              }}
            >
              {serviceData.menServices.length > 0 &&
                renderServiceTab("Men", serviceData.menServices, 1)}
              {serviceData.womenServices.length > 0 &&
                renderServiceTab("Women", serviceData.womenServices, 2)}
              {renderPackageTab(packages, 3)}
            </Tabs>
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
              onClick={handleSubmit}
            >
              SUBMIT
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesComponent;

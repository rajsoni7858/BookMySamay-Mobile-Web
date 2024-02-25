import { useState, useCallback } from "react";
import { Tabs, Collapse, Input, InputNumber, Checkbox, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import "./Services.css";

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { TextArea } = Input;

const sampleData = [
  {
    tab: "Men",
    services: [
      {
        type: "Hair Treatment",
        sub_services: [{ name: "Hair Cut" }],
      },
      {
        type: "Face Treatment",
        sub_services: [
          { name: "Hair Cut" },
          { name: "Hair Cut" },
          { name: "Hair Cut" },
          { name: "Hair Cut" },
        ],
      },
    ],
  },
  {
    tab: "Women",
    services: [
      {
        type: "Hair Treatment",
        sub_services: [{ name: "Hair Cut" }],
      },
    ],
  },
  {
    tab: "Package",
    services: [
      {
        type: "Hair Treatment",
        sub_services: [{ name: "Hair Cut" }],
      },
    ],
  },
];

const ServicesComponent = () => {
  const [data, setData] = useState(sampleData);

  const handleInputChange = useCallback(
    (value, tabIndex, serviceIndex, subServiceIndex, key) => {
      setData((prevData) => {
        const newData = [...prevData];
        newData[tabIndex].services[serviceIndex].sub_services[subServiceIndex][
          key
        ] = value;
        return newData;
      });
    },
    []
  );

  const handleCheckboxChange = useCallback(
    (tabIndex, serviceIndex, subServiceIndex, checked) => {
      setData((prevData) => {
        const newData = [...prevData];
        newData[tabIndex].services[serviceIndex].sub_services[
          subServiceIndex
        ].selected = checked;
        return newData;
      });
    },
    []
  );

  const handleAddExtra = useCallback((tabIndex, serviceIndex) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[tabIndex].services[serviceIndex].sub_services.push({
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
        minHeight: "calc(100vh - 65px)",
      }}
    >
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
          style={{ margin: "1.4rem", fontFamily: "Poppins" }}
          tabBarStyle={{
            backgroundColor: "#f0f2f5",
            borderRadius: "8px",
            paddingTop: "3px",
          }}
        >
          {data.map((tab, tabIndex) => (
            <TabPane tab={tab.tab} key={tabIndex}>
              {tab.services.map((service, serviceIndex) =>
                tab.tab === "Package" ? (
                  <Collapse
                    key={serviceIndex}
                    bordered={false}
                    className="services"
                    defaultActiveKey={"0"}
                  >
                    <Panel
                      header={service.type}
                      key={serviceIndex}
                      showArrow={false}
                      className="services"
                    >
                      {/* Loop through sub services */}
                      {service.sub_services.map(
                        (subService, subServiceIndex) => (
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
                              value={subService.packageName}
                              onChange={(e) =>
                                handleInputChange(
                                  e.target.value,
                                  tabIndex,
                                  serviceIndex,
                                  subServiceIndex,
                                  "packageName"
                                )
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
                                value={subService.time}
                                onChange={(value) =>
                                  handleInputChange(
                                    value,
                                    tabIndex,
                                    serviceIndex,
                                    subServiceIndex,
                                    "time"
                                  )
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
                                value={subService.charge}
                                onChange={(value) =>
                                  handleInputChange(
                                    value,
                                    tabIndex,
                                    serviceIndex,
                                    subServiceIndex,
                                    "charge"
                                  )
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
                              placeholder="Enter list of all services to add in a single package. 
                              Ex:- Hair, Beard, Facial, Massage."
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
                        )
                      )}

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
                          onClick={() => handleAddExtra(tabIndex, serviceIndex)}
                          style={{
                            borderRadius: "8px",
                            backgroundColor: "rgb(235 235 235)",
                            fontFamily: "Poppins",
                            paddingTop: "5px",
                          }}
                        >
                          <PlusCircleOutlined
                            size="large"
                            style={{ fontSize: "16px" }}
                          />{" "}
                          Add Package
                        </Button>
                      </div>
                    </Panel>
                  </Collapse>
                ) : (
                  <Collapse
                    key={serviceIndex}
                    bordered={false}
                    className="services"
                    defaultActiveKey={"0"}
                  >
                    <Panel
                      header={service.type}
                      key={serviceIndex}
                      showArrow={false}
                      className="services"
                    >
                      {service.sub_services.map(
                        (subService, subServiceIndex) => (
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
                                  handleInputChange(
                                    e.target.value,
                                    tabIndex,
                                    serviceIndex,
                                    subServiceIndex,
                                    "name"
                                  )
                                }
                                style={{
                                  width: "42%",
                                  fontFamily: "Poppins",
                                  borderRadius: 8,
                                  padding: "0.35rem",
                                  border: "1px solid #1C4792",
                                }}
                              />
                            ) : (
                              <div
                                style={{ width: "42%", fontFamily: "Poppins" }}
                              >
                                {subService.name}
                              </div>
                            )}
                            <InputNumber
                              placeholder="Time in min"
                              value={subService.time}
                              onChange={(value) =>
                                handleInputChange(
                                  value,
                                  tabIndex,
                                  serviceIndex,
                                  subServiceIndex,
                                  "time"
                                )
                              }
                              style={{
                                width: "22%",
                                borderRadius: 8,
                                padding: "0.1rem",
                                border: "1px solid #1C4792",
                              }}
                            />
                            <InputNumber
                              placeholder="Charges"
                              value={subService.charge}
                              onChange={(value) =>
                                handleInputChange(
                                  value,
                                  tabIndex,
                                  serviceIndex,
                                  subServiceIndex,
                                  "charge"
                                )
                              }
                              style={{
                                width: "22%",
                                borderRadius: 8,
                                padding: "0.1rem",
                                border: "1px solid #1C4792",
                              }}
                            />
                            <Checkbox
                              checked={subService.selected}
                              onChange={(e) =>
                                handleCheckboxChange(
                                  tabIndex,
                                  serviceIndex,
                                  subServiceIndex,
                                  e.target.checked
                                )
                              }
                            />
                          </div>
                        )
                      )}
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
                          onClick={() => handleAddExtra(tabIndex, serviceIndex)}
                          style={{
                            borderRadius: "8px",
                            backgroundColor: "rgb(235 235 235)",
                            fontFamily: "Poppins",
                            paddingTop: "5px",
                          }}
                        >
                          <PlusCircleOutlined
                            size="large"
                            style={{ fontSize: "16px" }}
                          />{" "}
                          Add Other Services
                        </Button>
                      </div>
                    </Panel>
                  </Collapse>
                )
              )}
            </TabPane>
          ))}
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
          // onClick={handleNext}
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

export default ServicesComponent;

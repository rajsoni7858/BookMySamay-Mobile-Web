import { Collapse, Typography, Form, Input, Checkbox } from "antd";
import React, { useState } from "react";
const { Panel } = Collapse;
const { Title } = Typography;

function callback(key) {
  console.log(key);
}

const text = `
  Simple Hair Style
`;

const Step3Component = () => {
  const showHide = (isActive) => <p>{isActive ? "SHOW" : "HIDE"}</p>;
  const onFinish = (values) => {
    // Handle the form submission here
    console.log("Form values:", values);
  };
  const [timeInMin, setTimeInMin] = useState("");
  const [charges, setCharges] = useState("");

  const handleSubmit = () => {
    // Handle the form submission here
    console.log("Time In Min:", timeInMin);
    console.log("Charges:", charges);
  };
  return (
    <div className="custom-collapse">
      <Title
        level={5}
        style={{
          textAlign: "center",
          margin: 0,
          padding: "1.4rem 0rem",
          fontFamily: "Inter",
        }}
      >
        Add services from the dropdown with cost
      </Title>
      <Collapse
        defaultActiveKey={["1"]}
        onChange={callback}
        expandIconPosition="right"
      >
        <Panel header=" Hair Services" key="1" extra={showHide}>
          <div
            style={{
              display: "flex",
              justifyContent: "Space-between",
              alignItems: "center",
            }}
          >
            <div>{text}</div>
            <Input placeholder="Time In Min" />
            <Input placeholder="Charges" />
            <Checkbox></Checkbox>
          </div>
        </Panel>
        <Panel header=" Beard Services" key="2" extra={showHide}>
          <div
            style={{
              display: "flex",
              justifyContent: "Space-between",
              alignItems: "center",
            }}
          >
            <div>{text}</div>
            <Input placeholder="Time In Min" />
            <Input placeholder=" Charges" />
            <Checkbox></Checkbox>
          </div>
        </Panel>
        <Panel header=" Massage Services" key="3" extra={showHide}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>{text}</div>
            <Input placeholder="Time In Min" />
            <Input placeholder="Charges" />
            <Checkbox></Checkbox>
          </div>
        </Panel>
      </Collapse>
      <br />
    </div>
  );
};

export default Step3Component;

import { Collapse, Typography, theme, Input, Checkbox } from "antd";
import React from "react";
import { DownOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const { Title } = Typography;

function callback(key) {
  console.log(key);
}

const text = `Hair Style`;

const getItems = (panelStyle) => [
  {
    key: "1",
    label: "Hair Services",
    children: (
      <div
        style={{
          display: "flex",
          justifyContent: "Space-between",
          alignItems: "center",
        }}
      >
        <p>{text}</p>
        <Input placeholder="Time In Min" />
        <Input placeholder="Charges" />
        <Checkbox></Checkbox>
      </div>
    ),
    style: panelStyle,
  },
  {
    key: "2",
    label: "Beard Services",
    children: (
      <div
        style={{
          display: "flex",
          justifyContent: "Space-between",
          alignItems: "center",
        }}
      >
        <p>{text}</p>
        <Input placeholder="Time In Min" />
        <Input placeholder=" Charges" />
        <Checkbox></Checkbox>
      </div>
    ),
    style: panelStyle,
  },
  {
    key: "3",
    label: "Massage Services",
    children: (
      <div
        style={{
          display: "flex",
          justifyContent: "Space-between",
          alignItems: "center",
        }}
      >
        <p>{text}</p>
        <Input placeholder="Time In Min" />
        <Input placeholder="Charges" />
        <Checkbox></Checkbox>
      </div>
    ),
    style: panelStyle,
  },
];

const Step3Component = () => {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={["1"]}
      expandIconPosition="right"
      expandIcon={({ isActive }) => (
        <DownOutlined rotate={isActive ? 180 : 0} />
      )}
      style={{
        background: token.colorBgContainer,
      }}
      onChange={callback}
    >
      {getItems(panelStyle).map((item) => (
        <Panel key={item.key} header={item.label} style={item.style}>
          {item.children}
        </Panel>
      ))}
    </Collapse>
  );
};

export default Step3Component;

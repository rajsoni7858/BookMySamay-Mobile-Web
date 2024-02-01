import { Collapse, Typography, Form, theme, Input, Checkbox } from "antd";
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
          alignItems: "baseline",
        }}
      >
        <p>{text}</p>
        <Form.Item
          name="timeInMin"
          rules={[{ required: true, message: "Please enter time in min" }]}
        >
          <Input placeholder="Time In Min" />
        </Form.Item>
        <Form.Item
          name="charges"
          rules={[{ required: true, message: "Please enter charges" }]}
        >
          <Input placeholder="Charges" />
        </Form.Item>
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
          alignItems: "baseline",
        }}
      >
        <p>{text}</p>
        <Form.Item
          name="timeInMin"
          rules={[{ required: true, message: "Please enter time in min" }]}
        >
          <Input placeholder="Time In Min" />
        </Form.Item>
        <Form.Item
          name="charges"
          rules={[{ required: true, message: "Please enter charges" }]}
        >
          <Input placeholder="Charges" />
        </Form.Item>
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
          alignItems: "baseline",
        }}
      >
        <p>{text}</p>
        <Form.Item
          name="timeInMin"
          rules={[{ required: true, message: "Please enter time in min" }]}
        >
          <Input placeholder="Time In Min" />
        </Form.Item>
        <Form.Item
          name="charges"
          rules={[{ required: true, message: "Please enter charges" }]}
        >
          <Input placeholder="Charges" />
        </Form.Item>
        <Checkbox></Checkbox>
      </div>
    ),
    style: panelStyle,
  },
];

const Step3Component = ({ form }) => {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  return (
    <Form form={form}>
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
    </Form>
  );
};

export default Step3Component;

import React, { useState } from "react";
import "../App.css";
import {
  Form,
  Input,
  Layout,
  InputNumber,
  Popconfirm,
  Table,
  theme,
  Button,
  Typography,
  Tabs,
  Grid,
  Row,
  Col,
  TimePicker,
  Select,
  Modal,
} from "antd";
import {
  FilterOutlined,
  SearchOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { useBreakpoint } = Grid;
const { Option } = Select;
const { TabPane } = Tabs;

const originData = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    ShopName: `raj ${i}`,
    MobileNo: "9427778440",
    location: `London Park no. ${i}`,
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "number" ? (
      <InputNumber />
    ) : inputType === "time" ? (
      <TimePicker format="HH:mm" />
    ) : (
      <Input />
    );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Shop = () => {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ShopName: "",
      MobileNo: "",
      address: "",
      setLocation: "",
      workingDays: "",
      holidayInWeek: "",
      openTime: "",
      closeTime: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [additionalFieldsModalVisible, setAdditionalFieldsModalVisible] =
    useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const showAdditionalFieldsModal = (record) => {
    setAdditionalFieldsModalVisible(true);
    setSelectedRecord(record);
  };

  const handleAdditionalFieldsOk = () => {
    // Handle saving additional fields data
    setAdditionalFieldsModalVisible(false);
  };

  const handleAdditionalFieldsCancel = () => {
    setAdditionalFieldsModalVisible(false);
  };

  const columns = [
    {
      title: "ShopName",
      dataIndex: "ShopName",
      width: "25%",
      editable: true,
    },
    {
      title: "MobileNo",
      dataIndex: "MobileNo",
      width: "25%",
      editable: true,
    },
    {
      title: "Location",
      dataIndex: "setLocation",
      width: "25%",
      editable: true,
    },

    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              <SaveOutlined />
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>
                <CloseOutlined />
              </a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => showAdditionalFieldsModal(record)}
              style={{ marginRight: 8 }}
            >
              <EditOutlined />
            </Typography.Link>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.inputType || "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const history = useHistory();

  const screens = useBreakpoint();

  return (
    <div style={{ padding: 0 }}>
      <Content
        style={{
          margin: "20px",
          padding: 0,
          minHeight: 280,
          background: "transparent",
          borderRadius: borderRadiusLG,
        }}
      >
        <Layout style={{ background: "transparent", borderRadius: 15 }}>
          <Content>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={24} lg={24} xl={24}>
                <div style={{ width: "100%", padding: 0 }}>
                  <Form form={form} component={false}>
                    <Table
                      components={{
                        body: {
                          cell: EditableCell,
                        },
                      }}
                      bordered
                      dataSource={data}
                      columns={mergedColumns}
                      rowClassName="editable-row"
                      pagination={{
                        pageSize: 6, // Add this line to specify the number of rows per page
                        onChange: cancel,
                      }}
                    />
                  </Form>
                </div>
              </Col>
              {/* Add more Col components for responsiveness */}
            </Row>
          </Content>
          <div style={{ padding: 0 }}>
            {/* ... (previous code) */}

            {/* Additional Fields Modal */}
            <Modal
              title="Here you need to fill the shop details"
              visible={additionalFieldsModalVisible}
              onOk={handleAdditionalFieldsOk}
              onCancel={handleAdditionalFieldsCancel}
            >
              {/* Form fields for additional information */}
              <Form>
                {/* Use form fields for shop owner, location, set location, working days, holiday in week, open time, close time */}
                {/* Example: */}
                <Form.Item label="Shop Name" name="shopName">
                  <Input />
                </Form.Item>
                <Form.Item label="Shop Owner" name="shopOwner">
                  <Input />
                </Form.Item>
                <Form.Item label="Shop Location" name="shopLocation">
                  <Input />
                </Form.Item>
                <Form.Item label="Set Location" name="setLocation">
                  <Input />
                </Form.Item>
                <Form.Item label="Working Days" name="workingdays">
                  <Input />
                </Form.Item>
                <Form.Item label="Holiday in week" name="holidayinweek">
                  <Input />
                </Form.Item>
                <Form.Item label="Opening Time" name="openingtime">
                  <Input />
                </Form.Item>
                <Form.Item label="Closing Time" name="closingtime">
                  <Input />
                </Form.Item>
                {/* ... (add other form fields) */}
              </Form>
            </Modal>
          </div>
        </Layout>
      </Content>
    </div>
  );
};
export default Shop;

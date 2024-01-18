import React, { useState } from "react";
import "../../App.css";
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
  Space,
  Modal,
} from "antd";
import {
  FilterOutlined,
  SearchOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  Link,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import EditShop from "./EditShopComponent";

const { useBreakpoint } = Grid;
const { Option } = Select;
const { TabPane } = Tabs;

const originData = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    ShopName: `raj ${i}`,
    MobileNo: "9427778440",
    setLocation: `London. ${i}`, // Corrected the key to "setLocation"
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

const Shop = ({ users }) => {
  const { path } = useRouteMatch();
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

  const [selectedRecord, setSelectedRecord] = useState(null);

  const columns = [
    {
      title: "ShopName",
      dataIndex: "ShopName",
      width: "30%",
      editable: true,
    },
    {
      title: "MobileNo",
      dataIndex: "MobileNo",
      width: "30%",
      editable: true,
    },
    {
      title: "Location",
      dataIndex: "setLocation", // Corrected dataIndex to match the key in originData
      width: "30%",
      editable: true,
    },
    {
      title: "Edit",
      key: "Edit",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/editshop/${record.key}`}>
            <EditOutlined />
          </Link>
        </Space>
      ),
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

  const handleAddShopClick = () => {
    // Redirect to the AddShop component or any other page
    history.push("/addshop"); // Change "/addshop" to the path you want to navigate to
  };

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
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <div style={{ width: "100%", padding: 0 }}>
                  <Form form={form} component={false}>
                    <Button
                      type="primary"
                      style={{
                        marginBottom: 16,
                        float: "right",
                        background: "#1C4792",
                      }}
                      onClick={handleAddShopClick}
                    >
                      Add Shop
                    </Button>
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
                      // Remove the pagination prop
                    />
                  </Form>
                </div>
              </Col>
              {/* Add more Col components for responsiveness */}
            </Row>
            {/* <div>
              <Switch>
                <Route exact path={path}>
                  <Table columns={columns} dataSource={users} />
                </Route>
                <Route path={`${path}/editshop/:userId`}>
                  <MultiStepForm />
                </Route>
              </Switch>
            </div> */}
          </Content>
        </Layout>
      </Content>
    </div>
  );
};
export default Shop;

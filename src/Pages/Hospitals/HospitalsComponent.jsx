import React, { useState } from "react";
import { Button, Input, Layout, Table, Typography } from "antd";
import { Link, useHistory } from "react-router-dom";
import { trimString } from "../../Utils/utils";
import "./Hospital.css";

const { Content } = Layout;
const { Text } = Typography;

const originData = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    ShopName: `Salon Royale for Kids and Mens fef fef dsd dsd dds dsds`,
    MobileNo: "9427778440",
    setLocation: `London. ${i}`, // Corrected the key to "setLocation"
  });
}

const HospitalsComponent = () => {
  const history = useHistory();
  const [data, setData] = useState(originData);
  const [searchQuery, setSearchQuery] = useState("");

  const columns = [
    {
      title: "Hospital Name",
      dataIndex: "ShopName",
      width: "40%",
      render: (text) => (
        <div style={{ paddingLeft: "14px" }}>
          <span
            style={{
              fontFamily: "Poppins-SemiBold",
              color: "#192A3E",
              fontSize: "0.75rem",
            }}
          >
            {trimString(text, 40)}
          </span>
        </div>
      ),
    },
    {
      title: "Mobile No",
      dataIndex: "MobileNo",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <Text
          style={{
            fontFamily: "Poppins",
            color: "#90A0B7",
            fontSize: "0.75rem",
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Location",
      dataIndex: "setLocation",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Edit",
      key: "Edit",
      width: "15%",
      align: "center",
      render: (text, record) => (
        <>
          <Link to={`/hospitals/${record.key}/edit-hospital#1`}>
            <img
              src={require("../../Assets/Images/edit.png")}
              alt="Your Logo"
              style={{ width: "17px", Height: "17px", padding: "3px" }}
            />
          </Link>
        </>
      ),
    },
  ];

  const handleAddShopClick = () => {
    history.push("/hospitals/add-hospital#1");
  };

  const filteredData = searchQuery
    ? data.filter(
        (item) =>
          item.ShopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.MobileNo.includes(searchQuery)
      )
    : data;

  return (
    <div style={{ backgroundColor: "#eff3fd", height: "calc(100vh - 55px)" }}>
      <Content
        style={{
          padding: "1.2rem",
          minHeight: 280,
          backgroundColor: "#eff3fd",
        }}
      >
        <Input
          placeholder="Search by Hospital Name/Mobile No."
          allowClear
          prefix={
            <img
              src={require("../../Assets/Images/search.png")}
              alt="Your Logo"
              className="search"
            />
          }
          style={{
            marginBottom: "1rem",
            fontFamily: "Poppins",
            borderRadius: 8,
            padding: "0.5rem",
            paddingLeft: "0.55rem",
            border: "1px solid #1C4792",
          }}
        />

        {/* Add Shop */}
        <Button
          type="primary"
          style={{
            marginBottom: "0.6rem",
            background: "#1C4792",
            borderRadius: 5,
            float: "right",
            fontFamily: "Poppins",
            border: 0,
          }}
          onClick={handleAddShopClick}
        >
          ADD HOSPITAL
        </Button>

        {/* Table */}
        <Table bordered dataSource={filteredData} columns={columns} />
      </Content>
    </div>
  );
};
export default HospitalsComponent;

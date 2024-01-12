import React, { useState, useEffect } from "react";
import { Typography, Row, Col, Card, Statistic, Flex } from "antd";

const { Title } = Typography;

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const userName = "Raj Soni "; // Replace with the actual user's name

  return (
    <Row
      gutter={[48, 16]}
      justify="center"
      align="middle"
      style={{ marginTop: "20px", padding: 20 }}
    >
      <Col span={24} style={{ textAlign: "left" }}>
        <Title level={3} style={{ color: "black" }}>
          Hello {userName}
        </Title>
        <Title level={5} style={{ color: "black", marginRight: "16px" }}>
          {formattedTime}
          {formattedDate}
        </Title>
      </Col>
      <Col xs={12} sm={12} md={12} lg={8} xl={6}>
        <Card bordered={false}>
          <div>
            <img
              src={require("../../src/Assets/Images/Group.png")}
              alt="Group Member Icon"
              style={{
                display: "Flex",
                justifyContent: "left",
                width: 25,
                height: 25,
              }}
            />
            <Statistic
              value={50}
              style={{
                fontSize: "16px !important",
                fontWeight: 600,
                color: "#1C4792 !important",
                textAlign: "right",
              }}
            />
            <Title level={5} style={{ textAlign: "center", margin: 0 }}>
              Total Member
            </Title>
          </div>
        </Card>
      </Col>

      <Col xs={12} sm={12} md={12} lg={8} xl={6}>
        <Card
          bordered={false}
          style={{
            borderradius: "14px",
            boxshadow: "5px 5px 10px 0 rgba(0, 0, 0, 0.5)",
          }}
        >
          <div>
            <img
              src={require("../../src/Assets/Images/Check.png")}
              alt="Group Member Icon"
              style={{
                display: "Flex",
                justifyContent: "left",
                paddingleft: 20,
                width: 25,
                height: 25,
              }}
            />
            <Statistic
              value={40}
              style={{
                fontSize: "26px !important",
                fontWeight: 600,
                color: "#1C4792 !important",
                textAlign: "right",
                color: "#1C4792 !important",
              }}
            />
            <Title level={5} style={{ textAlign: "center", margin: 0 }}>
              Active Member
            </Title>
          </div>
        </Card>
      </Col>
      <Col xs={12} sm={12} md={12} lg={8} xl={6}>
        <Card bordered={false}>
          <div>
            <img
              src={require("../../src/Assets/Images/Cancel.png")}
              alt="Group Member Icon"
              style={{
                display: "Flex",
                justifyContent: "left",
                width: 25,
                height: 25,
              }}
            />
            <Statistic
              value={10}
              style={{
                fontSize: "26px !important",
                fontWeight: 600,
                color: "#1C4792 !important",
                textAlign: "right",
              }}
            />
            <Title level={5} style={{ textAlign: "center", margin: 0 }}>
              Inactive Member
            </Title>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;

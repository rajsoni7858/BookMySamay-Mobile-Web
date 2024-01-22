import React from "react";
import { Typography, Row, Col, Card, Statistic } from "antd";
import moment from "moment";
import "./Dashboard.css";

const { Title } = Typography;

const Dashboard = () => {
  const currentDateTimeFormatted = moment().format("h.mm A D MMM YYYY");

  const renderStatisticValue = (value) => (
    <Statistic
      value={value}
      valueStyle={{
        fontSize: "1rem",
        fontFamily: "Poppins",
        fontWeight: 600,
        textAlign: "right",
        color: "#1C4792",
      }}
    />
  );

  const renderTitle = (title) => (
    <Title
      level={5}
      style={{
        textAlign: "center",
        fontSize: "0.7rem",
        fontFamily: "Poppins",
        margin: 0,
      }}
    >
      {title}
    </Title>
  );

  return (
    <Row
      gutter={[48, 16]}
      justify="center"
      align="middle"
      style={{ margin: "1.2rem", padding: 0 }}
    >
      <Col span={24} style={{ textAlign: "left", padding: "10px" }}>
        <Title
          level={3}
          style={{
            margin: 0,
            color: "black",
            fontSize: "1.3rem",
            fontFamily: "Inter",
            fontWeight: "400",
          }}
        >
          Hello Gaurav Soni 👋
        </Title>
        <Title
          level={5}
          style={{
            color: "#707EAE",
            margin: 0,
            fontSize: "0.8rem",
            fontFamily: "Inter",
          }}
        >
          {currentDateTimeFormatted}
        </Title>
      </Col>

      {/* 1 */}
      <Col xs={12} sm={12} md={12} lg={8} xl={6} style={{ padding: "10px" }}>
        <Card bordered={false}>
          <div>
            <img
              src={require("../../../src/Assets/Images/Group.png")}
              alt="Group Member Icon"
              className="absoulute-img"
            />
            {renderStatisticValue(1500)}
            {renderTitle("Total Member")}
          </div>
        </Card>
      </Col>

      {/* 2 */}
      <Col xs={12} sm={12} md={12} lg={8} xl={6} style={{ padding: "10px" }}>
        <Card bordered={false}>
          <div>
            <img
              src={require("../../../src/Assets/Images/Check.png")}
              alt="Group Member Icon"
              className="absoulute-img"
            />
            {renderStatisticValue(999)}
            {renderTitle("Active Member")}
          </div>
        </Card>
      </Col>

      {/* 3 */}
      <Col xs={12} sm={12} md={12} lg={8} xl={6} style={{ padding: "10px" }}>
        <Card bordered={false}>
          <div>
            <img
              src={require("../../../src/Assets/Images/Cancel.png")}
              alt="Group Member Icon"
              className="absoulute-img"
            />
            {renderStatisticValue(10)}
            {renderTitle("Inactive Member")}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;

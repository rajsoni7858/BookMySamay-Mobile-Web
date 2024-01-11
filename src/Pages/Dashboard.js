import React from "react";
import { Typography, Row, Col, Card, Statistic } from "antd";

const { Title } = Typography;

const Dashboard = () => {
  return (
    <Row
      gutter={[48, 16]}
      justify="center"
      align="middle"
      style={{ marginTop: "20px" }}
    >
      <Col xs={12} sm={12} md={12} lg={8} xl={6}>
        <Card bordered={false}>
          <div>
            <img
              src={require("../../src/Assets/Images/Group.png")}
              alt="Group Member Icon"
              style={{
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
        <Card bordered={false}>
          <div>
            <img
              src={require("../../src/Assets/Images/Check.png")}
              alt="Group Member Icon"
              style={{
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

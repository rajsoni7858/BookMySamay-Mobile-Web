import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Card, Statistic } from "antd";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoadParams from "../../models/LoadParams";
import { loadCategory } from "../../redux/actions/categoryActions";
import "./Dashboard.css";

const { Title } = Typography;
const { Meta } = Card;

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentDateTimeFormatted = moment().format("h.mm A D MMM YYYY");

  const [categories, setCategories] = useState([]);

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

  const handleLoadCategorySuccessed = (data) => {
    setCategories(data);
  };

  useEffect(() => {
    dispatch(
      loadCategory(new LoadParams({}, handleLoadCategorySuccessed, () => {}))
    );
  }, [dispatch]);

  const category1 = require("../../../src/Assets/Images/salon.png");
  const category2 = require("../../../src/Assets/Images/parlour.png");
  const category3 = require("../../../src/Assets/Images/hospital.jpeg");

  const handleCatrgoryUrl = (name, id) => {
    const updatedName = name && name.toLowerCase().replace(/ /g, "-");
    return `/${id}/${updatedName}/add#1`;
  };

  return (
    <div
      style={{ minHeight: "calc(100dvh - 65px)", backgroundColor: "#FAFAFA" }}
    >
      <Row
        gutter={[48, 16]}
        justify="center"
        align="middle"
        style={{ margin: "0 1.2rem", padding: "1.2rem 0" }}
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
        {/* <Col xs={12} sm={12} md={12} lg={8} xl={6} style={{ padding: "10px" }}>
          <Card
            bordered={false}
            bodyStyle={{
              borderRadius: "11px",
              boxShadow: "2.128px 2.128px 5.32px 0px rgba(0, 0, 0, 0.25)",
              padding: "5px",
            }}
          >
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
        </Col> */}

        {/* 2 */}
        {/* <Col xs={12} sm={12} md={12} lg={8} xl={6} style={{ padding: "10px" }}>
          <Card
            bordered={false}
            bodyStyle={{
              borderRadius: "11px",
              boxShadow: "2.128px 2.128px 5.32px 0px rgba(0, 0, 0, 0.25)",
              padding: "5px",
            }}
          >
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
        </Col> */}

        {/* 3 */}
        {/* <Col xs={12} sm={12} md={12} lg={8} xl={6} style={{ padding: "10px" }}>
          <Card
            bordered={false}
            bodyStyle={{
              borderRadius: "11px",
              boxShadow: "2.128px 2.128px 5.32px 0px rgba(0, 0, 0, 0.25)",
              padding: "5px",
            }}
          >
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
        </Col> */}
      </Row>

      <Row
        gutter={[16, 16]}
        justify="center"
        align="middle"
        style={{ margin: "0 1.2rem", padding: "1.2rem 0" }}
      >
        {categories.map((item, index) => (
          <Col xs={12} sm={12} key={index}>
            <Card
              hoverable
              cover={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "10rem",
                  }}
                >
                  <img
                    alt="example"
                    src={
                      item.category_id === 3
                        ? category3
                        : index === 1
                        ? category2
                        : category1
                    }
                    style={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "cover",
                    }}
                  />
                </div>
              }
              style={{
                height: "100%",
                boxShadow: "2.128px 2.128px 5.32px 0px rgba(0, 0, 0, 0.25)",
              }}
              bodyStyle={{ padding: "8px" }}
              onClick={() =>
                history.push(handleCatrgoryUrl(item.name, item.category_id))
              }
            >
              <Meta
                className="meta"
                title={`${item.name} (${item.shop_count})`}
                description={`To Add or fill the details of ${item.name} “Click on the ${item.name}”`}
                style={{ padding: "0", paddingBottom: "5px" }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;

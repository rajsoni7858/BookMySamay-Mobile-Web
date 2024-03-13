import React, { useEffect, useState } from "react";
import { Button, Input, Layout, Spin, Table, Typography } from "antd";
import { Link, useHistory, useParams } from "react-router-dom";
import { trimString } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { loadServicesFailed, loadShops } from "../../redux/actions";
import LoadParams from "../../models/LoadParams";
import "./Shop.css";

const { Content } = Layout;
const { Text } = Typography;

const ShopsComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { categoryId, category } = useParams();
  const shopsLoading = useSelector((state) => state.LoadShops);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const columns = [
    {
      title: "Shop Name",
      dataIndex: "name",
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
            {text && trimString(text, 40)}
          </span>
        </div>
      ),
    },
    {
      title: "Mobile No",
      dataIndex: "mobile_number",
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
      dataIndex: "location_name",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Edit",
      key: "Edit",
      width: "15%",
      align: "center",
      render: (data, record) => (
        <>
          <Link to={`/${categoryId}/${category}/${data.shop_id}/edit#1`}>
            <img
              src={require("../../Assets/Images/edit.png")}
              alt="Your Logo"
              style={{ width: "17px", Height: "17px", padding: "3px" }}
            />
          </Link>
          <Link
            to={{
              pathname: `/${categoryId}/${category}/${data.shop_id}/services`,
              state: { shopName: data.name },
            }}
          >
            <img
              src={require("../../Assets/Images/setting.png")}
              alt="Your Logo"
              style={{ width: "22px", Height: "22px", padding: "3px" }}
            />
          </Link>
        </>
      ),
    },
  ];

  const handleAddShopClick = () => {
    history.push(`/${categoryId}/${category}/add#1`);
  };

  const handleLoadShopsSuccessed = (data) => {
    setData(data);
  };

  useEffect(() => {
    dispatch(loadServicesFailed());
    dispatch(
      loadShops(
        new LoadParams({ id: categoryId }, handleLoadShopsSuccessed, () => {})
      )
    );
  }, [dispatch, categoryId]);

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const filteredData = searchQuery
    ? data.filter((item) => {
        const nameIncludes =
          item.name &&
          item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const mobileIncludes =
          item.mobile_number && item.mobile_number.includes(searchQuery);
        return nameIncludes || mobileIncludes;
      })
    : data;

  return (
    <div style={{ backgroundColor: "#eff3fd", height: "calc(100vh - 55px)" }}>
      {shopsLoading ? (
        <div
          className="common__wrapper"
          style={{ height: "calc(100vh - 100px)" }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Content
          style={{
            padding: "1.2rem",
            minHeight: 280,
            backgroundColor: "#eff3fd",
          }}
        >
          <Input
            placeholder="Search by Shop Name/Mobile No."
            allowClear
            prefix={
              <img
                src={require("../../Assets/Images/search.png")}
                alt="Your Logo"
                className="search"
              />
            }
            value={searchQuery}
            style={{
              marginBottom: "1rem",
              fontFamily: "Poppins",
              borderRadius: 8,
              padding: "0.5rem",
              paddingLeft: "0.55rem",
              border: "1px solid #1C4792",
            }}
            onChange={(e) => handleSearch(e.target.value)}
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
            {categoryId === "1" ? "ADD SALON" : "ADD BEAUTY PARLOUR"}
          </Button>

          {/* Table */}
          <Table bordered dataSource={filteredData} columns={columns} />
        </Content>
      )}
    </div>
  );
};

export default ShopsComponent;

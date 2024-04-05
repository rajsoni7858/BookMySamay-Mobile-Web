import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Select, Typography } from "antd";
import { useDispatch } from "react-redux";
import SaveParams from "../../../models/SaveParams";
import { saveShop, updateShop } from "../../../redux/actions/shopActions";
import { debounce } from "lodash";
import axios from "axios";
import LoadParams from "../../../models/LoadParams";
import { loadSearchLocation } from "../../../redux/actions/locationActions";
import { useParams } from "react-router-dom";

const { Title } = Typography;

const Step1Component = ({ form, formId, onNext }) => {
  const dispatch = useDispatch();
  let { categoryId } = useParams();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [searchQuery, setSearchQuery] = useState();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const cancelTokenRef = useRef(null);

  const storedData = JSON.parse(sessionStorage.getItem("salon"));

  const handleSearchSuccessed = (data) => {
    setResults(data);
    setLoading(false);
  };

  const performSearch = async (payload, cancelToken) => {
    dispatch(
      loadSearchLocation(
        new LoadParams(
          {
            ...payload,
            cancelToken: cancelToken?.token,
          },
          handleSearchSuccessed,
          () => {}
        )
      )
    );
  };

  const debouncedHandleSearch = debounce((query) => {
    if (query && query.length > 2) {
      const newCancelToken = axios.CancelToken.source();

      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel("Previous request cancelled");
      }

      cancelTokenRef.current = newCancelToken;
      setLoading(true);

      const url = { url: `q=${query}` };
      performSearch(url, newCancelToken);
    }
  }, 500);

  const handleSearch = (query) => {
    setSearchQuery(query);
    debouncedHandleSearch(query);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          const url = {
            url: `location_lat=${latitude}&location_lng=${longitude}`,
          };
          performSearch(url);
        },
        (error) => {
          console.error("Error getting geolocation:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleShopSuccessed = (data) => {
    sessionStorage.setItem("salon", JSON.stringify({ ...storedData, ...data }));
    onNext();
  };

  const handleNext = async () => {
    // onNext();
    try {
      await form.validateFields().then((values) => {
        const payload = {
          ...values,
          category_id: categoryId,
          location_lat: latitude,
          location_lng: longitude,
          staff: {
            name: values.owner_name,
            mobile_number: values.mobile_number,
          },
          shop_operational_details: {
            op_type: values.op_type,
            slot_duration: values.slot_duration,
          },
        };
        sessionStorage.setItem(
          "salon",
          JSON.stringify({ ...storedData, ...payload })
        );
        if (storedData) {
          const daysOfWeek = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ];

          const shop_daily_operational_details =
            storedData.shop_daily_operational_details
              ? storedData.shop_daily_operational_details
              : daysOfWeek.map((day) => ({
                  // op_type: values.op_type,
                  day_of_week: day,
                  is_open: 0,
                  opening_time: "",
                  closing_time: "",
                  lunch_start_time: "",
                  lunch_end_time: "",
                }));
          dispatch(
            updateShop(
              new SaveParams(
                {
                  ...storedData,
                  ...payload,
                  shop_daily_operational_details,
                  shop_operational_details: {
                    op_type: values.op_type,
                    slot_duration: values.slot_duration,
                    upi_id: storedData.upi_id || "",
                  },
                },
                handleShopSuccessed,
                () => {}
              )
            )
          );
        } else {
          dispatch(
            saveShop(new SaveParams(payload, handleShopSuccessed, () => {}))
          );
        }
      });
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  useEffect(() => {
    if (storedData) {
      form.setFieldsValue(storedData);
    }
  }, [form, storedData]);

  useEffect(() => {
    handleGetLocation();
  }, []);

  return (
    <Form
      form={form}
      id={formId}
      layout="vertical"
      style={{ display: "flex", flex: 1, flexDirection: "column" }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
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

        {/* Content */}
        <Form.Item
          label="Shop Name:"
          name="name"
          rules={[{ required: true, message: "Please enter shop name" }]}
        >
          <Input placeholder="Enter shop name" />
        </Form.Item>
        <Form.Item
          label="Shop Owner:"
          name="owner_name"
          rules={[{ required: true, message: "Please enter shop owner" }]}
        >
          <Input placeholder="Enter shop Owner" />
        </Form.Item>
        <Form.Item
          label="Mobile No:"
          name="mobile_number"
          rules={[{ required: true, message: "Please enter mobile number" }]}
        >
          <Input placeholder="Enter mobile no." maxLength={10} type="number" />
        </Form.Item>
        <Form.Item
          label="Current Location:"
          name="location_name"
          rules={[
            { required: true, message: "Please select current location" },
          ]}
        >
          <Select
            showSearch
            loading={loading}
            placeholder="Please select current location"
            style={{ fontFamily: "Poppins", height: "38px" }}
            defaultActiveFirstOption={false}
            filterOption={false}
            searchValue={searchQuery}
            onSearch={handleSearch}
            notFoundContent={null}
            options={results.map((location, index) => ({
              value: location.name,
              label: location.name,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Shop Address:"
          name="address"
          rules={[{ required: true, message: "Please enter shop Address" }]}
        >
          <Input placeholder="Enter shop address" />
        </Form.Item>
        <Form.Item
          label="Services offered:"
          name="op_type"
          initialValue={categoryId === "2" ? "Women" : null}
          rules={[{ required: true, message: "Please select service" }]}
        >
          <Select
            placeholder="men, women, unisex"
            style={{ fontFamily: "Poppins", height: "38px" }}
            options={[
              { value: "Men", label: "Men" },
              { value: "Women", label: "Women" },
              { value: "Unisex", label: "Unisex" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="General Time Slot:"
          name="slot_duration"
          rules={[
            { required: true, message: "Please select general time slot" },
          ]}
        >
          <Select
            placeholder="Please select general time slot"
            style={{ fontFamily: "Poppins", height: "38px" }}
            options={[
              { value: "15", label: "15" },
              { value: "30", label: "30" },
              { value: "45", label: "45" },
              { value: "60", label: "60" },
            ]}
          />
        </Form.Item>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "1.5rem",
        }}
      >
        <Button
          style={{
            width: "80%",
            background: "#1C4792",
            borderRadius: "12px",
            fontFamily: "Poppins",
            height: "2.5rem",
          }}
          type="primary"
          onClick={handleNext}
        >
          NEXT
        </Button>
      </div>
    </Form>
  );
};

export default Step1Component;

import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, message, Select, Typography } from "antd";
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
  const [searchQuery, setSearchQuery] = useState();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [executionCount, setExecutionCount] = useState(0);

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

  const handleShopSuccessed = (data, response) => {
    sessionStorage.setItem(
      "salon",
      JSON.stringify({
        ...storedData,
        ...data,
        ...response,
        shop_id: data?.shop_id || response?.shop_id,
      })
    );
    onNext();
  };

  const handleShopfailed = (response) => {
    response?.message && message.error(response?.message);
  };

  const handleNext = async () => {
    try {
      await form.validateFields().then((values) => {
        const location_name = values.location_name.split(" - ")[0];
        const matchingRecord = results.find(
          (record) => record.name === location_name
        );

        const payload = {
          ...values,
          location_name: location_name,
          category_id: categoryId,
          location_lat: matchingRecord?.latitude,
          location_lng: matchingRecord?.longitude,
          location_id: matchingRecord?.location_id,
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
          const updatePayload = {
            ...storedData,
            ...payload,
            shop_daily_operational_details,
            shop_operational_details: {
              op_type: values.op_type,
              slot_duration: values.slot_duration,
              upi_id: storedData.upi_id || "",
            },
          };
          dispatch(
            updateShop(
              new SaveParams(
                updatePayload,
                (response) => handleShopSuccessed(updatePayload, response),
                (error) => handleShopfailed(error)
              )
            )
          );
        } else {
          dispatch(
            saveShop(
              new SaveParams(
                payload,
                (response) => handleShopSuccessed(payload, response),
                (error) => handleShopfailed(error)
              )
            )
          );
        }
      });
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  useEffect(() => {
    if (executionCount < 2 && storedData) {
      const name = storedData.location_name.split(" - ");
      form.setFieldsValue(storedData);
      // Optionally set results
      setResults([
        {
          name: name[0],
          postcode: name[1],
          latitude: storedData.location_lat,
          longitude: storedData.location_lng,
          location_id: storedData.location_id,
        },
      ]);

      // Increment the counter
      setExecutionCount((prevCount) => prevCount + 1);
    } else if (executionCount < 2) {
      handleGetLocation();
      setExecutionCount((prevCount) => prevCount + 1);
    }
  }, [form, storedData, executionCount]);

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
          <Input
            disabled={formId === "editForm"}
            placeholder="Enter mobile no."
            maxLength={10}
            type="number"
            onWheel={(e) => e.target.blur()} // Prevent value change on scroll
          />
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
              value: location.name + " - " + location.postcode,
              label: location.name + " - " + location.postcode,
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

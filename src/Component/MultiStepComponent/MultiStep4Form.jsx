// UpiPaymentForm.js
import React, { useState } from "react";
import { Form, input } from "antd";
//import { GooglePayLogo } from "./path/to/your/googlePayLogo"; // Import the Google Pay logo component

const UpiPaymentForm = () => {
  const [amount, setAmount] = useState("");
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  return (
    <>
      <h5
        style={{
          fontSize: 17,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Payment Method
      </h5>
      <Form.Item
        style={{ padding: 20 }}
        label="UPI Payment Mode"
        name="upiMode"
        rules={[{ required: true, message: "Please select UPI mode" }]}
      >
        <input
          style={{ width: "100%", height: "35px" }}
          placeholder="UPI"
          type="text"
          value={amount}
          onChange={handleAmountChange}
        />
      </Form.Item>
      {/* Add other UPI-related fields */}
    </>
  );
};

export default UpiPaymentForm;

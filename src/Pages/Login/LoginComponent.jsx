import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Card, Typography, message } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import SaveParams from "../../models/SaveParams";
import { getOtp, verifyOtp } from "../../redux/actions";
import OTPInput from "react-otp-input";
import "./Login.css";

const { Title } = Typography;

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isEnableOTP, setIsEnableOTP] = useState(false);

  const handleVerifyOTPSuccessed = (data) => {
    localStorage.setItem("token", data.token);
    history.push("/dashboard");
    setButtonClicked(false);
    setLoading(false);
  };

  const handleVerifyOTPFailed = () => {
    setLoading(false);
    setButtonClicked(false);
  };

  const handleVerifyOTP = (mobile, otp) => {
    dispatch(
      verifyOtp(
        new SaveParams(
          { mobile, otp },
          handleVerifyOTPSuccessed,
          handleVerifyOTPFailed
        )
      )
    );
  };

  const handleGetOTPSuccessed = () => {
    setLoading(false);
    setButtonClicked(false);
    setIsEnableOTP(true);
  };

  const handleGetOTPFailed = () => {
    message.error(
      "Not registerd as business entity. Please contact support team."
    );
    setLoading(false);
    setButtonClicked(false);
  };

  const handleGetOTP = (mobile) => {
    setLoading(true);
    setButtonClicked(true);
    dispatch(
      getOtp(
        new SaveParams({ mobile }, handleGetOTPSuccessed, handleGetOTPFailed)
      )
    );
  };

  const onFinish = async () => {
    form.validateFields().then((values) => {
      if (values.mobile && !values.otp) {
        handleGetOTP(values.mobile);
      } else if (values.mobile && values.otp) {
        handleVerifyOTP(values.mobile, values.otp);
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        style={{
          borderRadius: "8px",
          width: "100%",
          maxWidth: "1000px",
          padding: "0px",
        }}
      >
        <Row justify="center" align="middle" gutter={[16, 16]}>
          <Col
            className="right"
            xs={24}
            sm={24}
            md={12}
            lg={12}
            style={{
              padding: "10px 40px",
            }}
          >
            {/* Right Side - Login Form */}
            <Form
              form={form}
              name="loginForm"
              onFinish={onFinish}
              layout="vertical"
            >
              {/* Logo */}
              <div style={{ textAlign: "center" }}>
                <img
                  src={require("../../Assets/Images/logo.png")}
                  alt="Your Logo"
                  style={{ width: "33%", height: "33%", resize: "content" }}
                />
              </div>

              {/* Title */}
              <Title
                level={5}
                style={{
                  textAlign: "center",
                  color: "#1C4792",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                Login To Dashboard
              </Title>

              <Form.Item
                label="Mobile number"
                name="mobile"
                rules={[{ message: "Please enter your mobile number" }]}
                style={{ marginBottom: isEnableOTP ? "15px" : "24px" }}
              >
                <Input
                  style={{
                    borderRadius: "5px",
                    height: "38px",
                    border: "1px solid #1C4792",
                    fontFamily: "Inter",
                  }}
                  disabled={isEnableOTP}
                  placeholder="Enter your mobile number"
                />
              </Form.Item>

              {isEnableOTP && (
                <Form.Item
                  label="OTP"
                  name="otp"
                  rules={[{ message: "Please enter your OTP" }]}
                >
                  <OTPInput
                    numInputs={6}
                    renderSeparator={<span></span>}
                    containerStyle={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={{
                      width: "36px",
                      height: "36px",
                      margin: "0 6.5px",
                      textAlign: "center",
                      fontSize: "1em",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      outline: "none",
                      fontFamily: "Inter",
                    }}
                  />
                </Form.Item>
              )}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className="button"
                  disabled={buttonClicked}
                  loading={loading}
                  style={{ background: "#1c4792" }}
                >
                  SIGN IN
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col
            className="left"
            xs={24}
            sm={24}
            md={12}
            lg={12}
            style={{
              padding: "10px 40px",
            }}
          >
            {/* Left Side - Image */}
            <div style={{ textAlign: "center" }}>
              <img
                src={require("../../Assets/Images/loginimage.png")}
                alt="login"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  borderRadius: "8px",
                }}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default LoginForm;

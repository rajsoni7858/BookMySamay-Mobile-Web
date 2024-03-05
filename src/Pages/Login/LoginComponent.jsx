import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Card, Typography, message } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import SaveParams from "../../models/SaveParams";
import { getOtp, verifyOtp } from "../../redux/actions";

const { Title } = Typography;

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

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
      if (values.email && !values.password) {
        handleGetOTP(values.email);
      } else if (values.email && values.password) {
        handleVerifyOTP(values.email, values.password);
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
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <img
                  src={require("../../Assets/Images/logo.png")}
                  alt="Your Logo"
                  style={{ width: "33%", height: "33%", resize: "content" }}
                />
              </div>

              {/* Title */}
              <Title
                level={5}
                style={{ textAlign: "center", color: "#1C4792" }}
              >
                Login To Dashboard
              </Title>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ message: "Please input your email!" }]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                className="inputfield"
                label="Password"
                name="password"
                rules={[{ message: "Please input your password!" }]}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>

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

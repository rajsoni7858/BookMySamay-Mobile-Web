import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Card, Switch, Typography } from "antd";
import { useHistory } from "react-router-dom";

const { Title, Paragraph, Text, Link } = Typography;
const LoginForm = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [additionalToggle, setAdditionalToggle] = useState(false);
  const onFinish = (values) => {
    console.log("Received values:", values);
    // You can handle login logic here
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleLogin = () => {
    // Implement your login logic here
    console.log(
      "Login clicked with username:",
      username,
      "and password:",
      password
    );
    history.push("/dashboard");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Set the minimum height of the container to 100% of the viewport height
      }}
    >
      <Card
        style={{
          borderRadius: "8px",
          width: "100%", // Set width to 100%
          maxWidth: "1000px",
          padding: "0px", // Add padding for space
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
              padding: "10px 40px", // Adjust left padding for space
            }}
          >
            {/* Right Side - Login Form */}
            <Form
              name="loginForm"
              initialValues={{ remember: true }}
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

              {/* Subtext */}
              {/* <Paragraph>Enter your email and password to sign in</Paragraph> */}

              <Form.Item
                label="Username"
                name="username"
                rules={[{ message: "Please input your username!" }]}
              >
                <Input placeholder="Enter your username" />
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
                  onClick={handleLogin}
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
              padding: "10px 40px", // Adjust left padding for space
            }}
          >
            {/* Left Side - Image */}
            <div style={{ textAlign: "center" }}>
              <img
                src={require("../../Assets/Images/loginimage.png")}
                alt="Your Image"
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

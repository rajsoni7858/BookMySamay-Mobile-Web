import React from "react";
import { Row, Col, Form, Input, Button, Card, Typography } from "antd";
import { useHistory } from "react-router-dom";

const { Title } = Typography;

const LoginForm = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = async () => {
    form.validateFields().then((values) => {
      console.log("hi ronak", values);
    });
    history.push("/dashboard");
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

import {
  Button,
  Col,
  Form,
  Input,
  message,
  notification,
  Row,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import "./login.css";
import { useHistory } from "react-router";
import Logo from "../components/Logo";
import RecruiterImg from "../components/RecruiterImg";
import styles from "../styles/style";
import axios from "axios";
import { constants } from "../constants";
import { resetPasswordType } from "../types";
import UserService from "../services/UserService";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [tokenurl, setTokenurl] = useState("");
  const [firstLogin, setFirstLogin] = useState(1);

  const history = useHistory();

  const su = () => {
    message.success("password Changed Successfully");
    setTimeout(() => {
      history.push("/");
    }, 1000);
  };
  //changing firstTimeLogin to 0 in database
  const passchanged = async (firstTimeLogin: any) => {
    await UserService.passchange(userId, firstTimeLogin);
  };

  const success = () => {
    password === cpassword ? su() : message.error("password not matching");
  };
  console.log(success);

  useEffect(() => {
    setUserId(window.location.pathname.split("/")[2]);
    setTokenurl(JSON.stringify(window.location.pathname.split("/")[3]));
    GetUserId();
    firstLogins();
  });

  const GetUserId = async () => {
    const url = `${constants.BASE_URL}/auth/${userId}`;
    return axios
      .get(url)
      .then((data) => setToken(data.data.userToken))
      .catch((e) => Promise.reject(e.response.data));
  };

  const firstLogins = async () => {
    const { data } = await UserService.firstTimeLogin(userId);
    setFirstLogin(data.firstTimeLogin);
  };

  const onFinish = () => {
    if (JSON.stringify(token) === tokenurl) {
      if (password === cpassword) {
        passToken();
        correctPasswordNotification("topRight");
        setTimeout(() => {
          window.location.href = "/";
        });
      } else {
        confirmPasswordFailureNotification("topRight");
      }
    } else {
      tokenAreNotEqual("topRight");
    }
    passchanged(0);
  };
  const correctPasswordNotification = (placement: any) => {
    notification.info({
      message: `Notification `,
      description: "Password changed successfully.",
    });
  };

  const confirmPasswordFailureNotification = (placement: any) => {
    notification.info({
      message: `Notification `,
      description: "Passwords are not matching... try again!",
    });
  };
  const tokenAreNotEqual = (placement: any) => {
    notification.info({
      message: `Notification `,
      description: "Invalid Token provided... try again!",
    });
  };

  const passToken = async () => {
    const url = `${constants.BASE_URL}/auth/forgot/${userId}`;
    return axios
      .put<resetPasswordType>(url, { password })
      .catch((e) => Promise.reject(e.response.data));
  };
  const forgot = () => {
    window.location.href = "/";
  };
  return (
    <>
      <Logo />
      <Row wrap={true} className="tab">
        <RecruiterImg />
        <Col
          xs={{ span: 18, offset: 3 }}
          md={{ span: 7, offset: 8 }}
          style={{ marginTop: "6rem" }}
          className="inp"
        >
          <h2>Reset Password</h2>
          {firstLogin === 1 ? (
            <h6 style={{ color: "#87bce8" }}>
              You have logged for the 1st time please reset your password
            </h6>
          ) : null}
          <Form
            name="normal_login"
            layout="vertical"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              label="New Password"
              name="password"
              rules={[
                { required: true, message: "" },
                {
                  pattern: /(?=.*[A-Z])/,
                  message: "Password must contain at least one uppercase.",
                },
                {
                  pattern: /(?=.*[a-z])/,
                  message: "Password must contain at least one lowercase.",
                },
                {
                  pattern: /(?=.*[0-9])/,
                  message: "Password must contain at least one number.",
                },
                {
                  pattern: /(?=.*\W)/,
                  message:
                    "Password must contain at least one special character.",
                },
                {
                  pattern: /(?=.{8,})/,
                  message: "Password must contain minimum 8 characters.",
                },
                {
                  max: 16,
                  message: "Password must contain maximum 16 characters.",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="Enter New Password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                style={styles.borderRadius}
              />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="cpassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please re-enter New Password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Password not matching"));
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="Confirm your Password"
                style={styles.borderRadius}
                value={cpassword}
                onChange={(e: any) => setCpassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  danger
                  style={styles.borderRadius}
                  onClick={forgot}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  style={styles.borderRadius}
                  htmlType="submit"
                >
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default ResetPassword;

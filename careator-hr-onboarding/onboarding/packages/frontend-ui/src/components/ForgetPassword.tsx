import { Button, Form, Input, notification, Space } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Typography } from "antd";
import UserService from "../services/UserService";
import EmailActions from "../store/actions/EmailAction";
import styles from "../styles/style";
import { AppType } from "../types";
import { host } from "../constants";

import ForgotTokenActions from "../store/actions/ForgotTokenActions";
type Props = {
  hideLoader: () => void;
  showLoader: () => void;
  forgot: () => void;
};

const { Text } = Typography;

const ForgetPassword: React.FC<Props> = ({
  hideLoader,
  showLoader,
  forgot,
}) => {
  const [email, setEmail] = useState("");
  const error1: any = useSelector<AppType>((state) => state.emailError.error);

  const userToken = useSelector<AppType>(
    (state) => state.forgotToken.forgot.access_token
  );
  console.log(userToken);
  const host1 = `http://${host}/resetPassword`;
  const userId = localStorage.getItem("userId");
  console.log(userId);

  const dispatch = useDispatch();
  const emailerror = bindActionCreators(EmailActions.emailError, dispatch);

  const mailSuccess = bindActionCreators(
    ForgotTokenActions.mailSuccess,
    dispatch
  );
  const onFinish = async () => {
    try {
      showLoader();
      const { data } = await UserService.forgotPassword(email, host1);
      hideLoader();
      openNotification("topRight");
      mailSuccess(data);
      setTimeout(() => {
        window.location.href = "/";
      });
    } catch (error: any) {
      emailerror(error.message.toString());
      console.log("email error", error1);
      hideLoader();
    }
  };

  const openNotification = (placement: any) => {
    notification.info({
      message: `Notification `,
      description: "Please Check your Email and Reset Your password...!",
    });
  };

  return (
    <>
      <h2>Forgot Password</h2>
      <Text type="danger">{error1}</Text>
      <Form
        name="normal_login"
        layout="vertical"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="userEmail"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            placeholder="Enter your Email"
            style={styles.borderRadius}
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
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
              htmlType="submit"
              style={styles.borderRadius}
            >
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgetPassword;

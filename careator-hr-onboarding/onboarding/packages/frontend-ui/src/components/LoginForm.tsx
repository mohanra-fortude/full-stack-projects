import { Form, Input, Button, Checkbox } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "antd";
import styles from "../styles/style";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import StorageService from "../services/StorageService";
import UserService from "../services/UserService";
import UserActions from "../store/actions/UserActions";
import { AppType } from "../types";
import * as CryptoJS from "crypto-js";

type LayoutType = Parameters<typeof Form>[0]["layout"];
type Props = {
  forgot: () => void;
  hideLoader: () => void;
  showLoader: () => void;
  loginAction: () => void;
};
const { Text } = Typography;
const LoginForm: React.FC<Props> = ({
  forgot,
  hideLoader,
  showLoader,
  loginAction,
}) => {
  const [formLayout] = useState<LayoutType>("vertical");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");

  const error: any = useSelector<AppType>((state) => state.userSession.error);

  let key = CryptoJS.enc.Utf8.parse("4512631236589784");
  let iv = CryptoJS.enc.Utf8.parse("4512631236589784");

  console.log(userId);
  const formItemLayout =
    formLayout === "vertical"
      ? {
          labelCol: { span: 16 },
          wrapperCol: { span: 24 },
        }
      : null;
  console.log(formItemLayout);

  // Method for the encrypt string  Using CryptoJs
  function encryptUsingAES256() {
    var encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(password),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    //storing cookies upto 12 days from now
    setCookie("access_key", encrypted, 12);
    return encrypted;
  }

  const dispatch = useDispatch();
  const loginSucess = bindActionCreators(UserActions.loginSuccess, dispatch);
  const loginError = bindActionCreators(UserActions.loginError, dispatch);
  const fromStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  };
  const reload = () => {
    window.location.reload();
  };
  //function for setting cookie
  function setCookie(name: any, value: any, days: any) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie =
      encodeURI(name) +
      "=" +
      (value || "") +
      expires +
      "; path=/" +
      "; samesite=strict" +
      "; secure";
  }
  //function for deleting cookies
  function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  window.localStorage.setItem("TabKey","1")

  

  const onFinish = async (values: any) => {
    try {
      showLoader();
      const { data } = await UserService.login(email, password);
      setUserId(data.userId);
      const data1 = await UserService.firstTimeLogin(data.userId);
      await StorageService.storeData("token", data.access_token);
      await UserService.updateToken(data.userId, data.access_token);
      window.localStorage.setItem("email", email);
      encryptUsingAES256();
      window.localStorage.setItem("userId", data.userId);
      loginSucess(data); //adding user data to redux store

      if (data1.data.firstTimeLogin === 1) {
        //clearing local storage
        localStorage.clear();
        //clearing all cookies
        deleteAllCookies();
        window.location.pathname = `/resetPassword/${data.userId}/${data.access_token}`;
      } else {
        loginAction();
        reload();
      }
      hideLoader();
    } catch (e: any) {
      loginError(e.message.toString());
      hideLoader();
    }
  };

  return (
    <>
      <h2>Login</h2>
      <Text type="danger">{error}</Text>

      <Form
        
        name="normal_login"
        layout="vertical"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
       
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter valid email!",
              type: "email",
            },
          ]}
        >
          <Input
            placeholder="Enter Email"
            style={styles.borderRadius}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // defaultValue={email1}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // defaultValue={password1}
            style={styles.borderRadius}
          />
        </Form.Item>
        <Form.Item style={fromStyle}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link to="/" style={{ float: "right" }} onClick={forgot}>
            Forgot Password
          </Link>
        </Form.Item>
        <Form.Item>
          <Button type="primary" style={styles.borderRadius} htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default LoginForm;

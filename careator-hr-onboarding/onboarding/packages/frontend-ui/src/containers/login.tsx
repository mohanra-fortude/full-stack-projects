import { Col, Row, Spin } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";
import ForgetPassword from "../components/ForgetPassword";
import LoginForm from "../components/LoginForm";
import Logo from "../components/Logo";
import RecruiterImg from "../components/RecruiterImg";

import LoadingAction from "../store/actions/LoadingAction";

import { AppType } from "../types";
import "./login.css";
type LoginProps = {
  showLoader: () => void;
  hideLoader: () => void;
  loader: any;
  loginAction: () => void;
} & RouteComponentProps;
const Login: React.FC<LoginProps> = ({
  hideLoader,
  showLoader,
  loader,
  loginAction,
}) => {
  const [forgot, setForgot] = useState(false);

  const toggle = () => setForgot(!forgot);

  return (
    <>
      <>
        <Logo />
        <Row wrap={true}>
          <RecruiterImg />
          <Col
            xs={{ span: 18, offset: 3 }}
            md={{ span: 7, offset: 8 }}
            style={{ marginTop: "6rem" }}
            className="inp1"
          >
            {forgot ? (
              <ForgetPassword
                forgot={toggle}
                showLoader={showLoader}
                hideLoader={hideLoader}
              />
            ) : (
              <LoginForm
                forgot={toggle}
                showLoader={showLoader}
                hideLoader={hideLoader}
                loginAction={loginAction}
              />
            )}
          </Col>
        </Row>
      </>
    </>
  );
};
const mapStoreDataToProps = (storeData: AppType) => {
  return {
    loader: storeData.loading, // converting to boolean
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    hideLoader: () => dispatch(LoadingAction.hideLoader()),
    showLoader: () => dispatch(LoadingAction.showLoader()),
  };
};
export default connect(mapStoreDataToProps, mapDispatchToProps)(Login);

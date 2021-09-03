import React from "react";
import { Breadcrumb, Layout } from "antd";
import { Typography } from "antd";
import getUserData from "../utils/UserData";
import "../styles/Workspace.css";

const { Title } = Typography;
const { Content } = Layout;

function Workspace() {
  const { firstName, lastName, lastLogin } = getUserData();

  const twelveHourFormatter = (time: any) => {
    let hour = time.split(":")[0];
    let min = time.split(":")[1];
    let part = hour > 12 ? "pm" : "am";
    min = (min + "").length === 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour + "").length === 1 ? `0${hour}` : hour;
    return `${hour}:${min} ${part}`;
  };

  var loginDate = lastLogin.substring(0, 15);
  var timeString = lastLogin.substring(16, 24);

  var loginTimeIndian = twelveHourFormatter(timeString);
  let currentDate = new Date().toUTCString().substring(0, 16);
  let currentTime = new Date().toLocaleTimeString();

  return (
    <Layout className="workspace">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>My Workspace</Breadcrumb.Item>
      </Breadcrumb>
      <Content className="workspace__content">
        <Title>
          {" "}
          Welcome {firstName} {lastName}
        </Title>
        {lastLogin === "" || lastLogin === null || lastLogin === undefined ? (
          <Title level={4}>
            Your last login was on {currentDate} {currentTime}
          </Title>
        ) : (
          <Title level={4}>
            Your last login was on {loginDate} {loginTimeIndian}
          </Title>
        )}
      </Content>
    </Layout>
  );
}

export default Workspace;

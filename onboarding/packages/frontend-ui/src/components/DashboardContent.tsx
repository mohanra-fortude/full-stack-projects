import React, { useEffect, useState } from "react";
import { Layout, Card, Breadcrumb } from "antd";

import { admin_breadcrumbs } from "../components/Breadcrumb/allBreadCrumbs";
import "../styles/DashboardStyle.css";
import { constants } from "../constants";
import axios from "axios";
import { Link } from "react-router-dom";
const url = `${constants.BASE_URL}/userrole`;

const { Content } = Layout;

function DashboardContent() {
  const [roleD, setRole] = useState([]);

  useEffect(() => {
    dashboardGetData();
  }, []);

  const dashboardGetData = async () => {
    const response = await axios.get(url);
    setRole(response.data);
  };

  const colourList: string[] = ["#ffccc7", "#e6f7ff", "#ebf3ae", "#afa6d6"];

  return (
    <Content
      className="content"
      style={{ maxWidth: "96%", marginLeft: "1rem" }}
    >
      <Breadcrumb className="breadcrumbs">
        <Breadcrumb.Item className="breadcrumbs_items">
          <Link to={admin_breadcrumbs[0].path}>
            {admin_breadcrumbs[0].name}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{admin_breadcrumbs[1].name}</Breadcrumb.Item>
      </Breadcrumb>

      <div className="background">
        {/* <div className="ant-row dashboard"> */}
        {roleD.map((val: any, counter) => {
          let roleId: number = 0;

          switch (val.description) {
            case "Leadership":
              roleId = 2;
              break;

            case "Account Manager":
              roleId = 3;
              break;

            case "Human Resource":
              roleId = 4;
              break;

            case "Recruiter":
              roleId = 5;
              break;

            default:
              break;
          }
          const list = [
            { text: "Admin", value: "1" },
            { text: "Leader", value: "2" },
            { text: "AM", value: "3" },
            { text: "HR", value: "4" },
            { text: "Recruiter", value: "5" },
          ];

          return (
            <div className="cardmain" key={counter}>
              <Link
                to={{
                  pathname: "/admin/manage-employees",
                  state: { roleFromDashboard: val.roleId },
                }}
              >
                <Card
                  className="card"
                  style={{ background: colourList[counter] }}
                  hoverable
                >
                  <h1 className="bigNumbers">{val.userCount}</h1>
                  <p className="cardtext">{val.description}</p>
                </Card>
              </Link>
            </div>
          );
        })}
        {/* </div> */}
      </div>
    </Content>
  );
}

export default DashboardContent;

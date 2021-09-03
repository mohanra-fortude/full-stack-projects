import Layout from "antd/lib/layout/layout";
import { Component } from "react";
import DashboardContent from "../components/DashboardContent";

export default class dashboard extends Component {
  render() {
    return (
      <Layout>
        <DashboardContent />
      </Layout>
    );
  }
}

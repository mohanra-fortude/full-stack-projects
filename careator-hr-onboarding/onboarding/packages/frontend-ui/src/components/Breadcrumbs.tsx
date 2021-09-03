import React from "react";
import { Layout, Breadcrumb, Row } from "antd";

function Breadcrumbs() {
  return (
    <Row>
      <Layout>
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item>
            <a href="#">My Workspace</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
      </Layout>
    </Row>
  );
}

export default Breadcrumbs;

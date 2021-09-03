import React, { useState } from "react";
import { Layout } from "antd";
import PageSideBar from "../components/page-layout/sidebar/PageSideBar";
import PageNavBar from "../components/page-layout/navbar/PageNavBar";
import "../styles/PageLayout.css";

const { Content, Footer } = Layout;

type Props = {
  role: string;
};

const PageLayout: React.FC<Props> = ({ ...props }) => {
  const { role } = props;
  const [collapsed, setCollapsed] = useState(false);
  const [toggleAllowed, setToggleAllowed] = useState(true);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  function grantToggleAllowed() {
    setToggleAllowed(!toggleAllowed);
  }
  return (   
    <Layout>     
      <PageSideBar
        collapsed={collapsed}
        role={role}
        grantToggleAllowed={grantToggleAllowed}
        toggle={toggle}
      />
      <Layout>
        <PageNavBar toggle={toggle} toggleAllowed={toggleAllowed} />
        <Content className="pagelayout__content" {...props}></Content>
        <Footer className="pagelayout__footer">
          © Careator Technologies. All rights reserved
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PageLayout;

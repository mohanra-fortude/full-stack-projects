import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb, Row, Card } from "antd";
import "../../styles/RecruiterDashboardStyle.css";
import axios from "axios";
import { constants } from "../../constants";
import { Link } from "react-router-dom";
import { recruiter_breadcrumbs } from "../../components/Breadcrumb/allBreadCrumbs";
import "../../components/Breadcrumb/BreadCrumb.css";
import StorageServices from "../../services/StorageService";
const { Content } = Layout;

function RecruiterDashboard() {
  const [cand_count, setCand_Count] = useState(0);
  const [cand_pend_doc_count, setCand_pend_doc_count] = useState(0);
  const [cand_pend_rev_doc_count, setCand_pend_rev_doc_count] = useState(0);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    candidateCount();
  }, []);
  const candidateCount = async () => {
    const url = `${constants.BASE_URL}/candidate/count?RecruiterID=${userId}`;
     return StorageServices.getData("token")
     .then((token) =>
       axios.get(url, {
         headers: { Authorization: `Bearer ${token}` },
       })
     )
      .then((data) => {
        setCand_Count(data.data.candidate_count);
        setCand_pend_doc_count(data.data.pend_doc_count);
        setCand_pend_rev_doc_count(data.data.pend_rev_doc_count);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Row style={{ maxWidth: "95%", marginLeft: "1.5rem" }}>
        <Layout className="layout-background">
          <Breadcrumb className="breadcrumbs">
            <Breadcrumb.Item>
              <Link to={recruiter_breadcrumbs[0].path}>
                {recruiter_breadcrumbs[0].name}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{recruiter_breadcrumbs[1].name}</Breadcrumb.Item>
          </Breadcrumb>
          <Content className="recuratersiteBackground">
            <div className="recuraterCards">
              <div className="recuraterCardMain">
                <Link to="/recruiter/manage-candidates">
                  <Card
                    className="card"
                    style={{ background: "#e6f7ff" }}
                    hoverable
                  >
                    <h1 className="bigNumbers">
                      <b>{cand_count}</b>
                    </h1>
                    <h4>Candidates Total</h4>
                  </Card>
                </Link>
              </div>

              <div className="recuraterCardMain">
                <Link
                  to={{
                    pathname: "/recruiter/manage-candidates",
                    state: { status: "CC" },
                  }}
                >
                  <Card
                    className="card"
                    style={{ background: "#d9f7be" }}
                    hoverable
                  >
                    <h1 className="bigNumbers">
                      <b>{cand_pend_doc_count}</b>
                    </h1>
                    <h4>Candidates Pending Documents Upload</h4>
                  </Card>
                </Link>
              </div>
              <div className="recuraterCardMain">
                <Link
                  to={{
                    pathname: "/recruiter/manage-candidates",
                    state: { status: "DU" },
                  }}
                >
                  <Card
                    className="card"
                    style={{ background: "#ffccc7" }}
                    hoverable
                  >
                    <h1 className="bigNumbers">
                      <b>{cand_pend_rev_doc_count}</b>
                    </h1>
                    <h4>Candidates Pending Documents Review</h4>
                  </Card>
                </Link>
              </div>
            </div>
          </Content>
        </Layout>
      </Row>
    </>
  );
}
export default RecruiterDashboard;

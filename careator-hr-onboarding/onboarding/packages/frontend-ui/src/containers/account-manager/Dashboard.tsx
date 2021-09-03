import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb, Row, Card, Col } from "antd";
import { Link } from "react-router-dom";
import { constants } from "../../constants";
import "../../styles/AccountManagerDashbord.css";
import axios from "axios";
import { account_manager_breadcrumbs } from "../../components/Breadcrumb/allBreadCrumbs";
import "../../components/Breadcrumb/BreadCrumb.css";
import StorageServices from "../../services/StorageService";
import getUserData from "../../utils/UserData";
import CandidateService from "../../services/CandidateService";

const { Content } = Layout;

function Dashboard() {
  const [cand_count, setCand_Count] = useState(0);
  const [cand_pend_doc_count, setCand_pend_doc_count] = useState(0);
  const [cand_pend_rev_doc_count, setCand_pend_rev_doc_count] = useState(0);
  const [recru_rev_done_count, setRecru_rev_deo_count] = useState(0);
  const [hr_rev_done_count, sethr_rev_done_count] = useState(0);
  const [offer_req_appr_count, setOffer_req_appr_count] = useState(0);
  const [offer_req_rej_count, setOffer_req_rej_count] = useState(0);

  console.log(cand_pend_doc_count)
  useEffect(() => {
    candidateCount();
  }, []);
  const candidateCount = async () => {
    let ruid: string = "";
    const getRecruiters = async () => {
      const { userId } = getUserData();
      const { data } = await CandidateService.getRecruitersByUid(userId);

      data.map((val: any) => {
        ruid += `${val.userId},`;
        return ruid;
      });
      ruid = ruid.substring(0, ruid.length - 1);

    };
    await getRecruiters();
    const url = `${constants.BASE_URL}/candidate/candidateCount?recruiterIds=${ruid}
    `;
    return StorageServices.getData("token")
      .then((token) =>
        axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
      .then((data) => {
        setCand_Count(data.data.candidate_count);
        setCand_pend_doc_count(data.data.pend_doc_count);
        setCand_pend_rev_doc_count(data.data.doc_upload_count);
        setRecru_rev_deo_count(data.data.recru_rev_done_count);
        sethr_rev_done_count(data.data.hr_rev_done_count);
        setOffer_req_appr_count(data.data.offer_req_appr_count);
        setOffer_req_rej_count(data.data.offer_req_rej_count);
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <Row style={{ maxWidth: "90%", marginLeft: "3rem" }}>
        <div>
          <Layout>
            <Breadcrumb className="breadcrumbs accountManagerBread">
              <Breadcrumb.Item className="breadcrumbs_items">
                <Link to={account_manager_breadcrumbs[0].path}>
                  {account_manager_breadcrumbs[0].name}
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                {account_manager_breadcrumbs[1].name}
              </Breadcrumb.Item>
            </Breadcrumb>
          </Layout>
        </div>
        <Content className="site-layout-accountMan-background">
          <Row gutter={5} className="accountDashRow">
            <Link to="/account-manager/manage-candidates" className="cardMain">
              <Col span={8}>
                <Card
                  className="cardMenu"
                  style={{ background: "#e6f7ff" }}
                  hoverable
                >
                  <h1 className="bigNumbers">
                    <b>{cand_count}</b>
                  </h1>
                  <h4> Total Candidates</h4>
                </Card>
              </Col>
            </Link>

            <Link
              to={{
                pathname: "/account-manager/manage-candidates",
                state: { status: "DU" },
              }}
              className="cardMain"
            >
              <Col span={8}>
                <Card
                  className="cardMenu"
                  style={{ background: "#ebf3adfc" }}
                  hoverable
                >
                  <h1 className="bigNumbers">
                    <b>{cand_pend_rev_doc_count}</b>
                  </h1>
                  <h4>Document Uploaded</h4>
                </Card>
              </Col>
            </Link>

            <Link
              to={{
                pathname: "/account-manager/manage-candidates",
                state: { status: "RRD" },
              }}
              className="cardMain"
            >
              <Col span={8}>
                <Card
                  className="cardMenu"
                  style={{ background: "#e6f7ff" }}
                  hoverable
                >
                  <h1 className="bigNumbers">
                    <b>{recru_rev_done_count}</b>
                  </h1>
                  <h4>Recruiter Review Done</h4>
                </Card>
              </Col>
            </Link>

            <Link
              to={{
                pathname: "/account-manager/manage-candidates",
                state: { status: "HRD" },
              }}
              className="cardMain"
            >
              <Col span={8}>
                <Card
                  className="cardMenu"
                  style={{ background: "#ffccc7" }}
                  hoverable
                >
                  <h1 className="bigNumbers">
                    <b>{hr_rev_done_count}</b>
                  </h1>
                  <h4>HR Review Done </h4>
                </Card>
              </Col>
            </Link>

            <Link
              to={{
                pathname: "/account-manager/manage-candidates",
                state: { status: "ORA" },
              }}
              className="cardMain"
            >
              <Col span={8}>
                <Card
                  className="cardMenu"
                  style={{ background: "#ebf3adfc" }}
                  hoverable
                >
                  <h1 className="bigNumbers">
                    <b>{offer_req_appr_count}</b>
                  </h1>
                  <h4>Offer Request Approved</h4>
                </Card>
              </Col>
            </Link>

            <Link
              to={{
                pathname: "/account-manager/manage-candidates",
                state: { status: "ORR" },
              }}
              className="cardMain"
            >
              <Col span={8}>
                <Card
                  className="cardMenu"
                  style={{ background: "#ffccc7" }}
                  hoverable
                >
                  <h1 className="bigNumbers">
                    <b>{offer_req_rej_count}</b>
                  </h1>
                  <h4>Offer Request Rejected </h4>
                </Card>
              </Col>
            </Link>
          </Row>
        </Content>
      </Row>
    </>
  );
}

export default Dashboard;

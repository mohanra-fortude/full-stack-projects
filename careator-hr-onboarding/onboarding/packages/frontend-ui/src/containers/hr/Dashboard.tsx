import { useState, useEffect } from "react";
import { Card, Row, Breadcrumb, Layout, Col } from "antd";
import "../../styles/HRDashboardStyle.css";
import { constants } from "../../constants";
import { Link } from "react-router-dom";
import { hr_breadcrumbs } from "../../components/Breadcrumb/allBreadCrumbs";
import "../../components/Breadcrumb/BreadCrumb.css";
import axios from "axios";
import StorageServices from "../../services/StorageService";
import getUserData from "../../utils/UserData";
import CandidateService from "../../services/CandidateService";

const { Content } = Layout;

function Dashboard() {
  const [cand_count, setCand_Count] = useState(0);
  const [doc_upload_count, setDoc_upload_count] = useState(0);
  const [recru_rev_done_count, setRecru_rev_deo_count] = useState(0);
  const [can_rej_offer_count, setCan_rej_offer_count] = useState(0);
  const [can_accpt_offer_count, setCan_accpt_offer_count] = useState(0);
  

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
        setDoc_upload_count(data.data.doc_upload_count);
        setRecru_rev_deo_count(data.data.recru_rev_done_count);
        setCan_rej_offer_count(data.data.can_rej_offer_count);
        setCan_accpt_offer_count(data.data.can_accpt_offer_count);
      })
      .catch((e) => console.log(e));
  };

  const colourList: string[] = ["#e6f7ff", "#d9f7be", "#ffccc7"];
  return (
    <>
      <Row style={{ maxWidth: "90%", marginLeft: "3rem" }}>
        <Layout className="layout-back">
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to={hr_breadcrumbs[0].path}>{hr_breadcrumbs[0].name}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{hr_breadcrumbs[1].name}</Breadcrumb.Item>
          </Breadcrumb>
        </Layout>
        <Content className="HrDash-background">
          <Row gutter={5} className="hrDashRow">
            <Link to="/hr/manage-candidates" className="hrLink">
              <Col span={8}>
                <Card
                  className="cardData"
                  style={{ background: colourList[0] }}
                  hoverable
                >
                  <h1 className="boldNumbers">
                    <b>{cand_count}</b>
                  </h1>
                  <h4 className="addSize"> Total Candidates</h4>
                </Card>
              </Col>
            </Link>

            <Link
              to={{
                pathname: "/hr/manage-candidates",
                state: { status: "DU" },
              }}
            >
              <Col span={8}>
                <Card
                  className="cardData"
                  style={{ background: colourList[1] }}
                  hoverable
                >
                  <h1 className="boldNumbers">
                    <b>{doc_upload_count}</b>
                  </h1>
                  <h4 className="addSize">Documents Uploaded</h4>
                </Card>
              </Col>
            </Link>

            <Link
              to={{
                pathname: "/hr/manage-candidates",
                state: { status: "RRD" },
              }}
            >
              <Col span={8}>
                <Card
                  className="cardData"
                  style={{ background: colourList[0] }}
                  hoverable
                >
                  <h1 className="boldNumbers">
                    <b>{recru_rev_done_count}</b>
                  </h1>
                  <h4 className="addSize">Recruiter Review Done</h4>
                </Card>
              </Col>
            </Link>

            <Link
              to={{
                pathname: "/hr/manage-candidates",
                state: { status: "CAO" },
              }}
            >
              <Col span={8}>
                <Card
                  className="cardData"
                  style={{ background: colourList[1] }}
                  hoverable
                >
                  <h1 className="boldNumbers">
                    <b>{can_accpt_offer_count}</b>
                  </h1>
                  <h4 className="addSize">Candidate Accepted Offer</h4>
                </Card>
              </Col>
            </Link>

            <Link
              to={{
                pathname: "/hr/manage-candidates",
                state: { status: "CRO" },
              }}
            >
              <Col span={8}>
                <Card
                  className="cardData"
                  style={{ background: colourList[2] }}
                  hoverable
                >
                  <h1 className="boldNumbers">
                    <b>{can_rej_offer_count}</b>
                  </h1>
                  <h4 className="addSize">Candidates Rejected Offer</h4>
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

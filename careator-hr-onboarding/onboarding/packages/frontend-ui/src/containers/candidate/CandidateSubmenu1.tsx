import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb } from "antd";
import { Tabs } from "antd";
import EducationInfoMain from "../EducationInfoMain";
import ExperienceInfoMain from "../ExperienceInfoMain";
import CandidateBasicInfo from "../CandiateBasicInfo";
import OtherDocumentsMain from "../../containers/OtherDocumentsMain";
import { Link } from "react-router-dom";
import { candidate_breadcrumbs } from "../../components/Breadcrumb/allBreadCrumbs";
import "../../components/Breadcrumb/BreadCrumb.css";
import CandidateService from "../../services/CandidateService";
import DocumentService from "../../services/DocumentService";
import BasicIdService from "../../services/BasicIdService";

const { Content } = Layout;
const { TabPane } = Tabs;
const userId: any = localStorage.getItem("userId");

function CandidateSubmenu1() {
  const [candidateState, setcandidateState] = useState(false);
  const [testSend, setTestSend] = useState(false);
  const [sample, setSample] = useState(true);
  const [tabKey, setTabKey] = useState("1");
  const [aadhaarflag, setAadhaarFlag] = useState(true);
  const [panflag, setPanFlag] = useState(true);

  const getData = async () => {
    const data: any = await CandidateService.getCandidateBasicInfo(userId);
    if (data.data.statusCode !== "CC") {
      setcandidateState(true);
    }
  };

  const getAadhaarPan = async () => {
    const data1: any = await BasicIdService.getBasicIdByUserId(userId);
    data1.data.forEach((value: any, key: any) => {
      if (value.documentName === "Aadhaar") {
        setAadhaarFlag(false);
      } else if (value.documentName === "Pan Card") {
        setPanFlag(false);
      }
    });
  };

  useEffect(() => {
    getData();
    getAadhaarPan();
    setTabKey(window.localStorage.getItem("TabKey") || "1");
    window.localStorage.setItem("TabKey", "1");
  }, []);

  const showSendToRec = async (activeKey: any) => {
    setTabKey(activeKey);
    await showSendToRec1();
  };

  const showSendToRec1 = async () => {
    const udocs = await DocumentService.getUDocs(userId);
    console.log(
      "Uploaded documents",
      udocs.data.some((val: any) => {
        return val.status === "RR" || val.status === "HRR";
      })
    );
    console.log("Uploaded documents", udocs);
    await udocs.data.map((val: any) => {
      if (val.status === "HRR" || val.status === "RR") {
        setTestSend(true);
      }
    });
  };

  const reRender = async () => {
    const udocs1 = await DocumentService.getUDocs(userId);
    if (
      udocs1.data.some((val: any) => {
        return val.status === "RR" || val.status === "HRR";
      })
    ) {
      setSample(true);
    } else {
      setSample(false);
      setAadhaarFlag(false);
      setPanFlag(false);
    }
  };

  return (
    <div>
      <Layout className="workspace">
        <Breadcrumb className="breadcrumbs">
          <Breadcrumb.Item className="breadcrumbs_items">
            <Link to={candidate_breadcrumbs[0].path}>
              {candidate_breadcrumbs[0].name}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{candidate_breadcrumbs[1].name}</Breadcrumb.Item>
        </Breadcrumb>
        <Content className="workspace__content">
          <Tabs
            defaultActiveKey="1"
            activeKey={tabKey}
            onChange={showSendToRec}
          >
            <TabPane tab="Candidate Info" key="1">
              <CandidateBasicInfo candidateStateAsProps={candidateState} />
            </TabPane>

            <TabPane tab="Educational Details" key="2">
              <EducationInfoMain
                candidateStateAsProps={candidateState}
                sample={sample}
                reRender1={reRender}
              />
            </TabPane>
            <TabPane tab="Experience Details" key="3">
              <ExperienceInfoMain
                candidateStateAsProps={candidateState}
                sample={sample}
                reRender1={reRender}
              />
            </TabPane>
            <TabPane tab="ID Documents" key="4">
              <OtherDocumentsMain
                candidateStateAsProps={candidateState}
                testSend={testSend}
                reRender={showSendToRec1}
                sample={sample}
                reRender1={reRender}
                getAadhaarPan={getAadhaarPan}
                aadhaarflag={aadhaarflag}
                panflag={panflag}
              />
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </div>
  );
}

export default CandidateSubmenu1;

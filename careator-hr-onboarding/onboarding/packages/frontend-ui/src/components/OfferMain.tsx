import React, { useEffect, useState } from "react";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import Offerletter from "../containers/Offerletter";
import { Button, Checkbox, message, Modal, Popconfirm } from "antd";
import UserService from "../services/UserService";
import CandidateService from "../services/CandidateService";
import { offerTypes } from "../types";
import axios from "axios";
import DocumentService from "../services/DocumentService";
import ContractOfferletter from "../containers/ContractOfferletter";
import LoadingWrapper from "./LoadingWrapper";
import { constants, host } from "../constants";
import { Link, useHistory } from "react-router-dom";
import OfferTemplate from "./OfferTemplate";
let filename: any;
let link: string = `http://${host.split("/")[0]}`;
const OfferMain: React.FC = () => {
  const [offerData, setOfferData] = useState<offerTypes>();
  const [contractOffer, contractOfferData] = useState<offerTypes>();
  const [Template2, setTemplate2] = useState(false);
  const userId: any = localStorage.getItem("userId");
  const email: any = localStorage.getItem("email");
  const [statusC, setStatusC] = useState(" ");
  const [statusC1, setStatusC1] = useState(" ");
  const [fullname, setFullname] = useState("");
  const [statusData, setStatusData] = useState("");
  const history = useHistory();
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [cemail, setCandidateEmail] = useState("");
  const roleData = localStorage.getItem("role");

  let cname = name.firstName + " " + name.lastName;
  const userId1 = window.location.pathname.split("/")[2];
  const getNamecandidate = async () => {
    const Ename: any = await UserService.getNameByCUserId(userId1);
    setName(Ename.data);
    setFullname(Ename.data.firstName + " " + Ename.data.lastName);
  };
  const [conformVisible, setconformVisible] = useState(false);
  let d = new Date().toUTCString().substring(5, 11);
  let t = new Date().toLocaleTimeString();

  let renegotiation = localStorage.getItem("renegotiation");

  const [status, setStatus] = useState(true);
  let statusCode = "OR";
  console.log(statusCode);
  console.log(status);
  let subject = " ";
  let description = " ";
  if (renegotiation === "1") {
    subject = `${statusC} ${statusC1} renegotiated and released the offer to ${cname}`;
    description = `${statusC} ${statusC1} renegotiated and released the offer`;
  } else {
    subject = `${statusC} ${statusC1} released the offer to ${cname}`;
    description = `${statusC} ${statusC1} released the offer`;
  }

  const success = () => {
    message.success("Offer released successfully");
  };
  const getEmail = async () => {
    const emails = await CandidateService.getEmailByuserId(userId1);
    if (roleData === "HR") {
      setCandidateEmail(emails.data.candidateEmail.email);
    } else {
      setCandidateEmail(emails.data.leaderEmail);
    }
  };
  const getName = async () => {
    const Cname: any = await UserService.getNameByEUserId(userId);
    setStatusC(Cname.data.firstName);
    setStatusC1(Cname.data.lastName);
  };

  const red = () => {
    if (roleData === "HR") {
      history.push(`/hr/manage-candidates`);
    } else {
      history.push(`/account-manager/manage-candidates`);
    }
  };

  const Pdfsave = async () => {
    if (offerData?.modeOfEmp === "Permenant") {
      if (Template2) {
        const blob = await pdf(<OfferTemplate pdfsave={offerData} />).toBlob();
        const pdfdata = new FormData();
        pdfdata.append("docfile", blob, "offer.pdf");

        filename = await DocumentService.createOfferletter(pdfdata, userId1);
      } else {
        const blob = await pdf(<Offerletter pdfsave={offerData} />).toBlob();
        const pdfdata = new FormData();
        pdfdata.append("docfile", blob, "offer.pdf");

        filename = await DocumentService.createOfferletter(pdfdata, userId1);
      }
    } else {
      const blob = await pdf(
        <ContractOfferletter contractpdf={contractOffer} />
      ).toBlob();
      const pdfdata = new FormData();
      pdfdata.append("docfile", blob, "offerletter.pdf");

      filename = await DocumentService.createOfferletter(pdfdata, userId1);
    }
  };
  useEffect(() => {
    const url = `${constants.BASE_URL}/offer/findOneCandidate/${userId1}`;
    axios
      .get<offerTypes>(url)
      .then((list: any) => {
        setOfferData(list.data[0]);
        contractOfferData(list.data[0]);
      })
      .catch((err) => console.log(err));
    getName();
    getNamecandidate();
    getEmail();
  }, []);

  const candidateStatus = async () => {
    const maildata = {
      link: link,
      fullname: fullname,
    };
    console.log("Status Data", statusData);
    await CandidateService.sendEmailOffer(
      userId1,
      userId,
      statusData,
      subject,
      description,
      cemail,
      email,
      maildata
    );

    localStorage.setItem("renegotiation", "0");
    localStorage.removeItem("renegotiation");
  };
  useEffect(() => {
    if (roleData === "HR") {
      setStatusData("OR");
    } else {
      setStatusData("ORI");
    }
  });

  return (
    <div>
      <Checkbox
        style={{ marginLeft: 100, marginTop: 10, fontSize: 20 }}
        onChange={(e) => setTemplate2(e.target.checked)}
      >
        Template 2
      </Checkbox>
      {/* <LoadingWrapper> */}
      {/* <Modal
          title="Confirm"
          centered
          visible={conformVisible}
          onOk={async () => {
            await Pdfsave();
            setStatus(true);
            candidateStatus();
            success();
            red();
            setTimeout(() => {
              setconformVisible(false);
            }, 1000);
          }}
          onCancel={() => setconformVisible(false)}
        >
          <h4>Are You Sure you Want To Release Offer Letter?</h4>
        </Modal> */}

      {offerData?.modeOfEmp === "Permenant" ? (
        Template2 ? (
          <PDFViewer
            style={{ width: 900, height: 500, marginLeft: 100, marginTop: 5 }}
          >
            <OfferTemplate pdfsave={offerData} />
          </PDFViewer>
        ) : (
          <PDFViewer
            style={{ width: 900, height: 500, marginLeft: 100, marginTop: 5 }}
          >
            <Offerletter pdfsave={offerData} />
          </PDFViewer>
        )
      ) : (
        <PDFViewer
          style={{ width: 900, height: 500, marginLeft: 100, marginTop: 5 }}
        >
          <ContractOfferletter contractpdf={contractOffer} />
        </PDFViewer>
      )}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Popconfirm
          title="Are You Sure you Want To Release Offer Letter?"
          onConfirm={async () => {
            await Pdfsave();
            setStatus(true);
            await candidateStatus();
            success();
            red();
            setTimeout(() => {
              setconformVisible(false);
            }, 1000);
          }}
        >
          <Button
            type="primary"
            style={{ marginRight: "2rem", borderRadius: ".25rem" }}
            onClick={() => {
              setconformVisible(true);
            }}
          >
            Release Offer
          </Button>
        </Popconfirm>
        {/* <Button onClick={()=>setTemplate2(true)}>Template2</Button> */}
      </div>
      {/* </LoadingWrapper> */}
    </div>
  );
};

export default OfferMain;

import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Card,
  Form,
  Input,
  Layout,
  message,
  Modal,
  Popconfirm,
  Space,
  Typography,
} from "antd";
import { candidate_breadcrumbs } from "../../components/Breadcrumb/allBreadCrumbs";
import "../../components/Breadcrumb/BreadCrumb.css";
import CandidateService from "../../services/CandidateService";
import UserService from "../../services/UserService";
import DocumentService from "../../services/DocumentService";
import { Page, Document } from "react-pdf";
import getUserData from "../../utils/UserData";
import { LeftCircleTwoTone, RightCircleTwoTone } from "@ant-design/icons";
import mailService from "../../services/mailService";
import OfferService from "../../services/OfferService";
import { offerTypes } from "../../types";
import axios from "axios";
import { constants, host } from "../../constants";

const { Title } = Typography;
const { Content } = Layout;

function CandidateSubmenu2() {
  const userId: any = localStorage.getItem("userId");
  const [statusC, setStatusC] = useState(" ");
  const [statusC1, setStatusC1] = useState(" ");
  const [candidateEmail, setCandidateEmail] = useState(" ");
  const [amEmail, setAmEmail] = useState(" ");
  const [leaderEmail, setleaderEmail] = useState(" ");
  const [hrEmail, setHrEmail] = useState(" ");
  const [fileview, setFileview] = useState("");
  const [recruiterEmail, setRecuiterEmail] = useState();
  const [conformVisible, setconformVisible] = useState(false);
  const [conformVisible1, setconformVisible1] = useState(false);
  const [fileData, setfileData] = useState<any>();
  const [numPages, setNumPages] = useState(0);
  const [statusCode, setStatusCode] = useState("");
  const history = useHistory();
  const [offerData, setOfferData] = useState<offerTypes>();

  const [pageNumber, setPageNumber] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [documentId, setDocumentId] = useState(0);
  const [remark, setRemark] = useState("");
  const [form] = Form.useForm();

  const [a, setA] = useState(false);
  const [Offer, setOffer] = useState(false);
  const { firstName, lastName } = getUserData();

  let emails = recruiterEmail + "," + amEmail + "," + leaderEmail;

  const [status, setStatus] = useState(true);
  let subject = "";
  status
    ? (subject = "Offer Request Accepted")
    : (subject = "Offer Request Rejected");

  let description1 = statusC + " " + statusC1 + " " + "Accepted Offer Request";
  let description2 = statusC + " " + statusC1 + " " + "Rejected Offer Request";
  const success = () => {
    message.success("Accepted offer");
    setOffer(true);
  };

  const warning = () => {
    message.warning("Rejected offer");
    setOffer(true);
  };
  const getName = async () => {
    const Cname: any = await UserService.getNameByCUserId(userId);
    setStatusC(Cname.data.firstName);
    setStatusC1(Cname.data.lastName);
  };
  const getStatus = async () => {
    const status: any = await CandidateService.getStatusByCandidateuserId(
      userId
    );
    setStatusCode(status.data.statusCode);
  };

  useEffect(() => {
    getfileName();
    getName();
    getEmail();
    getStatus();
  }, []);
  useEffect(() => {
    getStatus();
  }, [Offer]);
  const offer = async () => {
    const file = await DocumentService.getDocument(fileview, userId);
    setfileData(file.config.url);
  };
  useEffect(() => {
    if (fileview) {
      offer();
    }
  }, [a]);
  const getfileName = async () => {
    const { data } = await DocumentService.getfileName(userId);
    setFileview(data.fileName);
    setDocumentId(data.d_id);
    setA(true);
  };
  const canEmail = offerData?.email;
  const getFileNameOfOfferLetter = async () => {
    const emailData = {
      sendTo: canEmail,
      temp: "./offerRelease",
      data: {},
      subject: "Your offer letter",
      fileName: fileview,
      userId: userId,
    };
    await CandidateService.getFileNameOfOfferLetter(userId, emailData);
  };

  const notification = async (emailTo: any, description: any) => {
    await UserService.postNotification(
      candidateEmail,
      emailTo,
      description,
      userId
    );
  };
  const candidateStatus = async (statusCode: any, description: any) => {
    const sentRemark = await DocumentService.updateDocStatus(documentId, {
      status: statusCode,
      remarks: remark,
    });

    const offer = await OfferService.getOfferForAssetToAdmin(userId);
    if (offer.data === "CareatorLaptop") {
      await OfferService.getAssetForAssetToAdmin(userId);
    }

    if (sentRemark.status === 200) {
      try {
        const sentStatus =
          await CandidateService.updateCandidateStatusCodeWithSendingMail(
            userId,
            statusCode,
            description,
            description,
            hrEmail,
            candidateEmail,
            emails,
            {
              higherAuthorityFullName: hrEmail,
              candFullName: statusC + " " + statusC1,
              remark: `Remark:- ${remark}`,
            }
          );

        if (sentStatus.status === 200) {
          await notification(
            recruiterEmail,
            `${description} remark "${remark}"`
          );
          await notification(amEmail, `${description} remark "${remark}"`);
          const notifi = await notification(
            leaderEmail,
            `${description} remark "${remark}"`
          );

          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          message.error("Something Went Worng");
        }
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (e) {
        console.log(e);
      }
    } else {
      message.error("Something Went Worng");
    }
  };
  const getEmail = async () => {
    const emails = await CandidateService.getEmailByuserId(userId);
    setCandidateEmail(emails.data.candidateEmail.email);
    setAmEmail(emails.data.amEmail);
    setleaderEmail(emails.data.leaderEmail);
    setHrEmail(emails.data.hrEmail);
    setRecuiterEmail(emails.data.recruiterEmail);
  };

  function changePage(offset: any) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const url = `${constants.BASE_URL}/offer/findOneCandidate/${userId}`;
    axios
      .get<offerTypes>(url)
      .then((list: any) => {
        setOfferData(list.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const onFinished = () => {
    setStatus(false);
    candidateStatus("CRO", description2);
    warning();
    setTimeout(() => {
      setconformVisible1(false);
    }, 1000);
  };
  return (
    <div>
      <div>
        <Modal
          title="Remark"
          visible={isModalVisible}
          className="passwordModal"
          onCancel={handleCancel}
          footer={[]}
        >
          <Form
            form={form}
            name="normal_login"
            layout="vertical"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinished}
          >
            <Form.Item
              label="Remark"
              name="remark"
              rules={[
                {
                  required: true,
                  message: "Please insert your Remark",
                },
              ]}
            >
              <Input
                placeholder="Enter Your Remark"
                onChange={(e) => setRemark(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Popconfirm
                  title="Are you sure to reject offer?"
                  visible={conformVisible1}
                  onConfirm={form.submit}
                  onCancel={() => setconformVisible1(false)}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      setconformVisible1(true);
                    }}
                  >
                    Submit
                  </Button>
                </Popconfirm>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Breadcrumb
        style={{ marginLeft: "3rem", marginBottom: "-2.1rem" }}
        className="breadcrumbs"
      >
        <Breadcrumb.Item className="breadcrumbs_items">
          <Link to={candidate_breadcrumbs[0].path}>
            {candidate_breadcrumbs[0].name}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{candidate_breadcrumbs[2].name}</Breadcrumb.Item>
      </Breadcrumb>

      <p>
        {(() => {
          switch (statusCode) {
            case "ORR":
              return (
                <div
                  style={{
                    padding: 24,
                    margin: 50,
                    minHeight: 450,
                    backgroundColor: "#FFFFFF",
                    color: "black",
                    fontSize: "50px",
                    textAlign: "center",
                  }}
                >
                  <Content className="workspace__content">
                    <Title>
                      {" "}
                      Hello {firstName} {lastName}
                    </Title>
                    <Title level={4}>
                      {" "}
                      Sorry you have been denied the offer by Careator
                    </Title>
                  </Content>
                </div>
              );
            case "CAO":
              return (
                <div
                  style={{
                    padding: 24,
                    margin: 50,
                    minHeight: 450,
                    backgroundColor: "#FFFFFF",
                    color: "black",
                    fontSize: "50px",
                    textAlign: "center",
                  }}
                >
                  <Content className="workspace__content">
                    <Title>
                      {" "}
                      Hello {firstName} {lastName}
                    </Title>
                    <Title level={4}> You Accepted Offer</Title>
                  </Content>
                </div>
              );
            case "CRO":
              return (
                <div
                  style={{
                    padding: 24,
                    margin: 50,
                    minHeight: 450,
                    backgroundColor: "#FFFFFF",
                    color: "black",
                    fontSize: "50px",
                    textAlign: "center",
                  }}
                >
                  <Content className="workspace__content">
                    <Title>
                      {" "}
                      Hello {firstName} {lastName}
                    </Title>
                    <Title level={4}> You Rejected Offer</Title>
                  </Content>
                </div>
              );
            case "OR":
              return (
                <div
                  style={{
                    padding: 24,
                    margin: 50,
                    minHeight: 450,
                    backgroundColor: "#FFFFFF",
                    color: "black",
                    fontSize: "50px",
                    textAlign: "center",
                  }}
                >
                  <Document
                    file={fileData}
                    onLoadSuccess={({ numPages }) => {
                      setNumPages(numPages);
                      setPageNumber(1);
                    }}
                  >
                    <Card
                      bodyStyle={{
                        borderBottomStyle: "solid",
                        marginLeft: 100,
                      }}
                    >
                      <Page pageNumber={pageNumber} />
                      <p style={{ fontSize: 10 }}>
                        Page {pageNumber || (numPages ? 1 : "--")} of{" "}
                        {numPages || "--"}
                      </p>
                    </Card>
                    <LeftCircleTwoTone
                      type="button"
                      disabled={pageNumber <= 1}
                      onClick={previousPage}
                      style={{
                        fontSize: "2rem",
                        marginRight: 5,
                      }}
                    />

                    <RightCircleTwoTone
                      type="button"
                      disabled={pageNumber >= numPages}
                      onClick={nextPage}
                      style={{ fontSize: "2rem" }}
                    />
                  </Document>
                  <></>
                  <br></br>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Popconfirm
                      title="Are you sure to accept offer?"
                      visible={conformVisible}
                      onConfirm={async () => {
                        setStatus(true);
                        await candidateStatus("CAO", description1);
                        success();

                        setTimeout(() => {
                          setconformVisible(false);
                        }, 1000);
                      }}
                      onCancel={() => setconformVisible(false)}
                    >
                      <Button
                        type="primary"
                        style={{
                          marginRight: "0.5rem",
                          borderRadius: ".25rem",
                        }}
                        onClick={() => {
                          setconformVisible(true);
                        }}
                      >
                        Accept Offer
                      </Button>
                    </Popconfirm>

                    <Button
                      type="primary"
                      style={{ borderRadius: ".25rem" }}
                      danger
                      onClick={() => {
                        setIsModalVisible(true);
                      }}
                    >
                      Reject Offer
                    </Button>
                  </div>
                  <div style={{ marginTop: "-1rem" }}>
                    <Button
                      type="primary"
                      style={{
                        marginLeft: "0.5rem",

                        borderRadius: ".25rem",
                        backgroundColor: "green",
                      }}
                      onClick={() => {
                        getFileNameOfOfferLetter();
                        message.success(
                          "offer letter  sent successfully to your registered mailId"
                        );
                      }}
                    >
                      Email
                    </Button>
                  </div>
                </div>
              );
            default:
              return (
                <div
                  style={{
                    padding: 24,
                    margin: 50,
                    minHeight: 450,
                    backgroundColor: "#FFFFFF",
                    color: "black",
                    fontSize: "50px",
                    textAlign: "center",
                  }}
                >
                  <Content className="workspace__content">
                    <Title>
                      {" "}
                      Hello {firstName} {lastName}
                    </Title>
                    <Title level={3}>Please upload your documents</Title>
                    <Title level={4}>Your offer is in progress</Title>
                  </Content>
                </div>
              );
          }
        })()}
      </p>
    </div>
  );
}

export default CandidateSubmenu2;

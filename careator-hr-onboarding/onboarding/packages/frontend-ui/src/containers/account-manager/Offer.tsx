import {
  message,
  Form,
  Input,
  Button,
  Checkbox,
  Col,
  Select,
  Row,
  DatePicker,
  Layout,
  Modal,
  Popconfirm,
  Breadcrumb,
  InputNumber,
} from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link, useLocation } from "react-router-dom";
import OfferService from "../../services/OfferService";
import CandidateService from "../../services/CandidateService";
import mailService from "../../services/mailService";
import { account_manager_breadcrumbs } from "../../components/Breadcrumb/allBreadCrumbs";
import { useEffect } from "react";
import moment from "moment";
import { constantsForFrontend, host } from "../../constants";
import UserService from "../../services/UserService";
import "../../styles/InitiateOffer.css";

type LayoutType = Parameters<typeof Form>[0]["layout"];

const Offer: React.FC = () => {
  const [formLayout] = useState<LayoutType>("vertical");
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const dateformat = "DD/MM/YYYY";
  const { Option } = Select;
  const history = useHistory();
  let candidateData: any = useLocation();
  const record1: string = candidateData.state.record;
  const userid: string = candidateData.state.record.userId;
  const candidateName: string = candidateData.state.record.name;
  const client: string = candidateData.state.record.clientName;
  const offerstatus: string = candidateData.state.record.status;
  const role: string = candidateData.state.role;
  const [disable, setDisable] = React.useState(false);
  const [managerEmail, setManagerEmail] = useState("");
  const [managerName, setManagerName] = useState("");
  const AMUserID: any = localStorage.getItem("userId");
  const [pfCheck, setPfCheck] = useState(true);
  const [insurenceCheck, setInsurenceCheck] = useState(true);
  const [background, setBackground] = useState(false);
  const userId = localStorage.getItem("userId");
  const [status, setStatus] = useState({ firstName: "", lastName: "" });
  const [laptop, setLaptop] = useState("");
  let statusC = status.firstName + " " + status.lastName;

  const getName = async () => {
    const Ename: any = await UserService.getNameByEUserId(userId);
    setStatus(Ename.data);
  };

  const notification1 = async (
    emailFrom: any,
    emailTo: any,
    description: any,
    userId: any
  ) => {
    await UserService.postNotification(emailFrom, emailTo, description, userId);
  };

  useEffect(() => {
    getName();
    GetManagerEmailID(userid);
    if (role === "leader") {
      leaderwork();
    }
  }, []);

  const leaderwork = async () => {
    if (role === "leader") {
      const getOfferData: any = await OfferService.getOfferByUserId(userid);
      console.log("data got leader", getOfferData);
      setLaptop(getOfferData.data.assetType);
      setPfCheck(getOfferData.data.pf);
      setInsurenceCheck(getOfferData.data.insurance);
      setBackground(getOfferData.data.bgv);
      disableForm();
      form.setFieldsValue({
        txtcandidateName: datainarray[0].name,
        txtClientName: datainarray[0].clientName,
        dateofjoin: moment(getOfferData.data.hireDate),
        txtLocation: getOfferData.data.location,
        ddlLaptop: getOfferData.data.assetType,
        txtDesignation: getOfferData.data.designation,
        txtRate: getOfferData.data.rate,
        txtCTC: getOfferData.data.ctc,
        SOWDate: moment(getOfferData.data.workStartDate),
        ddlModeOfEmplyment: getOfferData.data.modeOfEmp,
      });
    }
  };

  async function getAssetDetails() {
    const getAssetDetails = await OfferService.getAssetDetails(userid);
    Modal.info({
      title: "Laptop Configuration",
      content: (
        <div>
          <div className="initiate-offer__modal-info-item">
            <b>Processor Type :</b>
            <span>&nbsp;{getAssetDetails.data.processorType}`</span>
          </div>
          <div className="initiate-offer__modal-info-item">
            <b>Processor Generation :</b>
            <span>&nbsp;{getAssetDetails.data.model}</span>
          </div>
          <div className="initiate-offer__modal-info-item">
            <b>RAM :</b>
            <span>&nbsp;{getAssetDetails.data.ram}</span>
          </div>
          <div className="initiate-offer__modal-info-item">
            <b>Storage Type :</b>
            <span>&nbsp;{getAssetDetails.data.storageType}</span>
          </div>
          <div className="initiate-offer__modal-info-item">
            <b>Storage :</b>
            <span>&nbsp;{getAssetDetails.data.storageSpace}</span>
          </div>
        </div>
      ),
      onOk() {},
    });
  }

  const disableForm = () => {
    setDisable(true);
  };

  const datainarray: any[] = [];
  const convertobjtoarray = () => {
    datainarray.push(record1);
  };

  const SendOffer = async (statusCode: string) => {
    let dataForOfferIntiation = {
      sendTo: managerEmail,
      temp: "OfferRequestInitiated",
      data: {
        name: managerName,
        status: "Initiated",
        link: `http://${host}/leader/manage-candidates`,
      },
      subject: "Offer Request Initiated by Account Manager",
    };

    const leaderId = localStorage.getItem("userId");
    const AmEmail = localStorage.getItem("userEmail");
    const dataSent: any =
      await CandidateService.updateCandidateStatusCodeWithSendingMailAndLeader(
        userid,
        statusCode,
        `${statusC} initiated the offer request to ${candidateName}`,
        `${statusC} initiated the offer request`,
        managerEmail,
        AmEmail,
        leaderId
      );

    if (dataSent.status === 200) {
      message.loading("Loading");
      const mail = await mailService.sendMail(dataForOfferIntiation);
      const notifi = await notification1(
        AmEmail,
        managerEmail,
        `${statusC} initiated the offer request to ${candidateName}`,
        leaderId
      );
      message.success("Success");
      if (mail.status === 201) {
        history.push("/account-manager/manage-candidates");
      } else {
        message.error("Something went wrong");
      }
    } else {
      message.error("Something went wrong");
    }
  };
  const GetManagerEmailID = async (userId: any) => {
    const { data } = await OfferService.getManagerEmailID(AMUserID);
    setManagerEmail(data[0].email);
    setManagerName(data[0].firstName + " " + data[0].lastName);
  };

  //converting object to array and setting field values of offer form
  convertobjtoarray();

  form.setFieldsValue({
    txtcandidateName: datainarray[0].name,
    txtClientName: datainarray[0].clientName,
  });

  const formItemLayout =
    formLayout === "vertical"
      ? {
          labelCol: { span: 16 },
          wrapperCol: { span: 24 },
        }
      : null;

  const onFinish = async (values: any) => {
    let bgvCheckBox = document.querySelectorAll(
      '[id^="bgv1"]'
    ) as NodeListOf<HTMLInputElement>;
    let pfCheckBox = document.querySelectorAll(
      '[id^="pf"]'
    ) as NodeListOf<HTMLInputElement>;
    let insCheckBox = document.querySelectorAll(
      '[id^="ins"]'
    ) as NodeListOf<HTMLInputElement>;
    const {
      dateofjoin,
      ddlLaptop,
      ddlModeOfEmplyment,
      txtCTC,
      txtDesignation,
      txtLocation,
      txtRate,
      SOWDate,
      txtcandidateName,
    } = values;

    const data = {
      hireDate: dateofjoin,
      workStartDate: SOWDate,
      assetType: ddlLaptop,
      ctc: txtCTC,
      designation: txtDesignation,
      location: txtLocation,
      rate: txtRate,
      modeOfEmp: ddlModeOfEmplyment,
      bgv: bgvCheckBox[0].checked,
      pf: pfCheckBox[0].checked,
      insurance: insCheckBox[0].checked,
      userId: userid,
      candidateName: txtcandidateName,
      client: client,
      offerStatus: offerstatus,
      txtClientName: client,
    };

    const offerData = await OfferService.createOffer(data);
    if (offerData.status === 201) {
      message.success("Offer Created successfully");
      SendOffer("ORI");
    } else {
      message.error("Something went wrong");
    }
    //redirection
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  //modal for asset form
  const modalPop = (lap: string) => {
    if (lap === "CareatorLaptop") {
      setVisible(true);
    } else setVisible(false);
  };

  const OnModeChange = (mode: string) => {
    if (mode === "Permenant") {
      let bgvinspfdiv = document.querySelectorAll(
        '[id^="bgvinspfdiv"]'
      ) as NodeListOf<HTMLInputElement>;
      bgvinspfdiv[0].hidden = false;
      let pfCheckBox = document.querySelectorAll(
        '[id^="pf"]'
      ) as NodeListOf<HTMLInputElement>;
      let insCheckBox = document.querySelectorAll(
        '[id^="ins"]'
      ) as NodeListOf<HTMLInputElement>;

      pfCheckBox[0].checked = true;
      insCheckBox[0].checked = true;
    } else {
      let bgvinspfdiv = document.querySelectorAll(
        '[id^="bgvinspfdiv"]'
      ) as NodeListOf<HTMLInputElement>;
      bgvinspfdiv[0].hidden = true;

      let pfCheckBox = document.querySelectorAll(
        '[id^="pf"]'
      ) as NodeListOf<HTMLInputElement>;
      let insCheckBox = document.querySelectorAll(
        '[id^="ins"]'
      ) as NodeListOf<HTMLInputElement>;

      pfCheckBox[0].checked = false;
      insCheckBox[0].checked = false;
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const Demo = async (values: any) => {
    const { txtProType, txtPro, txtRAM, txtStorType, txtStor } = values;
    const data1 = {
      processorType: txtProType,
      model: txtPro,
      ram: txtRAM,
      storageType: txtStorType,
      storageSpace: txtStor,
      userId: userid,
    };
    await OfferService.createAsset(data1);
    message.success(
      "Laptop with respective configuration allocated successfully"
    );
    setVisible(false);
  };

  const leaderId = localStorage.getItem("userId");
  const leaderEmail: any = localStorage.getItem("userEmail");
  const notification = async (emailTo: any, description: any) => {
    await UserService.postNotification(
      leaderEmail,
      emailTo,
      description,
      leaderId
    );
  };

  const changeCandidateStatusApprove = async (statusCode: string) => {
    const allEmails = await CandidateService.getEmailByuserId(userid);
    let dataForApprove = {
      sendTo: allEmails.data.hrEmail,
      temp: "LeaderOffer",
      // data: {},
      subject: "Leader has Approved Candidate Offer",
      data: {
        name: statusC,
        candidateEmail: allEmails.data.candidateEmail.email,
        status: "approved",
        link: `http://${host}/hr/manage-candidates`,
      },
    };

    const dataSent: any =
      await CandidateService.updateCandidateStatusCodeWithSendingMailAndLeader(
        userid,
        statusCode,
        `${statusC} approved the offer request of ${candidateName}   `,
        `${statusC} approved the offer request `,
        allEmails.data.hrEmail,
        leaderEmail,
        leaderId
      );

    if (dataSent.status === 200) {
      message.loading("Loading");
      const mail = await mailService.sendMail(dataForApprove);
      const notifi = await notification1(
        leaderEmail,
        allEmails.data.hrEmail,
        `${statusC} approved the offer request to ${candidateName}`,
        leaderId
      );
      message.success("Success");
      if (mail.status === 201) {
        history.push("/leader/manage-candidates");
      } else {
        message.error("Something went wrong");
      }
    } else {
      message.error("Something went wrong");
    }
  };

  const changeCandidateStatusReject = async (statusCode: string) => {
    const allEmails = await CandidateService.getEmailByuserId(userid);

    let dataForReject = {
      sendTo: allEmails.data.amEmail,
      temp: "LeaderOffer",
      cc: `${allEmails.data.hrEmail},${allEmails.data.recruiterEmail}`,
      subject: "Leader has Rejected Candidate Offer",
      data: {
        name: statusC,
        candidateEmail: allEmails.data.candidateEmail.email,
        status: "Rejected",
        link: `http://${host}/account-manager/manage-candidates`,
      },
    };

    const leaderId = localStorage.getItem("userId");
    const leaderEmail = localStorage.getItem("userEmail");
    const dataSent: any =
      await CandidateService.updateCandidateStatusCodeWithSendingMailAndLeader(
        userid,
        statusCode,
        `${statusC} rejected the offer of ${candidateName}   `,
        `${statusC} rejected the offer `,
        `${allEmails.data.amEmail},${allEmails.data.hrEmail},${allEmails.data.recruiterEmail}`,
        leaderEmail,
        leaderId
      );
    await notification(
      allEmails.data.amEmail,
      `${statusC} rejected the offer of ${candidateName}`
    );
    await notification(
      allEmails.data.hrEmail,
      `${statusC} rejected the offer of ${candidateName}`
    );
    await notification(
      allEmails.data.recruiterEmail,
      `${statusC} rejected the offer of ${candidateName}`
    );

    if (dataSent.status === 200) {
      message.loading("Loading");
      const mail = await mailService.sendMailWithCC(dataForReject);
      message.success("Success");
      history.push("/leader/manage-candidates");
    } else {
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <Breadcrumb
        className="breadcrumbs"
        style={{ maxWidth: "92%", marginLeft: "1rem" }}
      >
        <Breadcrumb.Item className="breadcrumbs_items">
          <Link to={account_manager_breadcrumbs[0].path}>
            {account_manager_breadcrumbs[0].name}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item className="breadcrumbs_items">
          <Link to={account_manager_breadcrumbs[2].path}>
            {account_manager_breadcrumbs[2].name}
          </Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item className="breadcrumbs_items">
          <Link to={account_manager_breadcrumbs[3].path}>
            {account_manager_breadcrumbs[3].name}
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Layout
        style={{ padding: "2rem", backgroundColor: "white", maxWidth: "100%" }}
      >
        <h3 style={{ marginBottom: "2rem" }}>Offer Request</h3>
        <Modal
          title="Laptop Configuration"
          visible={visible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            {...layout}
            name="nest-messages"
            onFinish={Demo}
            form={form1}
            id="myForm"
          >
            <Form.Item
              name="txtProType"
              label={<label style={{ fontWeight: 600 }}>Processor Type</label>}
              rules={[
                {
                  required: true,
                  message: "Please Enter Processor Type",
                },
              ]}
            >
              <Input placeholder="Enter Processor Type" className="formfiled" />
            </Form.Item>

            <Form.Item
              name="txtPro"
              label={
                <label style={{ fontWeight: 600 }}>Processor Generation</label>
              }
              rules={[
                {
                  required: true,
                  message: "Please Enter Processor Generation",
                },
              ]}
            >
              <Input
                placeholder="Enter Processor Generation"
                className="formfiled"
              />
            </Form.Item>

            <Form.Item
              name="txtRAM"
              label={<label style={{ fontWeight: 600 }}>RAM</label>}
              rules={[{ required: true, message: "Please Enter  RAM" }]}
            >
              <Input placeholder="Enter RAM" className="formfiled" />
            </Form.Item>

            <Form.Item
              name="txtStorType"
              label={<label style={{ fontWeight: 400 }}>Storage Type</label>}
              rules={[{ required: true, message: "Please Enter Storage Type" }]}
            >
              <Input placeholder="Enter Storage Type" className="formfiled" />
            </Form.Item>

            <Form.Item
              name="txtStor"
              label={<label style={{ fontWeight: 600 }}>Storage</label>}
              rules={[
                { required: true, message: "Please Enter Storage Space" },
              ]}
            >
              <Input placeholder="Enter Storage" className="formfiled" />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleCancel}
                style={{ marginLeft: "1rem" }}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Form
          {...formItemLayout}
          layout={formLayout}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row justify="space-between">
            <Col span={6} xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                className="formfiled"
                label={
                  <label style={{ fontWeight: 600 }}>Candidate Name</label>
                }
                name="txtcandidateName"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  style={{ width: "80%" }}
                  placeholder="Enter Candidate Name"
                  className="formfiled"
                  disabled={disable}
                />
              </Form.Item>
            </Col>

            <Col span={6} xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                className="formfiled"
                label={
                  <label style={{ fontWeight: 600 }}>Date Of Joining</label>
                }
                name="dateofjoin"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Date Of Joining",
                  },
                ]}
              >
                <DatePicker
                  className="formfiled"
                  format={dateformat}
                  style={{ width: "80%" }}
                  disabled={disable}
                />
              </Form.Item>
            </Col>

            <Col span={6} xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                className="formfiled"
                label={<label style={{ fontWeight: 600 }}>Location</label>}
                name="txtLocation"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Location",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Location"
                  className="formfiled"
                  style={{ width: "80%" }}
                  disabled={disable}
                />
              </Form.Item>
            </Col>

            <Col span={6} xs={24} sm={24} md={12} lg={8} xl={8}>
              {role === "leader" && laptop === "CareatorLaptop" ? (
                <Form.Item
                  name="ddlLaptop"
                  label={<label style={{ fontWeight: 600 }}>Laptop</label>}
                  rules={[
                    { required: true, message: "Please Enter Asset Type" },
                  ]}
                  className="formfiled"
                >
                  <Select
                    style={{ width: "60%", textAlign: "left" }}
                    placeholder="Careator Laptop"
                    onSelect={(value: string, event) =>
                      modalPop(value.toString())
                    }
                    disabled={disable}
                  ></Select>
                  <a
                    onClick={getAssetDetails}
                    className="initiate-offer__view-config"
                  >
                    &nbsp;view config
                  </a>
                </Form.Item>
              ) : (
                <Form.Item
                  name="ddlLaptop"
                  label={<label style={{ fontWeight: 600 }}>Laptop</label>}
                  rules={[
                    { required: true, message: "Please Enter Asset Type" },
                  ]}
                  className="formfiled"
                >
                  <Select
                    style={{ width: "80%", textAlign: "left" }}
                    placeholder="Select Asset Type "
                    onSelect={(value: string, event) =>
                      modalPop(value.toString())
                    }
                    disabled={disable}
                  >
                    <Option value="ClientLaptop">Client Laptop</Option>
                    <Option value="SelfLaptop">Self Laptop</Option>
                    <Option value="CareatorLaptop">Careator Laptop</Option>
                  </Select>
                </Form.Item>
              )}
            </Col>

            <Col span={6} xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                className="formfiled"
                name="txtDesignation"
                rules={[
                  { required: true, message: "Please Enter Designation" },
                ]}
                label={<label style={{ fontWeight: 600 }}>Designation</label>}
              >
                <Input
                  placeholder=" Please Enter Designation"
                  style={{ width: "80%" }}
                  className="formfiled"
                  disabled={disable}
                />
              </Form.Item>
            </Col>

            <Col span={6} xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                className="formfiled"
                name="txtRate"
                label={<label style={{ fontWeight: 600 }}>Rate</label>}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Rate",
                  },
                ]}
              >
                <Input
                  type="number"
                  className="formfiled"
                  placeholder="Enter Rate"
                  style={{ width: "80%" }}
                  disabled={disable}
                  // defaultValue="0"
                  step="0"
                />
              </Form.Item>
            </Col>

            <Col span={6} xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                className="formfiled"
                name="txtCTC"
                label={
                  <label style={{ fontWeight: 600 }}>Cost To Company</label>
                }
                rules={[
                  {
                    required: true,
                    message: "Please Enter CTC",
                  },
                ]}
              >
                <Input
                  type="number"
                  className="formfiled"
                  placeholder="Enter CTC"
                  style={{ width: "80%" }}
                  disabled={disable}
                  // defaultValue="0"
                  step="0"
                />
              </Form.Item>
            </Col>

            <Col span={6} xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                className="formfiled"
                label={<label style={{ fontWeight: 600 }}>SOW Date</label>}
                name="SOWDate"
                rules={[
                  {
                    required: true,
                    message: "Please Enter startofwork Date",
                  },
                ]}
              >
                <DatePicker
                  className="formfiled"
                  format={dateformat}
                  style={{ width: "80%" }}
                  disabled={disable}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                className="formfiled"
                label={<label style={{ fontWeight: 600 }}>Client Name</label>}
                name="txtClientName"
              >
                <Input
                  className="formfiled"
                  style={{ width: "80%", textAlign: "left" }}
                  disabled={disable}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                name="ddlModeOfEmplyment"
                label={
                  <label style={{ fontWeight: 600 }}>Employment Mode</label>
                }
                rules={[
                  {
                    required: true,
                    message: "Please Enter Mode Of Employment",
                  },
                ]}
                className="formfiled"
              >
                <Select
                  style={{ width: "80%", textAlign: "left" }}
                  placeholder="Select "
                  onSelect={(value: string, event) =>
                    OnModeChange(value.toString())
                  }
                  disabled={disable}
                >
                  <Option value="Permenant">Employee</Option>
                  <Option value="Contract">Consultant</Option>
                </Select>
              </Form.Item>
            </Col>
            <div style={{ width: "25%" }} id="bgvinspfdiv">
              <Col span={6} xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  name="pfForm"
                  style={{ alignItems: "flex-start", width: "100px" }}
                >
                  <Checkbox
                    id="pf"
                    onChange={(e) => setPfCheck(e.target.checked)}
                    style={{ width: "80%" }}
                    disabled={disable}
                    checked={pfCheck}
                  >
                    PF
                  </Checkbox>
                </Form.Item>
                <Form.Item name="insForm" style={{ width: "100px" }}>
                  <Checkbox
                    id="ins"
                    onChange={(e) => setInsurenceCheck(e.target.checked)}
                    disabled={disable}
                    checked={insurenceCheck}
                  >
                    Insurance
                  </Checkbox>
                </Form.Item>
              </Col>
            </div>

            <Col span={6} xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                name="bgvForm"
                style={{
                  alignItems: "flex-start",
                  marginTop: "1rem",
                  marginLeft: "2rem",
                }}
              >
                <Checkbox
                  id="bgv1"
                  onChange={(e) => setBackground(e.target.checked)}
                  disabled={disable}
                  checked={background}
                >
                  Background Verification
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row></Row>

          <Form.Item>
            {role !== "leader" ? (
              <Popconfirm
                title="Are you sure you want to Initiate Offer?"
                // onConfirm={{form:"myForm",htmlType:"submit"}}
                onConfirm={form.submit}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ float: "left", borderRadius: ".25rem" }}
                >
                  Initiate Offer Request
                </Button>
              </Popconfirm>
            ) : (
              <>
                <Popconfirm
                  title="Are you sure you want to reject?"
                  onConfirm={() => {
                    changeCandidateStatusReject("ORR");
                  }}
                >
                  <Button
                    type="primary"
                    style={{ float: "left", marginRight: "10px" }}
                    danger
                  >
                    Reject
                  </Button>
                </Popconfirm>
                <Popconfirm
                  title="Are you sure you want to approve?"
                  onConfirm={() => {
                    changeCandidateStatusApprove("ORA");
                  }}
                >
                  <Button type="primary" style={{ float: "left" }}>
                    Approve
                  </Button>
                </Popconfirm>
              </>
            )}
          </Form.Item>
        </Form>
      </Layout>
    </>
  );
};

export default Offer;

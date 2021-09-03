import {
  Form,
  Input,
  Button,
  Checkbox,
  Col,
  Row,
  DatePicker,
  Layout,
  Breadcrumb,
  notification,
  Select,
} from "antd";
import React, { useState } from "react";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import OfferService from "../../services/OfferService";
import { account_manager_breadcrumbs } from "../../components/Breadcrumb/allBreadCrumbs";
import { useEffect } from "react";
import styles from "../../styles/style";

type LayoutType = Parameters<typeof Form>[0]["layout"];

const Renegotiate: React.FC = () => {
  const [formLayout] = useState<LayoutType>("vertical");
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const dateFormat = "DD/MM/YYYY";
  const { Option } = Select;
  const [pf, setPf] = useState(true);
  const [insurance, setInsurance] = useState(true);
  console.log(data);
  let candidateData: any = useLocation();
  const record1: string = candidateData.state.record;
  const userid: string = candidateData.state.record.userId;
  const uid: string = candidateData.state.record.userId;
  const client: string = candidateData.state.record.clientName;
  const offerstatus: string = candidateData.state.record.status;
  const [disable, setDisable] = React.useState(false);

  console.log(setDisable);
  const datainarray: any[] = [];
  const convertobjtoarray = () => {
    datainarray.push(record1);
  };

  const red = () => {
    window.location.href = `/offer/${userid}`;
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
    let pfCheckBox = document.querySelectorAll(
      '[id^="pf"]'
    ) as NodeListOf<HTMLInputElement>;
    let insCheckBox = document.querySelectorAll(
      '[id^="ins"]'
    ) as NodeListOf<HTMLInputElement>;
    const {
      dateofjoin,
      ddlModeOfEmplyment,
      txtCTC,
      txtDesignation,
      txtLocation,
      txtRate,
      SOWDate,
    } = values;

    const data = {
      hireDate: dateofjoin,
      workStartDate: SOWDate,
      ctc: txtCTC,
      designation: txtDesignation,
      location: txtLocation,
      rate: txtRate,
      modeOfEmp: ddlModeOfEmplyment,
      pf: pfCheckBox[0].checked,
      insurance: insCheckBox[0].checked,
      userId: userid,
      offerStatus: offerstatus,
      txtClientName: client,
    };
    console.log(data);

    localStorage.setItem("renegotiation", "1");
    updateOfferDate(values);
    updateNotification("topRight");

    red(); //redirection
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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

  const getData = async () => {
    const { data } = await OfferService.getOfferByUserId(uid);
    setData(data);
    if (data.modeOfEmp === "Contract") {
      let bgvinspfdiv = document.querySelectorAll(
        '[id^="bgvinspfdiv"]'
      ) as NodeListOf<HTMLInputElement>;
      bgvinspfdiv[0].hidden = true;
    }
    form.setFieldsValue({
      txtLocation: data.location,
      txtDesignation: data.designation,
      txtRate: data.rate,
      txtCTC: data.ctc,
      ddlModeOfEmplyment: data.modeOfEmp,
      pf: data.pf,
      insurance: data.insurance,
      dateofjoin: moment(data.hireDate),
      SOWDate: moment(data.workStartDate),
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const updateOfferDate = async (values: any) => {
    let datas = {
      hireDate: values.dateofjoin,
      workStartDate: values.SOWDate,
      designation: values.txtDesignation,
      rate: values.txtRate,
      ctc: values.txtCTC,
      modeOfEmp: values.ddlModeOfEmplyment,
      pf: pf,
      insurance: insurance,
      // insurance: values.insCheckBox[0].checked,
    };
    const data = await OfferService.updateOfferByUserId(datas, userid);
    console.log(data);
  };
  //for updating offer data ends here

  const updateNotification = (placement: any) => {
    notification.info({
      message: `Notification `,
      description: "Update has been done!",
    });
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
          {account_manager_breadcrumbs[4].name2}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Layout
        style={{ padding: "2rem", backgroundColor: "white", maxWidth: "100%" }}
      >
        <h3 style={{ marginBottom: "2rem" }}>Renegotiate Offer1</h3>

        <Form
          {...formItemLayout}
          layout={formLayout}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row>
            <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={6}>
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
                  readOnly
                  style={{ width: "80%" }}
                  placeholder="Enter Candidate Name"
                  className="formfiled"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={6}>
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
                  format={dateFormat}
                  style={{ width: "80%" }}
                  // format="DD/MM/YYYY"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={6}>
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
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={6}>
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
                  className="formfiled"
                  placeholder="Enter Rate"
                  style={{ width: "80%" }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={6}>
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
                  className="formfiled"
                  placeholder="Enter CTC"
                  style={{ width: "80%" }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={6}>
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
                  format={dateFormat}
                  style={{ width: "80%" }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={6}>
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

            <div
              style={{
                display: "flex",
                marginTop: "1.5rem",
                marginLeft: "1rem",
              }}
              id="bgvinspfdiv"
            >
              <Col
                span={6}
                xs={24}
                sm={12}
                md={12}
                lg={8}
                xl={6}
                xxl={6}
                style={{ width: "80%" }}
              >
                <Form.Item name="pfForm">
                  <Checkbox
                    id="pf"
                    name="pf"
                    onChange={(e) => setPf(e.target.checked)}
                    disabled={disable}
                    checked={pf}
                  >
                    PF
                  </Checkbox>
                </Form.Item>
              </Col>

              <Col
                span={6}
                xs={24}
                sm={12}
                md={12}
                lg={8}
                xl={6}
                xxl={6}
                style={{ marginLeft: "3rem" }}
              >
                <Form.Item name="insForm">
                  <Checkbox
                    id="ins"
                    onChange={(e) => setInsurance(e.target.checked)}
                    disabled={disable}
                    checked={insurance}
                  >
                    Insurance
                  </Checkbox>
                </Form.Item>
              </Col>
            </div>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={styles.borderRadius}
            >
              Generate Offer
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </>
  );
};

export default Renegotiate;

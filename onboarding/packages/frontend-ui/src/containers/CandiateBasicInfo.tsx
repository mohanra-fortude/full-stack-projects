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
  Card,
} from "antd";
import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import { AppType } from "../types";
import "../styles/Form.css";
import { constants } from "../constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import CandidateService from "../services/CandidateService";
import { bindActionCreators } from "redux";
import GetActions from "../store/actions/GetAction";
import moment from "moment";
import StorageServices from "../services/StorageService";
import { useHistory } from "react-router-dom";

const { Title } = Typography;
type LayoutType = Parameters<typeof Form>[0]["layout"];
type Props = {
  candidateStateAsProps: boolean | undefined;
};

const CandidateBasicInfo: React.FC<Props> = ({ candidateStateAsProps }) => {
  const [formLayout] = useState<LayoutType>("vertical");
  const [form] = Form.useForm();
  const userId = localStorage.getItem("userId");
  const [AddressData, setAddressData] = useState([]);
  const [CandidateInfo, setCandidateInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [addressPermanentId, setAddressPermanentId] = useState(0);
  const [addressPresentId, setAddressPresentId] = useState(0);
  const { Option } = Select;
  const recruiterId = useSelector<AppType>((store) => store.getapi);
  const dispatch = useDispatch();
  const getapi = bindActionCreators(GetActions.doGet, dispatch);
  const getapi1 = bindActionCreators(GetActions.dontGet, dispatch);
  const [termAndCondition, settermAndCondition] = useState(true);
  const dateFormat = "DD/MM/YYYY";
  const history = useHistory();


  const datainarray: any[] = [];
  const formItemLayout =
    formLayout === "vertical"
      ? {
          labelCol: { span: 16 },
          wrapperCol: { span: 24 },
        }
      : null;
  const infourl = `${constants.BASE_URL}/candidate/findCandidate/${userId}`;
  const candidateInfo = () => {
    return StorageServices.getData("token")
      .then((token) =>
        axios.get(infourl, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
      .then((response) => {
        setCandidateInfo(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const candidateAddress = () => {
    const url = `${constants.BASE_URL}/address/addressByUserId/${userId}`;
    return StorageServices.getData("token")
      .then((token) =>
        axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
      .then((response) => {
        setAddressData(response.data);
        if (response.data) {
          if (response.data[0].addressType === "permanent") {
            setAddressPermanentId(response.data[0].id);
            setAddressPresentId(response.data[1].id);
          } else {
            setAddressPermanentId(response.data[1].id);
            setAddressPresentId(response.data[0].id);
          }
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  useEffect(() => {
    candidateInfo();
    candidateAddress();
  }, []);

  AddressData.forEach((val: any) => {
    if (val.addressType === "present") {
      form.setFieldsValue({
        presentLine1: val.address,
        presentLine2: val.address2,
        presentLine3: val.address3,
        presentCity: val.city,
        presentState: val.state,
        presentPincode: val.zip,
      });
    } else {
      form.setFieldsValue({
        permanentLine1: val.address,
        permanentLine2: val.address2,
        permanentLine3: val.address3,
        permanentCity: val.city,
        permanentState: val.state,
        permanentPincode: val.zip,
      });
    }
  });

  const convertobjtoarray = () => {
    datainarray.push(CandidateInfo);
  };
  convertobjtoarray();

  datainarray.forEach((val: any) => {
    if (val.dateBirth) {
      form.setFieldsValue({
        firstName: val.firstName,
        lastName: val.lastName,
        gender: val.gender,
        dateofbirth: moment(val.dateBirth),
        mobile: val.mobile,
        email: val.email,
        parentsFirstName: val.parentFirstName,
        parentsLastName: val.parentLastName,
        aadharCard: val.aadhaarCard,
        panCard: val.panCard,
        emergencyPhone: val.emergencyPhone,
        emergencyContactName: val.emergencyContactName,
        emergencyemail: val.emergencyEmail,
        homePhone: val.homePhone,
        bloodGroup: val.bloodGroup,
        allergies: val.allergies,
        passport: val.passport,
      });
    } else {
      form.setFieldsValue({
        firstName: val.firstName,
        lastName: val.lastName,
        gender: val.gender,
        mobile: val.mobile,
        email: val.email,
        parentsFirstName: val.parentFirstName,
        parentsLastName: val.parentLastName,
        aadharCard: val.aadhaarCard,
        panCard: val.panCard,
        emergencyPhone: val.emergencyPhone,
        emergencyContactName: val.emergencyContactName,
        emergencyemail: val.emergencyEmail,
        homePhone: val.homePhone,
        bloodGroup: val.bloodGroup,
        allergies: val.allergies,
        passport: val.passport,
      });
    }
  });

  const onFinish = async (values: any) => {
    if (termAndCondition === true) {
      try {
        const callUpdateCandidateInfoAPI = async () => {
          await CandidateService.updateCandidateInfo(
            values.firstName,
            values.lastName,
            values.parentsFirstName,
            values.parentsLastName,
            values.aadharCard,
            values.emergencyPhone,
            values.emergencyContactName,
            values.emergencyemail,
            values.gender,
            values.panCard,
            values.dateofbirth,
            values.passport,
            values.homePhone,
            values.bloodGroup,
            values.allergies,
            userId
          );
        };

        const callAddressPermanentInfoAPI = async () => {
          await CandidateService.updateAddressInfo(
            addressPermanentId,
            "permanent",
            values.permanentLine1,
            values.permanentLine2,
            values.permanentLine3,
            values.permanentCity,
            values.permanentState,
            values.permanentPincode,
            userId
          );
        };

        const callAddressPresentInfoAPI = async () => {
          await CandidateService.updateAddressInfo(
            addressPresentId,
            "present",
            values.presentLine1,
            values.presentLine2,
            values.presentLine3,
            values.presentCity,
            values.presentState,
            values.presentPincode,
            userId
          );
        };

        callUpdateCandidateInfoAPI();
        callAddressPermanentInfoAPI();
        callAddressPresentInfoAPI();
        getapi();
        setTimeout(() => {
          getapi1();
        }, 500);
        message.success("Candidate Info Update successfully");
        window.localStorage.setItem("TabKey", "2");
        history.push("/candidate/workspace");
        history.push("/candidate/manage-documents");

      } catch (err) {
        console.log("error", err);
      }
    } else {
      message.warning("Please agree the terms and conditions.");
    }
  };
  console.log("rerendered");
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const addressCheckbox = (addressvalue: any) => {
    if (addressvalue.target.checked) {
      form.setFieldsValue({
        presentLine1: form.getFieldValue("permanentLine1"),
        presentLine2: form.getFieldValue("permanentLine2"),
        presentLine3: form.getFieldValue("permanentLine3"),
        presentCity: form.getFieldValue("permanentCity"),
        presentState: form.getFieldValue("permanentState"),
        presentPincode: form.getFieldValue("permanentPincode"),
      });
    } else {
      form.setFieldsValue({
        presentLine1: "",
        presentLine2: "",
        presentLine3: "",
        presentCity: "",
        presentState: "",
        presentPincode: "",
      });
    }
  };
  return (
    <div>
      <Layout>
        <Card title="" bordered={true} style={{ width: "100%", margin: 10 }}>
          <Title level={3} className="heading">
            BASIC INFORMATION
          </Title>
          <Form
            {...formItemLayout}
            layout={formLayout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
          >
            <Row>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={<label style={{ fontWeight: 600 }}>First Name</label>}
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter First Name",
                    },

                    {
                      pattern: /^[A-Za-z ]+$/,
                      message: "Only Alphabets are allowed",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="text"
                    placeholder="Enter First Name"
                    style={{ width: "80%", textAlign: "left" }}
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={<label style={{ fontWeight: 600 }}>Last Name</label>}
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Last Name",
                    },
                    {
                      pattern: /^[A-Za-z ]+$/,
                      message: "Only Alphabets are allowed",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="text"
                    placeholder="Enter Last Name"
                    style={{ width: "80%", textAlign: "left" }}
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  name="gender"
                  label={<label style={{ fontWeight: 600 }}>Gender</label>}
                  rules={[{ required: true }]}
                  className="formfiled"
                  style={{ textAlign: "left" }}
                >
                  <Select
                    style={{ width: "80%", textAlign: "left" }}
                    placeholder="Select "
                    disabled={candidateStateAsProps}
                  >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={
                    <label style={{ fontWeight: 600 }}>Date of Birth</label>
                  }
                  name="dateofbirth"
                  rules={[
                    {
                      required: true,
                      message: "Enter Date Of Birth",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <DatePicker
                    style={{ width: "80%", textAlign: "left" }}
                    className="formfiled"
                    format={dateFormat}
                    disabled={candidateStateAsProps}
                    placeholder="Select Date Birth"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  name="mobile"
                  label={
                    <label style={{ fontWeight: 600 }}>Mobile Number</label>
                  }
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="number"
                    className="formfiled"
                    style={{ width: "80%", textAlign: "left" }}
                    disabled={candidateStateAsProps}
                    placeholder="Enter Mobile Number"
                    // readOnly
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  name="email"
                  label={<label style={{ fontWeight: 600 }}>Email Id</label>}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="email"
                    style={{ width: "80%", textAlign: "left" }}
                    disabled={candidateStateAsProps}
                    placeholder="Enter Email Id"
                    // readOnly
                    className="formfiled"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  name="homePhone"
                  label={<label style={{ fontWeight: 600 }}>Home Phone</label>}
                  dependencies={["mobile"]}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("mobile") !== value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Home Phone Number should be different")
                        );
                      },
                    }),
                    {
                      required: true,
                      message: "Please Enter Home Phone Number",
                    },
                    {
                      min: 10,
                      message: "Min 10 digits are allowed",
                    },
                    {
                      max: 12,
                      message: "Max 12 digits are allowed",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="number"
                    style={{ width: "80%", textAlign: "left" }}
                    className="formfiled"
                    placeholder="Enter Primary Home Phone Number"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  name="passport"
                  label={<label style={{ fontWeight: 600 }}>Passport</label>}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    style={{ width: "80%", textAlign: "left" }}
                    type="alphanumeric"
                    className="formfiled"
                    placeholder="Enter Primary Passport Number"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={
                    <label style={{ fontWeight: 600 }}>Aadhar Card No</label>
                  }
                  name="aadharCard"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Aadhar Card No",
                    },
                    {
                      max: 12,
                      message: "Max 12 digits are allowed",
                    },
                    {
                      min: 12,
                      message: "Max 12 digits are allowed",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="number"
                    style={{ width: "80%", textAlign: "left" }}
                    placeholder="Enter Aadhar Card No "
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={<label style={{ fontWeight: 600 }}>Pan Card No</label>}
                  name="panCard"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Pan Card No",
                    },
                    {
                      max: 10,
                      message:
                        "Max 10 character long alpha-numeric are allowed",
                    },
                    {
                      min: 10,
                      message:
                        "Min 10 character long alpha-numeric are allowed",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="alphanumeric"
                    style={{ width: "80%", textAlign: "left" }}
                    placeholder="Enter Pan Card No "
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={<label style={{ fontWeight: 600 }}>Blood Group</label>}
                  name="bloodGroup"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Blood Group",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="alphanumeric"
                    style={{ width: "80%", textAlign: "left" }}
                    placeholder="Enter Blood Group "
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={
                    <label style={{ fontWeight: 600 }}>
                      Allergies (if any)
                    </label>
                  }
                  name="allergies"
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="alphanumeric"
                    style={{ width: "80%", textAlign: "left" }}
                    placeholder="Enter Allergies (if any)"
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>

              <Title level={5} className="heading">
                PARENTS INFORMATION
              </Title>

              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={<label style={{ fontWeight: 600 }}>First Name</label>}
                  name="parentsFirstName"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter First Name",
                    },
                    {
                      pattern: /^[A-Za-z ]+$/,
                      message: "Only Alphabets are allowed",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="alphanumeric"
                    placeholder="Enter First Name"
                    style={{ width: "80%", textAlign: "left" }}
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={<label style={{ fontWeight: 600 }}>Last Name</label>}
                  name="parentsLastName"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Last Name",
                    },
                    {
                      pattern: /^[A-Za-z ]+$/,
                      message: "Only Alphabets are allowed",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="alphanumeric"
                    placeholder="Enter Last Name"
                    style={{ width: "80%", textAlign: "left" }}
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>

              <Title level={5} className="heading">
                PERMANENT ADDRESS
              </Title>

              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={
                    <label style={{ fontWeight: 600 }}>Address Line 1</label>
                  }
                  name="permanentLine1"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Address Line 1",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="alphanumeric"
                    placeholder="Enter Address Line 1"
                    style={{ width: "80%", textAlign: "left" }}
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={
                    <label style={{ fontWeight: 600 }}>Address Line 2</label>
                  }
                  name="permanentLine2"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Address Line 2",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="alphanumeric"
                    placeholder="Enter Address Line 2"
                    style={{ width: "80%", textAlign: "left" }}
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label="Address Line 3"
                  name="permanentLine3"
                  rules={[
                    {
                      message: "Please Enter Address Line 3",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="alphanumeric"
                    placeholder="Enter Address Line 3"
                    style={{ width: "80%", textAlign: "left" }}
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={<label style={{ fontWeight: 600 }}>City</label>}
                  name="permanentCity"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter City",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    style={{ width: "80%", textAlign: "left" }}
                    type="alphanumeric"
                    placeholder="Enter City"
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={<label style={{ fontWeight: 600 }}>State</label>}
                  name="permanentState"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter State",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="alphanumeric"
                    placeholder="Enter State"
                    style={{ width: "80%", textAlign: "left" }}
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={<label style={{ fontWeight: 600 }}>Pincode</label>}
                  name="permanentPincode"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Pincode",
                    },
                    {
                      min: 6,
                      message: "Min 6 digits are allowed",
                    },
                    {
                      max: 6,
                      message: "Max 6 digits are allowed",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="number"
                    placeholder="Enter Pincode"
                    style={{ width: "80%", textAlign: "left" }}
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>

              <Title level={5} className="heading">
                <label style={{ marginLeft: "7rem", fontSize: "1rem" }}>
                  PRESENT ADDRESS
                </label>
                <Checkbox
                  style={{ float: "right" }}
                  onChange={(value) => {
                    addressCheckbox(value);
                  }}
                  disabled={candidateStateAsProps}
                >
                  Same as above
                </Checkbox>
              </Title>

              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={
                    <label style={{ fontWeight: 600 }}>Address Line 1</label>
                  }
                  name="presentLine1"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Address Line 1",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="alphanumeric"
                    style={{ width: "80%", textAlign: "left" }}
                    placeholder="Enter Address Line 1 "
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={
                    <label style={{ fontWeight: 600 }}>Address Line 2</label>
                  }
                  name="presentLine2"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Address Line 2",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="alphanumeric"
                    style={{ width: "80%", textAlign: "left" }}
                    placeholder="Enter Address Line 2"
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={
                    <label style={{ fontWeight: 600 }}>Address Line 3</label>
                  }
                  name="presentLine3"
                  rules={[
                    {
                      message: "Please Enter Address Line 3",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="alphanumeric"
                    style={{ width: "80%", textAlign: "left" }}
                    placeholder="Enter Address Line 3"
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={<label style={{ fontWeight: 600 }}>City</label>}
                  name="presentCity"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter City",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="alphanumeric"
                    placeholder="Enter City"
                    style={{ width: "80%", textAlign: "left" }}
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={<label style={{ fontWeight: 600 }}>State</label>}
                  name="presentState"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter State",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="alphanumeric"
                    style={{ width: "80%", textAlign: "left" }}
                    placeholder="Enter State"
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={<label style={{ fontWeight: 600 }}>Pincode</label>}
                  name="presentPincode"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Pincode ",
                    },
                    {
                      min: 6,
                      message: "Min 6 digits are allowed",
                    },
                    {
                      max: 6,
                      message: "Max 6 digits are allowed",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="number"
                    style={{ width: "80%", textAlign: "left" }}
                    placeholder="Enter Pincode"
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>

              <Title level={5} className="heading">
                EMERGENCY DETAILS
              </Title>

              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={
                    <label style={{ fontWeight: 600 }}>
                      Emergency Contact Name
                    </label>
                  }
                  name="emergencyContactName"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter First Name",
                    },
                    {
                      pattern: /^[A-Za-z ]+$/,
                      message: "Only Alphabets are allowed",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="alphanumeric"
                    placeholder="Enter First Name"
                    style={{ width: "80%", textAlign: "left" }}
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={
                    <label style={{ fontWeight: 600 }}>
                      Emergency Contact No
                    </label>
                  }
                  name="emergencyPhone"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Emergency Contact No",
                    },
                    {
                      min: 10,
                      message: "Min 10 digits are allowed",
                    },
                    {
                      max: 12,
                      message: "Max 12 digits are allowed",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="number"
                    style={{ width: "80%", textAlign: "left" }}
                    placeholder="Enter Emergency Contact No "
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label={
                    <label style={{ fontWeight: 600 }}>Emergency Email</label>
                  }
                  name="emergencyemail"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Please Enter Emergency Email",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    type="email"
                    style={{ width: "80%", textAlign: "left" }}
                    placeholder="Enter Emergency Email"
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="remember">
              <Checkbox
                defaultChecked={termAndCondition}
                onChange={(value) => {
                  settermAndCondition(value.target.checked);
                }}
                disabled={candidateStateAsProps}
              >
                I hereby agree that the information provided above is correct
                and can be used for background verification.
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ float: "right", borderRadius: ".25rem" }}
                disabled={candidateStateAsProps}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Layout>
    </div>
  );
};

export default CandidateBasicInfo;

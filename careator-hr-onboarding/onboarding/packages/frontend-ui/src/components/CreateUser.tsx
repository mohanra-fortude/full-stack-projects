import {
  message,
  Form,
  Input,
  Select,
  Button,
  Space,
  Col,
  Row,
  Layout,
  Breadcrumb,
  Card,
} from "antd";
import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import { Typography } from "antd";
import { RoleType } from "../types";
import "../styles/Form.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "../components/Breadcrumb/BreadCrumb.css";
import { admin_breadcrumbs } from "../components/Breadcrumb/allBreadCrumbs";
import mailService from "../services/mailService";
import { host } from "../constants";
import {
  handleExistingEmail,
  handleExistingMobile,
  handleExistingPhone,
} from "../components/FormValidationFunctions";
import styles from "../styles/style";

const { Title } = Typography;
const { Option } = Select;
type LayoutType = Parameters<typeof Form>[0]["layout"];

type Props = {
  rolelist: RoleType[];
  click: (value: any) => void;
  reports: [];
};

const CreateUser: React.FC<Props> = ({ rolelist, click, reports }) => {
  const [formLayout] = useState<LayoutType>("vertical");
  const [report, changeReport] = useState([]);
  const [existMobile, setExistMobile] = useState("");
  const [existPhone, setExistPhone] = useState("");
  const [existEmail, setExistEmail] = useState("");

  const history = useHistory();

  const userId = localStorage.getItem("userId");
  const [status, setStatus] = useState({ firstName: "", lastName: "" });
  console.log(report);
  let statusC = status.firstName + " " + status.lastName;
  const formItemLayout =
    formLayout === "vertical"
      ? {
          labelCol: { span: 16 },
          wrapperCol: { span: 24 },
        }
      : null;

  const onFinish = async (values: any) => {
    const {
      fname,
      lname,
      mobphone,
      homenumber,
      manageId,
      email,
      designation,
      role,
    } = values;

    const data = {
      firstName: fname,
      lastName: lname,
      mobile: mobphone,
      email: email,
      roleId: role,
      managerId: manageId,
      designation: designation,
      homePhone: homenumber,
      status: statusC,
    };
    console.log(role);

    const roleBasedText = () => {
      let RetrunValue: string = "";
      if (role === 5) {
        RetrunValue =
          "We are excited to have you get started with your Recruitment process";
      } else if (role === 4) {
        RetrunValue =
          "We are excited to have you get started with your HR process";
      } else if (role === 2) {
        RetrunValue =
          "We are excited to have you get started with your management process. ";
      } else if (role === 3) {
        RetrunValue =
          "We are excited to have you get started with your Business Development process. ";
      } else RetrunValue = "";

      return RetrunValue;
    };
    await handleExistingEmail(existEmail);
    await handleExistingMobile(existMobile);
    await handleExistingPhone(existPhone);
    const userData = await UserService.createUser(data);
    if (userData.status === 201) {
      const text = roleBasedText();
      message.success("Employee created successfully");
      history.push("/admin/manage-employees");
      const mailData = {
        sendTo: email,
        temp: "UserCreated",
        data: {
          firstName: fname,
          lastName: lname,
          email: email,
          link: `http://${host}`,
          text: text,
        },
        subject: "User Created at Careator",
      };
      const sendMail = await mailService.sendMail(mailData);

      console.log(sendMail);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );
  const phoneHome = (
    <Form.Item name="phonehome" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );

  const getEmployee = async (value: any) => {
    const empdata: any = await UserService.getEmployee(value);
    changeReport(empdata.data);
  };
  console.log(getEmployee);

  const getName = async () => {
    const Ename: any = await UserService.getNameByEUserId(userId);
    setStatus(Ename.data);
  };
  useEffect(() => {
    getName();
    form.setFieldsValue({ prefix: "+91", phonehome: "+91" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout style={{ maxWidth: "92%", marginLeft: "2rem" }}>
      <Breadcrumb className="breadcrumbs" style={{ marginLeft: "1rem" }}>
        <Breadcrumb.Item className="breadcrumbs_items">
          <Link to={admin_breadcrumbs[0].path}>
            {admin_breadcrumbs[0].name}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item className="breadcrumbs_items">
          <Link to={admin_breadcrumbs[2].path}>
            {admin_breadcrumbs[2].name}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create Employee</Breadcrumb.Item>
      </Breadcrumb>
      <Card title="" bordered={true} style={{ width: "100%", margin: 10 }}>
        <Title level={2}>Create Employee</Title>

        <Form
          {...formItemLayout}
          layout={formLayout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                className="formfiled"
                label={<label style={{ fontWeight: 600 }}>First Name</label>}
                name="fname"
                rules={[
                  {
                    required: true,
                    message: "Please Enter First Name",
                  },
                  {
                    pattern: /^[A-Za-z ]+$/,
                    message: "Only alphabets are allowed",
                  },
                ]}
              >
                <Input placeholder="Enter First Name" className="formfiled" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                className="formfiled"
                label={<label style={{ fontWeight: 600 }}>Last Name</label>}
                name="lname"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Last Name",
                  },
                  {
                    pattern: /^[A-Za-z ]+$/,
                    message: "Only alphabets are allowed",
                  },
                ]}
              >
                <Input placeholder="Enter Last Name" className="formfiled" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                className="formfiled"
                label={<label style={{ fontWeight: 600 }}>Designation</label>}
                name="designation"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Designation",
                  },
                ]}
              >
                <Input placeholder="Enter Designation" className="formfiled" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                className="formfiled"
                name="email"
                label={<label style={{ fontWeight: 600 }}>Email Id</label>}
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please Enter Email Id",
                  },
                ]}
              >
                <Input
                  type="email"
                  placeholder="Enter Email Id"
                  className="formfiled"
                  onChange={(e) => {
                    setExistEmail(e.target.value);
                  }}
                  value={existEmail}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                className="formfiled"
                name="mobphone"
                label={<label style={{ fontWeight: 600 }}>Mobile Number</label>}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Mobile Number",
                  },
                  {
                    min: 10,
                    message: "Minimum 10 digits required",
                  },
                  {
                    max: 10,
                    message: "Maximum 10 digits required",
                  },
                ]}
              >
                <Input
                  type="number"
                  addonBefore={prefixSelector}
                  className="formfiled"
                  placeholder="Enter Mobile Number"
                  onChange={(e) => {
                    setExistMobile(e.target.value);
                  }}
                  value={existMobile}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                className="formfiled"
                name="homenumber"
                label={<label style={{ fontWeight: 600 }}>Phone Number</label>}
                dependencies={["mobphone"]}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("mobphone") !== value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Phone should be different")
                      );
                    },
                  }),
                  {
                    min: 10,
                    message: "Minimum 10 digits required",
                  },
                  {
                    max: 10,
                    message: "Maximum 10 digits required",
                  },
                ]}
              >
                <Input
                  type="number"
                  addonBefore={phoneHome}
                  className="formfiled"
                  placeholder="Enter Phone Number"
                  onChange={(e) => {
                    setExistPhone(e.target.value);
                  }}
                  value={existPhone}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                className="formfiled"
                label={<label style={{ fontWeight: 600 }}>Role</label>}
                name="role"
                rules={[
                  {
                    required: true,
                    message: "Please Select Role",
                  },
                ]}
              >
                <Select
                  placeholder="Select Role"
                  className="formfiled"
                  onSelect={(value) => {
                    click(value);
                  }}
                >
                  {rolelist.map((val) => (
                    <Select.Option value={val.id} key={val.id}>
                      {" "}
                      {val.description}{" "}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                className="formfiled"
                name="manageId"
                label={
                  <label style={{ fontWeight: 600 }}>Reporting Manager</label>
                }
                rules={[
                  {
                    message: "Please Select Reporting Manager",
                  },
                  { required: true },
                ]}
              >
                <Select
                  placeholder="Select Reporting Manager"
                  className="formfiled"
                >
                  {reports.map((val: any) => (
                    <Select.Option value={val.userId} key={val.id}>
                      {val.firstName + " " + val.lastName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space align="center">
              <Button
                htmlType="button"
                onClick={onReset}
                type="primary"
                danger
                style={styles.borderRadius}
              >
                Cancel
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                style={styles.borderRadius}
              >
                Save
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

export default CreateUser;

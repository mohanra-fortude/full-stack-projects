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
  Card,
  Breadcrumb,
} from "antd";
import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { Typography } from "antd";
import { useHistory } from "react-router";
import "../styles/Form.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import GetActions from "../store/actions/GetAction";
import styles from "../styles/style";
import mailService from "../services/mailService";
import { host } from "../constants";
import {
  handleExistingEmail,
  handleExistingMobile,
} from "../components/FormValidationFunctions";

const { Title } = Typography;
const { Option } = Select;
type LayoutType = Parameters<typeof Form>[0]["layout"];
type Props = {
  clientName: [];
};
const CreateCandidate: React.FC<Props> = ({ clientName }) => {
  const [formLayout] = useState<LayoutType>("vertical");
  const [form] = Form.useForm();
  const [fname, changefName] = useState("");
  const [lname, changelName] = useState("");
  const [email, changeEmail] = useState("");
  const [mobile, changeMobile] = useState("");
  const [jobId, setjobId] = useState([]);
  const [postJobId, setPostJobId] = useState(0);

  const history = useHistory();

  const recruiterId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const getapi = bindActionCreators(GetActions.doGet, dispatch);
  const getapi1 = bindActionCreators(GetActions.dontGet, dispatch);

  const [statusC, setStatus] = useState({ firstName: "", lastName: "" });

  let status = statusC.firstName + " " + statusC.lastName;
  const getName = async () => {
    const Ename: any = await UserService.getNameByEUserId(recruiterId);
    setStatus(Ename.data);
  };
  useEffect(() => {
    getName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusCode = "CC";
  const roleId = 6;
  const formItemLayout =
    formLayout === "vertical"
      ? {
          labelCol: { span: 16 },
          wrapperCol: { span: 24 },
        }
      : null;
  const sendEmail = async () => {
    let link: string = `http://${host}`;

    let emailToCandidate = {
      sendTo: email,
      temp: "CandidateCreated",
      data: {
        firstName: fname,
        link: `${link}`,
        lastName: lname,
        email: email,
      },
      subject: "Candidate Account Created",
    };
    const { data } = await mailService.sendMail(emailToCandidate);
  };

  const onFinish = async () => {
    try {
      await handleExistingEmail(email);
      await handleExistingMobile(mobile);
      const callCreateCandidateAPI = await UserService.createCandidate(
        fname,
        lname,
        mobile,
        email,
        postJobId,
        recruiterId,
        roleId,
        statusCode,
        status
      );
      if (callCreateCandidateAPI.status === 201) {
        getapi();
        message.success("Employee created successfully");
        history.push("/recruiter/manage-candidates");
        setTimeout(() => {
          getapi1();
        }, 500);
        sendEmail();
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  const onReset = () => {
    form.resetFields();
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select defaultValue="91" style={{ width: 70 }}>
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );

  const firstname = (e: any) => {
    changefName(e.target.value);
  };
  const lastname = (e: any) => {
    changelName(e.target.value);
  };

  const getJobId = async (cid: number) => {
    const { data } = await UserService.getJob(cid);
    setjobId(data);
  };
  return (
    <Layout style={{ maxWidth: "92%", marginLeft: "2.2rem" }}>
      <Breadcrumb
        style={{
          margin: "1rem 0 0.3rem 0.7rem",
        }}
      >
        <Breadcrumb.Item>
          <Link to="/recruiter/workspace">My Workspace</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {" "}
          <Link to="/recruiter/manage-candidates">Manage Candidates</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create</Breadcrumb.Item>
      </Breadcrumb>
      <Card title="" bordered={true} style={{ width: "100%", margin: 10 }}>
        <Title level={2}>Create Candidate</Title>

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
                name="clientName"
                label="Client"
                rules={[
                  {
                    required: true,
                    message: "Please Select Client",
                  },
                ]}
              >
                <Select
                  placeholder="Select Client"
                  className="formfiled"
                  onSelect={(value: number) => {
                    getJobId(value);
                  }}
                >
                  {clientName.map((val: any, id: any) => (
                    <Select.Option value={val.id} key={id}>
                      {val.clientName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                className="formfiled"
                name="JobId"
                label="Job"
                rules={[
                  {
                    required: true,
                    message: "Please Select Job",
                  },
                ]}
              >
                <Select
                  placeholder="Select Job"
                  className="formfiled"
                  onSelect={(value: number) => {
                    setPostJobId(value);
                  }}
                >
                  {jobId.map((val: any, id: any) => (
                    <Select.Option value={val.id} key={id} onChange={getJobId}>
                      {val.jobCode}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                className="formfiled"
                label="First Name"
                name="fname"
                rules={[
                  {
                    required: true,
                    message: "Please Enter First Name",
                  },
                ]}
              >
                <Input
                  placeholder="Enter First Name"
                  className="formfiled"
                  value={fname}
                  onChange={firstname}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                className="formfiled"
                label="Last Name"
                name="lname"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Last Name",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Last Name"
                  className="formfiled"
                  value={lname}
                  onChange={lastname}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                className="formfiled"
                name="email"
                label="Email ID"
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
                    changeEmail(e.target.value);
                  }}
                  value={email}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                className="formfiled"
                name="mobile"
                label="Mobile Number"
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
                    max: 12,
                    message: "Maximum 12 digits required",
                  },
                ]}
              >
                <Input
                  type="number"
                  addonBefore={prefixSelector}
                  className="formfiled"
                  placeholder="Enter Mobile Number"
                  onChange={(e) => {
                    changeMobile(e.target.value);
                  }}
                  value={mobile}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space align="center">
              <Link to="/recruiter/manage-candidates">
                <Button
                  htmlType="button"
                  onClick={onReset}
                  type="primary"
                  danger
                  style={styles.borderRadius}
                >
                  Exit
                </Button>
              </Link>
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

export default CreateCandidate;

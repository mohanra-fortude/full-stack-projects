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
import CandidateService from "../services/CandidateService";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import GetActions from "../store/actions/GetAction";
import {
  handleExistingEmail,
  handleExistingMobile,
  handleExistingPhone,
} from "../components/FormValidationFunctions";

const { Title } = Typography;
const { Option } = Select;
type LayoutType = Parameters<typeof Form>[0]["layout"];
type Props = {
  clientName: [];
  data: any;
};
const UpdateCandidate: React.FC<Props> = ({ clientName, data }) => {
  const [formLayout] = useState<LayoutType>("vertical");
  const [form] = Form.useForm();
  const [jobId, setjobId] = useState([]);
  const [id, setId] = useState([]);
  const [candiData, setCandiData] = useState([]);
  const [existEmail, setExistEmail] = useState("");
  const [existmobile, setExistMobile] = useState("");

  const userId = window.location.pathname.split("/")[3];
  const history = useHistory();
  const dispatch = useDispatch();
  const getapi = bindActionCreators(GetActions.doGet, dispatch);
  const getapi1 = bindActionCreators(GetActions.dontGet, dispatch);

  useEffect(() => {
    getCandidateDetails();
  }, []);

  const getCandidateDetails = async () => {
    const { data } = await CandidateService.getCandidateDetailsById(userId);
    setCandiData(data);
    data.map((val: any) =>
      form.setFieldsValue({
        fname1: val.firstName,
        lname1: val.lastName,
        mobile: val.mobile,
        email: val.email,
        postJobId: val.jobId,
        clientName: val.clientName,
      })
    );
  };

  const formItemLayout =
    formLayout === "vertical"
      ? {
          labelCol: { span: 16 },
          wrapperCol: { span: 24 },
        }
      : null;

  const onFinish = async (values: any) => {
    const { fname1, lname1, mobile, email, postJobId } = values;
    try {
      await handleExistingEmail(existEmail);
      await handleExistingMobile(existmobile);
      const callUpdateCandidateAPI = await UserService.patchCandidate(
        fname1,
        lname1,
        mobile,
        email,
        // id,
        userId
      );
      if (callUpdateCandidateAPI.status == 200) {
        getapi();
        history.push("/recruiter/manage-candidates");
        message.success("Candidate updated successfully");
        setTimeout(() => {
          getapi1();
        }, 500);
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  const onReset = () => {
    history.push("/recruiter/manage-candidates");
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const getJobId = async (cid: number) => {
    const { data } = await UserService.getJob(cid);
    setjobId(data);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select defaultValue="91" style={{ width: 70 }}>
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );

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
        <Breadcrumb.Item>Update</Breadcrumb.Item>
      </Breadcrumb>
      <Card title="" bordered={true} style={{ width: "100%", margin: 10 }}>
        <Title level={2}>Update Candidate</Title>

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
                label="Client Name"
                rules={[
                  {
                    required: true,
                    message: "Please Select Client Name",
                  },
                ]}
              >
                <Select
                  placeholder="Select Client Name"
                  className="formfiled"
                  onSelect={(value: any) => {
                    getJobId(value);
                  }}
                  disabled
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
                name="postJobId"
                label="JobId"
                rules={[
                  {
                    required: true,
                    message: "Please Select JobId",
                  },
                ]}
              >
                <Select
                  placeholder="Select JobId"
                  className="formfiled"
                  disabled
                >
                  {jobId.map((value: any, id: number) => (
                    <Select.Option value={value.id} key={id}>
                      {value.jobCode}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                className="formfiled"
                label="First Name"
                name="fname1"
                rules={[
                  {
                    required: true,
                    message: "Please Enter First Name",
                  },
                ]}
              >
                <Input placeholder="Enter First Name" className="formfiled" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                className="formfiled"
                label="Last Name"
                name="lname1"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Last Name",
                  },
                ]}
              >
                <Input placeholder="Enter Last Name" className="formfiled" />
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
                  onBlur={(e) => {
                    setExistEmail(e.currentTarget.value);
                  }}
                  value={existEmail}
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
                    setExistMobile(e.target.value);
                  }}
                  value={existmobile}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space align="center">
              <Button htmlType="button" onClick={onReset} type="primary" danger>
                Exit
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

export default UpdateCandidate;

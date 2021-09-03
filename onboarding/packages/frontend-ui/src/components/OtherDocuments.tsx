import React, { useState, useEffect } from "react";
import {
  message,
  Form,
  Input,
  Button,
  Space,
  Col,
  Row,
  Layout,
  Card,
  Typography,
  Upload,
  Table,
  Modal,
  Select,
  Tooltip,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import BasicIdService from "../services/BasicIdService";
import "../styles/Form.css";
import CandidateService from "../services/CandidateService";
import mailService from "../services/mailService";
import { useHistory } from "react-router-dom";
import UserService from "../services/UserService";
import styles from "../styles/style";
import { host } from "../constants";
const { Title } = Typography;
const { Option } = Select;
type LayoutType = Parameters<typeof Form>[0]["layout"];

type Props = {
  column: {}[];
  id: string;
  candidate: {}[];
  rerender: () => void;
  handlecancel: () => void;
  uploadvisibles: boolean;
  documentids: number;
  listdocument: [];
  candidateStateAsProps: boolean;
  testSend: boolean;
  reRender: () => void;
  sample: boolean;
  reRender1: () => void;
  getAadhaarPan: () => void;
  aadhaarflag: boolean;
  panflag: boolean;
};

const dummyRequest = (file: any, onSuccess: any) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const OtherDocuments: React.FC<Props> = ({
  column,
  id,
  candidate,
  rerender,
  handlecancel,
  uploadvisibles,
  documentids,
  listdocument,
  candidateStateAsProps,
  testSend,
  reRender,
  sample,
  reRender1,
  getAadhaarPan,
  aadhaarflag,
  panflag,
}) => {
  const [formLayout] = useState<LayoutType>("vertical");
  const [form] = Form.useForm();
  const [file, setFile] = useState("");
  const [conformVisible, setconformVisible] = useState(false);
  const [desc, changeDesc] = useState("");
  const history = useHistory();
  const userId: any = localStorage.getItem("userId");
  const [statusC, setStatus] = useState();
  const [statusC1, setStatus1] = useState();
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [message3, setMessage3] = useState("");

  let description = statusC + " " + statusC1 + " uploaded documents";

  const props = {
    name: "file",
    onChange(e: any) {
      setFile(e.file);
      if (
        e.file.type === "image/jpg" ||
        e.file.type === "image/jpeg" ||
        e.file.type === "application/pdf" ||
        e.file.type === "image/png" ||
        e.file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setMessage2("");
        // console.log(e.file.type);
      } else {
        const data1 = form.getFieldValue("documents");
        form.setFieldsValue({ documents: "" });
        setMessage2("Please select word or pdf or image file!!");
      }
      const isLt2M = e.file.size / 1024 / 1024 < 8;
      if (!isLt2M) {
        setMessage3("File size must smaller than 8MB!!");
        return;
      }
    },
  };
  useEffect(() => {
    getName();
  }, []);
  const getName = async () => {
    const Ename: any = await UserService.getNameByCUserId(userId);
    setStatus(Ename.data.firstName);
    setStatus1(Ename.data.lastName);
  };
  useEffect(() => {
    form.setFieldsValue({
      docdescs: desc,
    });
  }, [desc]);

  const setInitial = async (value: string) => {
    const candidateinfo = await CandidateService.getCandidateBasicInfo(id);
    if (value === "Aadhaar") {
      changeDesc(candidateinfo.data.aadhaarCard);
    } else if (value === "Pan Card") {
      changeDesc(candidateinfo.data.panCard);
    } else if (value === "Passport") {
      changeDesc(candidateinfo.data.passport);
    }
  };

  const formItemLayout =
    formLayout === "vertical"
      ? {
          labelCol: { span: 16 },
          wrapperCol: { span: 24 },
        }
      : null;

  function beforeUpload(file: any) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }
  const onFinish = async (value: any) => {
    const formdata = new FormData();
    formdata.append("docfile", file);
    formdata.append("documentName", value.docnames);
    formdata.append("description", value.docdescs);
    const otherdocs = await BasicIdService.createBasicId(formdata, id);
    onReset();
    rerender();
    getAadhaarPan();
    message.success("Document created successfully");
  };

  const updateCandidateDox = async () => {
    const formdata = new FormData();
    formdata.append("docfile", file);
    try {
      if (file == "") {
        // message.error("Please select a file");
        setMessage1("Please select a file!!!");
      } else {
        setMessage1("");
        const updatedata = await BasicIdService.uploadUpdatedDocument(
          formdata,
          documentids
        );
        rerender();
        message.success("Document updated successfully");
        handlecancel();
      }
    } catch (e: any) {
      setMessage1("Please select word or pdf or image file!!");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  const sendRecuriter = async () => {
    const data = {};
    const candidateData = await CandidateService.getCandidateAndRecuriter(
      userId
    );

    const candidateStatus: any =
      await CandidateService.updateCandidateStatusCode(
        "DU",
        userId,
        description,
        candidateData.data[0].recuriterEmail,
        candidateData.data[0].email
      );
    if (candidateStatus.status === 200) {
      let dataRecuriter = {
        sendTo: candidateData.data[0].recuriterEmail,
        temp: "CandidateDocumentUploded",
        data: {
          firstName: candidateData.data[0].recuriterFirstName,
          lastName: candidateData.data[0].recuriterLastName,
          email: candidateData.data[0].recuriterEmail,
          mobile: candidateData.data[0].recuriterMobile,
          CandidateFirstName: candidateData.data[0].firstName,
          candidateLastName: candidateData.data[0].lastName,
          CandidateEmail: candidateData.data[0].email,
          CandidateMobile: candidateData.data[0].mobile,
          link: `http://${host}`,
        },
        subject: "Candidate Document Upload Completed",
      };
      message.info("Sending documents to Recruiter for review");
      const sentToRecuriter = await mailService.sendMail(dataRecuriter);
      if (sentToRecuriter.status === 201) {
        message.success("Documents sent to Recruiter successfully");
      }

      history.push("/");
    }
  };
  const cancel = () => {
    handlecancel();
    setMessage1("");
  };

  return (
    <Layout>
      <Modal
        title="Confirm"
        centered
        visible={conformVisible}
        onOk={() => {
          sendRecuriter();
          setconformVisible(false);
        }}
        onCancel={() => setconformVisible(false)}
      >
        <h4>
          Are you sure have uploaded all documents? Click ok to send to
          Recruiter.
        </h4>
      </Modal>
      <Modal
        destroyOnClose={true}
        visible={uploadvisibles}
        onCancel={cancel}
        width={500}
        footer={null}
        centered
        bodyStyle={{ textAlign: "center" }}
      >
        <h2>Upload Document</h2>
        <p style={{ color: "red" }}>{message1}</p>
        <Space direction="vertical">
          <Upload
            {...props}
            beforeUpload={() => false}
            customRequest={() => dummyRequest}
            maxCount={1}
          >
            <Button
              icon={<UploadOutlined />}
              className="formfiled"
              disabled={candidateStateAsProps}
            >
              Upload documents
            </Button>
          </Upload>

          <Button
            type="primary"
            onClick={async () => {
              await updateCandidateDox();
              reRender1();
            }}
            disabled={candidateStateAsProps}
            style={styles.borderRadius}
          >
            Upload
          </Button>
        </Space>
      </Modal>
      <Card title="" bordered={true} style={{ width: "100%", margin: 10 }}>
        <Title level={2}>Documents</Title>
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
            <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={8}>
              <Form.Item
                className="formfiled"
                label="Document Name"
                name="docnames"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Document Name",
                  },
                ]}
              >
                <Select
                  placeholder="Select Document Name"
                  className="formfiled"
                  onSelect={(value: string) => {
                    setInitial(value);
                  }}
                  style={{ textAlign: "left" }}
                  disabled={candidateStateAsProps}
                >
                  {listdocument.map((val, index: number) => (
                    <Option value={val} key={index}>
                      {val}
                    </Option>
                  ))}
                  <Option value="Other Documents">Other Documents</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={8}>
              <Form.Item
                className="formfiled"
                label="Document Description"
                name="docdescs"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Description",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Document Description"
                  className="formfiled"
                  disabled={candidateStateAsProps}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={8}>
              <Form.Item
                className="formfiled"
                label="Documents"
                name="docups"
                rules={[
                  {
                    required: true,
                    message: "Please upload documents",
                  },
                ]}
              >
                <Upload
                  {...props}
                  beforeUpload={() => false}
                  customRequest={() => dummyRequest}
                  maxCount={1}
                >
                  <Button
                    icon={<UploadOutlined />}
                    className="formfiled"
                    disabled={candidateStateAsProps}
                    style={styles.borderRadius}
                  >
                    Upload documents
                  </Button>
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      alignItems: "center",
                    }}
                  >
                    {message2}
                  </p>
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      alignItems: "center",
                    }}
                  >
                    {message3}
                  </p>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item>
                <Space align="center">
                  <Button
                    htmlType="button"
                    onClick={onReset}
                    type="primary"
                    danger
                    disabled={candidateStateAsProps}
                    style={styles.borderRadius}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={candidateStateAsProps}
                    style={styles.borderRadius}
                  >
                    Submit
                  </Button>
                </Space>
              </Form.Item>

              <Space>
                {testSend && sample ? (
                  <Tooltip
                    placement="bottom"
                    title="Reupload all rejected documents"
                  >
                    <Button disabled={true}>Send To Recruiter</Button>
                  </Tooltip>
                ) : aadhaarflag || panflag ? (
                  <Tooltip
                    placement="bottom"
                    title="Aadhaar and Pan card mandatory"
                  >
                    <Button disabled={true}>Send To Recruiter</Button>
                  </Tooltip>
                ) : (
                  <Button
                    type="primary"
                    onClick={() => {
                      setconformVisible(true);
                    }}
                    disabled={candidateStateAsProps}
                    style={styles.borderRadius}
                  >
                    Send To Recruiter
                  </Button>
                )}
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                columns={column}
                dataSource={candidate}
                pagination={false}
                scroll={{ x: 1000 }}
              />
            </Col>
          </Row>
        </Form>
      </Card>
    </Layout>
  );
};

export default OtherDocuments;

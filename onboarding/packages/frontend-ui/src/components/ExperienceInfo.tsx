import React, { useState } from "react";
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
  DatePicker,
  Upload,
  Table,
  Modal,
} from "antd";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";
import "../styles/Form.css";
import ExperienceService from "../services/ExperienceService";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";
import styles from "../styles/style";
import { useHistory } from "react-router-dom";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const { Title } = Typography;

type LayoutType = Parameters<typeof Form>[0]["layout"];

type Props = {
  rerender: () => void;
  column: any;
  experienceData: [];
  visible: boolean;
  uploadVisible: boolean;
  handleCancel: () => void;
  fileType: string;
  fileUrl: string;
  documentId: number;
  fileData: string;
  candidateStateAsProps: boolean;
  sample: boolean;
  reRender1: () => void;
};

const ExperienceInfo: React.FC<Props> = ({
  rerender,
  column,
  experienceData,
  visible,
  uploadVisible,
  handleCancel,
  fileType,
  fileUrl,
  documentId,
  fileData,
  candidateStateAsProps,
  sample,
  reRender1,
}) => {
  const [formLayout] = useState<LayoutType>("vertical");
  const [form] = Form.useForm();
  const [file, setFile] = useState("");
  const [uploadVisibles, setuploadVisibles] = useState(true);
  const [enddate, setEnddate] = useState(true);
  const [startdate, setStartdate] = useState();
  const [numPages, setNumPages] = useState(null);
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [message3, setMessage3] = useState("");
  const history = useHistory();

  const dateformat = "DD/MM/YYYY";
  const dateformat1 = "YYYY/MM/DD";
  const formItemLayout =
    formLayout === "vertical"
      ? {
          labelCol: { span: 16 },
          wrapperCol: { span: 24 },
        }
      : null;

  const onChange = (date: any, dateString: any) => {
    setEnddate(false);
    setStartdate(dateString);
  };

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
  const disabledDate = (current: any) => {
    return current && current < moment(startdate, dateformat);
  };
  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("docfile", form.getFieldValue("documents").file);
    formData.append("employer", values.companyname);
    formData.append("designation", values.desigs);
    formData.append("startDate", values.startdate.format(dateformat1));
    formData.append("completionDate", values.enddate.format(dateformat1));
    formData.append("ctc", values.ctcs);
    formData.append("location", values.locations);
    formData.append("skills", values.skills);

    const userId = localStorage.getItem("userId");

    const sendData = await ExperienceService.addExperienceDetail(
      formData,
      userId
    );
    console.log(sendData);

    form.resetFields();

    rerender();
    message.success("Experience Detail added successfully");
  };

  const onFinishFailed = (errorInfo: any) => {};
  const onReset = () => {
    form.resetFields();
  };

  const dummyRequest = (file: any, onSuccess: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const cancel = () => {
    handleCancel();
    setMessage1("");
  };

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
        console.log(e.file.type);
      } else {
        const data1 = form.getFieldValue("documents");
        form.setFieldsValue({ documents: "" });
        console.log("not");
        console.log(e.file.type);
        // alert("Please select word or pdf or image file");
        setMessage2("Please select word or pdf or image file!!");
      }
      const isLt2M = e.file.size / 1024 / 1024 < 8;
      if (!isLt2M) {
        setMessage3("File size must smaller than 8MB!!");
        return;
      }
    },
  };

  const updateDocument = async () => {
    const formData = new FormData();
    formData.append("docfile", file);
    try {
      if (file == "") {
        // message.error("Please select a file");
        setMessage1("Please select a file!!!");
      } else {
        setMessage1("");
        const response: any = await ExperienceService.uploadExperienceDocument(
          documentId,
          formData
        );
        if (response.status === 200) {
          handleCancel();
          uploadVisible = false;
          setuploadVisibles(false);
          rerender();
        }
        message.success("Document Updated Successfully");
      }
    } catch (e: any) {
      setMessage1("Please select word or pdf or image file!!");
    }
  };

  const nextTab = async () => {
    await console.log("called");
    await window.localStorage.setItem("TabKey", "4");
    await history.push("/candidate/workspace");
    await history.push("/candidate/manage-documents");
  };

  return (
    <div>
      <Modal
        destroyOnClose={true}
        visible={uploadVisible}
        footer={null}
        onCancel={cancel}
        width={500}
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
              await updateDocument();
              reRender1();
            }}
            disabled={candidateStateAsProps}
          >
            Upload
          </Button>
        </Space>
      </Modal>
      <Layout>
        <Card title="" bordered={true} style={{ width: "100%", margin: 10 }}>
          <Title level={2}>Experience Details</Title>
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
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label="Employer"
                  name="companyname"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter your Company Name",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    placeholder="Enter Company Name"
                    className="formfiled"
                    style={{ width: "80%", textAlign: "left" }}
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label="Start Date"
                  name="startdate"
                  rules={[
                    {
                      required: true,
                      message: "Enter the starting date of employment",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <DatePicker
                    onChange={onChange}
                    className="formfiled"
                    format={dateformat}
                    style={{ width: "80%", textAlign: "left" }}
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label="End Date"
                  name="enddate"
                  rules={[
                    {
                      required: true,
                      message: "Enter the ending date of employment",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <DatePicker
                    className="formfiled"
                    format={dateformat}
                    style={{ width: "80%", textAlign: "left" }}
                    disabled={enddate}
                    disabledDate={disabledDate}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label="Designation"
                  name="desigs"
                  rules={[
                    {
                      required: true,
                      message: "Enter Designation",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    placeholder="Enter Previous Designation"
                    className="formfiled"
                    style={{ width: "80%", textAlign: "left" }}
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label="CTC"
                  name="ctcs"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter CTC",
                    },
                    {
                      pattern: /^[0-9]*$/,
                      message: "Please enter ctc in number",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    placeholder="Enter CTC"
                    className="formfiled"
                    style={{ width: "80%", textAlign: "left" }}
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label="Location"
                  name="locations"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Location",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    placeholder="Enter Job Location"
                    className="formfiled"
                    style={{ width: "80%", textAlign: "left" }}
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label="Skills"
                  name="skills"
                  rules={[
                    {
                      required: true,
                      message: "Enter your Skills",
                    },
                  ]}
                  style={{ textAlign: "left" }}
                >
                  <Input
                    placeholder="Enter Skills"
                    className="formfiled"
                    style={{ width: "80%", textAlign: "left" }}
                    disabled={candidateStateAsProps}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  className="formfiled"
                  label="Documents"
                  name="documents"
                  rules={[
                    {
                      required: true,
                      message: "Please upload documents",
                    },
                  ]}
                  style={{ textAlign: "left" }}
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
                      style={{ width: "138%", borderRadius: ".25rem" }}
                      disabled={candidateStateAsProps}
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
              </Col>
            </Row>
            <Row justify="center">
              <Col>
                <Space align="center">
                  <Button
                    type="primary"
                    onClick={() => {
                      nextTab();
                    }}
                    style={styles.borderRadius}
                  >
                    Done
                  </Button>
                </Space>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Table
                  dataSource={experienceData}
                  columns={column}
                  pagination={false}
                  scroll={{ x: 1000 }}
                />
              </Col>
            </Row>
          </Form>
        </Card>
      </Layout>
    </div>
  );
};

export default ExperienceInfo;

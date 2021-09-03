import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
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
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import BasicIdService from "../services/BasicIdService";
import CandidateService from "../services/CandidateService";
import "../styles/Form.css";
import styles from "../styles/style";
const { Title } = Typography;
const { Option } = Select;
type LayoutType = Parameters<typeof Form>[0]["layout"];

type Props = {
  column: {}[];
  id: string;
  candidate: {}[];
  rerender: () => void;
  listdocument: [];
  documentids: number;
  uploadvisibles: boolean;
  handlecancel: () => void;
  candidateStateAsProps: boolean;
};

const BasicId: React.FC<Props> = ({
  column,
  id,
  candidate,
  rerender,
  listdocument,
  documentids,
  uploadvisibles,
  handlecancel,
  candidateStateAsProps,
}) => {
  const [formLayout] = useState<LayoutType>("vertical");
  const [form] = Form.useForm();
  const [desc, changeDesc] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    form.setFieldsValue({
      docdescs: desc,
    });
  }, [desc]);

  const formItemLayout =
    formLayout === "vertical"
      ? {
          labelCol: { span: 16 },
          wrapperCol: { span: 24 },
        }
      : null;

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

  const onFinish = async (value: any) => {
    const formdata = new FormData();
    formdata.append("docfile", file);

    formdata.append("documentName", value.docnames);
    formdata.append("description", value.docdescs);
    const basicid = await BasicIdService.createBasicId(formdata, id);
console.log(basicid)
    onReset();
    rerender();
    message.success("New Document Created");
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

  const updateCandidateDox = async () => {
    const formdata = new FormData();
    formdata.append("docfile", file);
    const updatedata = await BasicIdService.uploadUpdatedDocument(
      formdata,
      documentids
    );
    rerender();
    message.success("Document Updated Successfully");
    handlecancel();
  };

  const props = {
    name: "file",
    onChange(e: any) {
      setFile(e.file);
      const isLt2M = e.file.size / 1024 / 1024 < 8;
      if (!isLt2M) {
        alert("File must smaller than 8MB!");
        return;
      }
    },
  };

  return (
    <Layout>
      <Modal
        visible={uploadvisibles}
        onCancel={handlecancel}
        width={500}
        footer={null}
        centered
        bodyStyle={{ textAlign: "center" }}
      >
        <h2>Upload Document</h2>
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
            onClick={() => updateCandidateDox()}
            disabled={candidateStateAsProps}
          >
            Upload
          </Button>
        </Space>
      </Modal>
      <Card title="" bordered={true} style={{ width: "100%", margin: 10 }}>
        <Title level={2}>Basic ID Documents</Title>
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
            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
              <Form.Item
                className="formfiled"
                label="Document Name"
                name="docnames"
                rules={[
                  {
                    required: true,
                    message: "Enter Document Name",
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
                  {listdocument.map((val) => (
                    <Option value={val}>{val}</Option>
                  ))}
                  {/* <Option value="Aadhaar">Aadhaar</Option>
                  <Option value="Pan Card">Pan Card</Option>
                  <Option value="Passport">Passport</Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
              <Form.Item
                className="formfiled"
                label="Document Description"
                name="docdescs"
                rules={[
                  {
                    required: true,
                    message: "Enter a Description",
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
            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
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
                >
                  <Button
                    icon={<UploadOutlined />}
                    className="formfiled"
                    disabled={candidateStateAsProps}
                  >
                    Upload documents
                  </Button>
                </Upload>
                {/* <input
                  type="file"
                  onChange={(e) => handleChange(e)}
                /> */}
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

export default BasicId;

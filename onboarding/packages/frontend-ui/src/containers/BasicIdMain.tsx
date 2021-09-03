import React from "react";
import { Layout, Card, Space, Modal } from "antd";
import BasicId from "../components/BasicId";
import BasicIdService from "../services/BasicIdService";
import {
  UploadOutlined,
  DeleteOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type Props = {
  candidateStateAsProps: boolean;
};

type State = {
  userId: string;
  candidatedox: {}[];
  documentlist: any;
  visible: boolean;
  filedata: string;
  filetype: string;
  uploadvisible: boolean;
  documentid: number;
  numPages: any;
};

class BasicIdMain extends React.Component<Props> {
  state: State = {
    userId: "",
    candidatedox: [],
    documentlist: ["Aadhaar", "Pan Card", "Passport"],
    visible: false,
    filedata: "",
    filetype: "",
    uploadvisible: false,
    documentid: 1000,
    numPages: null,
  };

  usersid = localStorage.getItem("userId");
  componentDidMount() {
    this.setState({
      userId: this.usersid,
    });
    this.getCandidateDox();
  }

  async getCandidateDox() {
    this.setState({
      candidatedox: [],
    });
    this.setState({
      documentlist: ["Aadhaar", "Pan Card", "Passport"],
    });
    const docdata = await BasicIdService.getBasicIdByUserId(this.usersid);

    docdata.data.forEach((value: any, key: any) => {
      if (value.isActive) {
        this.setState({
          candidatedox: [
            ...this.state.candidatedox,
            {
              id: value.id,
              docname: value.documentName,
              docdesc: value.description,
              filename: value.fileName,
              filedesc: value.fileDescription,
              docid: value.documentId,
            },
          ],
        });
        this.setState({
          documentlist: this.state.documentlist.filter(
            (item: any) => item !== value.documentName
          ),
        });
      }
    });
  }

  async deleteCandidateDox(value: any) {
    const isfalse = false;
    await BasicIdService.deactivateBasicId(isfalse, value);
    this.getCandidateDox();
  }

  onError() {}

  async getFileToView(value: any, value1: any) {
    await this.setState({
      visible: true,
    });
    this.setState({
      filetype: value1,
    });
    const getdata = await BasicIdService.getDocumentByUserId(
      this.usersid,
      value
    );
    this.setState({
      filedata: getdata.config.url,
    });
  }

  async updateCandidateDox(value: any) {
    this.setState({
      documentid: value,
      uploadvisible: true,
    });
  }

  handleCancel() {
    this.setState({
      visible: false,
    });
    this.setState({
      uploadvisible: false,
    });
  }

  columns = [
    
    {
      title: "Document Name",
      dataIndex: "docname",
      key: "docname",
    },
    {
      title: "Document Desciption",
      dataIndex: "docdesc",
      key: "docdesc",
    },
    {
      title: "Preview",
      key: "preview",
      render: (record: any) => (
        <>
          <Space>
            {/* <EyeOutlined style={{ color: "green" }} onClick={()=> this.getFileToView(record.filename, record.filedesc)}/> */}
            {record.filedesc === "image/png" ? (
              <FileImageOutlined
                style={{ color: "green", fontSize: "25px" }}
                onClick={() =>
                  this.getFileToView(record.filename, record.filedesc)
                }
              />
            ) : record.filedesc === "image/jpeg" ? (
              <FileImageOutlined
                style={{ color: "green", fontSize: "25px" }}
                onClick={() =>
                  this.getFileToView(record.filename, record.filedesc)
                }
              />
            ) : record.filedesc === "application/pdf" ? (
              <FilePdfOutlined
                style={{ color: "green", fontSize: "25px" }}
                onClick={() =>
                  this.getFileToView(record.filename, record.filedesc)
                }
              />
            ) : (
              <FileWordOutlined
                style={{ color: "green", fontSize: "25px" }}
                onClick={() =>
                  this.getFileToView(record.filename, record.filedesc)
                }
              />
            )}
          </Space>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <>
          <Space align="center" size="large">
            <UploadOutlined
              style={{ color: "indigo", fontSize: "20px" }}
              onClick={() => this.updateCandidateDox(record.docid)}
            />
            {/* <EyeOutlined style={{ color: "green" }} onClick={()=> this.getFileToView(record.id)}/> */}
            <DeleteOutlined
              style={{ color: "red", fontSize: "20px" }}
              onClick={() => this.deleteCandidateDox(record.id)}
            />
          </Space>
        </>
      ),
    },
  ];

  render() {
    return (
      <Layout>
        <Modal
          visible={this.state.visible}
          width={1000}
          onCancel={() => this.handleCancel()}
          footer={null}
          closeIcon={
            <CloseCircleFilled style={{ color: "black", fontSize: "30px" }} />
          }
        >
          {this.state.filetype === "application/pdf" ? (
            <Document
              file={this.state.filedata}
              onLoadSuccess={({ numPages }) => {
                this.setState({ numPages: numPages });
              }}
            >
              {Array.from(new Array(this.state.numPages), (el, index) => (
                <Card bodyStyle={{ borderBottomStyle: "solid" }}>
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                </Card>
              ))}
            </Document>
          ) : (
            <img
              alt={this.state.filedata}
              src={this.state.filedata}
              style={{ width: "100%" }}
            />
          )}
        </Modal>

        <BasicId
          column={this.columns}
          id={this.state.userId}
          candidate={this.state.candidatedox}
          rerender={() => this.getCandidateDox()}
          listdocument={this.state.documentlist}
          uploadvisibles={this.state.uploadvisible}
          handlecancel={() => this.handleCancel()}
          documentids={this.state.documentid}
          candidateStateAsProps={this.props.candidateStateAsProps}
        />
      </Layout>
    );
  }
}

export default BasicIdMain;

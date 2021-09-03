import React from "react";
import { Layout, Card, Space, Modal } from "antd";
import OtherDocuments from "../components/OtherDocuments";
import BasicIdService from "../services/BasicIdService";
import {
  UploadOutlined,
  DeleteOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import FileSaver from "file-saver";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type Props = {
  candidateStateAsProps: boolean;
  testSend: boolean;
  reRender: () => void;
  sample: boolean;
  reRender1: () => void;
  getAadhaarPan: () => void;
  aadhaarflag: boolean;
  panflag: boolean;
};

type State = {
  userId: string;
  candidatedox: {}[];
  visible: boolean;
  filetype: string;
  filedata: string;
  uploadvisible: boolean;
  documentid: number;
  numPages: any;
  documentlist: any;
};

class OtherDocumentsMain extends React.Component<Props> {
  state: State = {
    userId: "",
    candidatedox: [],
    visible: false,
    filetype: "",
    filedata: "",
    uploadvisible: false,
    documentid: 1000,
    numPages: null,
    documentlist: ["Aadhaar", "Pan Card", "Passport"],
  };

  usersid = localStorage.getItem("userId");
  componentDidMount() {
    this.setState({
      userId: this.usersid,
    });
    this.getCandidateDox();
  }

  async getCandidateDox() {
    this.setState({ candidatedox: [] });
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
              docStatus: value.docStatus,
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

  async openModal(value: any) {
    this.setState({
      documentid: value,
      uploadvisible: true,
    });
  }

  async getFileToView(value: any, value1: any) {
    // this.setState({
    //   filetype: value1,
    // });
    const getdata = await BasicIdService.getDocumentByUserId(
      this.usersid,
      value
    );

    FileSaver.saveAs(`${getdata.config.url}`);
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
          <Space align="center" size="large">
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
                style={{ color: "red", fontSize: "25px" }}
                onClick={() =>
                  this.getFileToView(record.filename, record.filedesc)
                }
              />
            ) : (
              <FileWordOutlined
                style={{ color: "blue", fontSize: "25px" }}
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
      render: (record: any) =>
        record.docStatus === "RR" || record.docStatus === "HRR" ? (
          <>
            <Space align="center" size="large">
              <UploadOutlined
                style={{ color: "indigo", fontSize: "20px" }}
                onClick={() => this.openModal(record.docid)}
              />
              <DeleteOutlined
                style={{ color: "red", fontSize: "20px" }}
                onClick={() => this.deleteCandidateDox(record.id)}
              />
              <h4 style={{ color: "red", marginTop: "13px" }}>Reupload</h4>
            </Space>
          </>
        ) : (
          <>
            {this.props.candidateStateAsProps === false ? (
              <Space align="center" size="large">
                <UploadOutlined
                  style={{ color: "indigo", fontSize: "20px" }}
                  onClick={() => this.openModal(record.docid)}
                />
                <DeleteOutlined
                  style={{ color: "red", fontSize: "20px" }}
                  onClick={() => this.deleteCandidateDox(record.id)}
                />
              </Space>
            ) : (
              <Space align="center" size="large">
                <UploadOutlined
                  style={{
                    color: "gray",
                    fontSize: "20px",
                    cursor: "not-allowed",
                  }}
                  disabled
                />

                <DeleteOutlined
                  style={{
                    color: "gray",
                    fontSize: "20px",
                    cursor: "not-allowed",
                  }}
                  disabled
                />
              </Space>
            )}
          </>
        ),
    },
  ];
  render() {
    return (
      <Layout>
        <OtherDocuments
          column={this.columns}
          id={this.state.userId}
          candidate={this.state.candidatedox}
          rerender={() => this.getCandidateDox()}
          handlecancel={() => this.handleCancel()}
          uploadvisibles={this.state.uploadvisible}
          documentids={this.state.documentid}
          listdocument={this.state.documentlist}
          candidateStateAsProps={this.props.candidateStateAsProps}
          testSend={this.props.testSend}
          reRender={this.props.reRender}
          sample={this.props.sample}
          reRender1={this.props.reRender1}
          getAadhaarPan={this.props.getAadhaarPan}
          aadhaarflag={this.props.aadhaarflag}
          panflag={this.props.panflag}
        />
      </Layout>
    );
  }
}

export default OtherDocumentsMain;

import React from "react";
import EducationInfo from "../components/EducationInfo";
import { Layout, Space } from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FileWordOutlined,
} from "@ant-design/icons";
import FileSaver from "file-saver";
import EducationService from "../services/EducationService";
import Course from "../utils/CandidateFormData";
import DocumentService from "../services/DocumentService";
import getUserData from "./../utils/UserData";

type Props = {
  candidateStateAsProps: boolean;
  sample: boolean;
  reRender1: () => void;
};

type State = {
  educationdata: [];
  sNo: number;
  isrender: boolean;
  visible: boolean;
  uploadVisible: boolean;
  fileType: string;
  fileUrl: string;
  documentId: number;
  fileData: string;
};
class EducationInfoMain extends React.Component<Props> {
  state: State = {
    educationdata: [],
    sNo: 0,
    isrender: false,
    visible: false,
    uploadVisible: false,
    fileType: "",
    fileUrl: "",
    documentId: 0,
    fileData: "",
  };

  data: any[] = [];
  courseList = Course;

  async componentDidMount() {
    await this.getEducationData();
  }

  getEducationData = async () => {
    this.courseList = Course;
    const responses = await EducationService.getEducationDetail(
      getUserData().userId
    );
    const data = await responses.data;
    console.log("Education table data", data);
    await this.data.push(data);
    data.forEach((res: any) => {
      this.courseList = this.courseList.filter((item) => item !== res.degree);
    });
    this.setState({ educationdata: data });
  };

  columns = [
    {
      title: "Class",
      dataIndex: "degree",
      key: "id",
    },
    {
      title: "Institue",
      dataIndex: "institute",
      key: "id",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "id",

      render: (startDate: any) =>
        new Date(startDate).getFullYear() +
        "/" +
        new Date(startDate).getMonth() +
        "/" +
        new Date(startDate).getDate(),
    },
    {
      title: "End Date",
      dataIndex: "completionDate",
      key: "id",
      render: (completionDate: any) =>
        new Date(completionDate).getFullYear() +
        "/" +
        new Date(completionDate).getMonth() +
        "/" +
        new Date(completionDate).getDate(),
    },
    {
      title: "Specialization",
      dataIndex: "subjects",
      key: "id",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "id",
    },
    {
      title: "Preview",
      key: "id",
      render: (record: any) => (
        <>
          <Space align="center" size="large">
            {record.description === "image/jpeg" ? (
              <FileImageOutlined
                style={{ color: "green", fontSize: "25px" }}
                onClick={() =>
                  this.preview(record.description, record.fileName)
                }
              />
            ) : record.description === "image/png" ? (
              <FileImageOutlined
                style={{ color: "green", fontSize: "25px" }}
                onClick={() =>
                  this.preview(record.description, record.fileName)
                }
              />
            ) : record.description === "application/pdf" ? (
              <FilePdfOutlined
                style={{ color: "red", fontSize: "25px" }}
                onClick={() =>
                  this.preview(record.description, record.fileName)
                }
              />
            ) : (
              <FileWordOutlined
                style={{ color: "blue", fontSize: "25px" }}
                onClick={() =>
                  this.preview(record.description, record.fileName)
                }
              />
            )}
          </Space>
        </>
      ),
    },
    {
      title: "Action",
      key: "id",
      render: (record: any) =>
        record.docStatus === "RR" || record.docStatus === "HRR" ? (
          <>
            <Space align="center" size="large">
              <UploadOutlined
                style={{ color: "indigo", fontSize: "20px" }}
                onClick={() => this.updateFile(record.documentId)}
              />

              <DeleteOutlined
                style={{ color: "red", fontSize: "20px" }}
                onClick={() => this.deleteList(record.id)}
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
                  onClick={() => this.updateFile(record.documentId)}
                />

                <DeleteOutlined
                  style={{ color: "red", fontSize: "20px" }}
                  onClick={() => this.deleteList(record.id)}
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

  deleteList = async (id: number) => {
    await EducationService.deleteEducationDetail(id);
    this.getEducationData();
  };

  handleCancel = () => {
    this.setState({ visible: false });
    this.setState({ uploadVisible: false });
  };

  preview = async (fileType: string, fileName: string) => {
    // this.setState({ fileType: fileType, fileUrl: fileName });
    const file = await DocumentService.getDocument(
      fileName,
      getUserData().userId
    );
    FileSaver.saveAs(`${file.config.url}`);
  };

  updateFile = (id: number) => {
    this.setState({ uploadVisible: true });
    this.setState({ documentId: id });
  };

  render() {
    return (
      <Layout>
        <EducationInfo
          // tableDatas={this.tableData}
          column={this.columns}
          educationData={this.state.educationdata}
          courseList={this.courseList}
          visible={this.state.visible}
          uploadVisible={this.state.uploadVisible}
          fileType={this.state.fileType}
          fileUrl={this.state.fileUrl}
          documentId={this.state.documentId}
          rerender={this.getEducationData}
          handleCancel={this.handleCancel}
          fileData={this.state.fileData}
          candidateStateAsProps={this.props.candidateStateAsProps}
          sample={this.props.sample}
          reRender1={this.props.reRender1}
        />
      </Layout>
    );
  }
}

export default EducationInfoMain;

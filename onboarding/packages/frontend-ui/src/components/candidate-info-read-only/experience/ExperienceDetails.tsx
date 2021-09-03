import React, { useState, useEffect } from "react";
import { Table, Space } from "antd";
import {
  CheckCircleTwoTone,
  CloseCircleOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  LikeTwoTone,
  DislikeTwoTone,
} from "@ant-design/icons";
import DocumentService from "../../../services/DocumentService";
import getUserData from "../../../utils/UserData";
import { Modal, Input } from "antd";
import ExperienceService from "../../../services/ExperienceService";
import { downloadFile, setDocStatus } from "./../FunctionsGlobal";

const { TextArea } = Input;


const ExperienceDetails: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [expData, setExpData] = useState([]);
  const [remark, setRemark] = useState("");
  const [docId, setDocId] = useState(0);
  const { role } = getUserData();
  var candUserId = window.location.pathname.split("/")[3];

  useEffect(() => {
    getCandidateExperienceDetails();
  }, []);

  async function getCandidateExperienceDetails() {
    const { data } = await ExperienceService.getExperienceDetail(candUserId);
    setExpData(data);
  }

  async function updateDocStatusAfterApproval(documentId: number) {
    let statusInfo = setDocStatus(role, "approved", "");
    await DocumentService.updateDocStatus(documentId, statusInfo);
    getCandidateExperienceDetails();
  }

  async function updateDocStatusAfterRejection() {
    let statusInfo = setDocStatus(role, "rejected", remark);
    await DocumentService.updateDocStatus(docId, statusInfo);
    getCandidateExperienceDetails();
    setIsModalVisible(false);
  }

  function getAcceptAndRejectIcons(tableRow: any) {
    return (
      <Space align="center" size="large">
        <CheckCircleTwoTone
          twoToneColor="#52c41a"
          style={{ fontSize: "20px" }}
          onClick={() => {
            updateDocStatusAfterApproval(tableRow.documentId);
          }}
        />
        <CloseCircleOutlined
          style={{ color: "red", fontSize: "20px" }}
          onClick={async () => {
            await setDocId(tableRow.documentId);
            await setIsModalVisible(true);
          }}
        />
      </Space>
    );
  }

  function getActionIcons(tableRow: any) {
    if (role === "Recruiter") {
      if (tableRow.docStatus === "U") return getAcceptAndRejectIcons(tableRow);
      else if (tableRow.docStatus === "RR")
        return (
          <DislikeTwoTone twoToneColor="#ff0000" style={{ fontSize: "20px" }} />
        );
      else
        return (
          <LikeTwoTone twoToneColor="#52c41a" style={{ fontSize: "20px" }} />
        );
    }
    if (role === "HR") {
      if (tableRow.docStatus === "RA") return getAcceptAndRejectIcons(tableRow);
      else if (tableRow.docStatus === "HRR")
        return (
          <DislikeTwoTone twoToneColor="#ff0000" style={{ fontSize: "20px" }} />
        );
      else
        return (
          <LikeTwoTone twoToneColor="#52c41a" style={{ fontSize: "20px" }} />
        );
    }
  }

  const columns = [
    {
      title: "S/No",
      key: "sno",
      render: (value: any, item: any, index: number) => <>{index + 1}</>,
    },
    {
      title: "Employer",
      dataIndex: "employer",
      key: "id",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "start date",
      render: (startDate: any) =>
        new Date(startDate).getDate() +
        "/" +
        new Date(startDate).getMonth() +
        "/" +
        new Date(startDate).getFullYear(),
    },
    {
      title: "End Date",
      dataIndex: "completionDate",
      key: "end date",
      render: (endDate: any) =>
        new Date(endDate).getDate() +
        "/" +
        new Date(endDate).getMonth() +
        "/" +
        new Date(endDate).getFullYear(),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Preview",
      key: "id",
      render: (tableRow: any) => (
        <>
          <Space align="center" size="large">
            {tableRow.description === "image/jpeg" ? (
              <FileImageOutlined
                style={{ color: "green", fontSize: "25px" }}
                onClick={() => downloadFile(tableRow.fileName, candUserId)}
              />
            ) : tableRow.description === "image/png" ? (
              <FileImageOutlined
                style={{ color: "green", fontSize: "25px" }}
                onClick={() => downloadFile(tableRow.fileName, candUserId)}
              />
            ) : tableRow.description === "application/pdf" ? (
              <FilePdfOutlined
                style={{ color: "red", fontSize: "25px" }}
                onClick={() => downloadFile(tableRow.fileName, candUserId)}
              />
            ) : (
              <FileWordOutlined
                style={{ color: "blue", fontSize: "25px" }}
                onClick={() => downloadFile(tableRow.fileName, candUserId)}
              />
            )}
          </Space>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (tableRow: any) => <>{getActionIcons(tableRow)}</>,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={expData}
        pagination={false}
        scroll={{ x: 1000 }}
      />
      <Modal
        title="Enter Remarks"
        visible={isModalVisible}
        onOk={updateDocStatusAfterRejection}
        onCancel={() => setIsModalVisible(false)}
      >
        <TextArea rows={4} onChange={(e) => setRemark(e.target.value)} />
      </Modal>
    </>
  );
}

export default ExperienceDetails;

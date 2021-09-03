import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table, Space, Button, Tooltip } from "antd";
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
import { Modal, Input, Popconfirm, message } from "antd";
import BasicIdService from "../../../services/BasicIdService";
import { downloadFile, setDocStatus } from "../FunctionsGlobal";
import {
  actionsAfterDocRejection,
  actionsAfterDocApproval,
} from "./Miscellaneous";

const { TextArea } = Input;
type Props = {
  getAllDocs: ()=> void;
  totalCount1: number;
  raCount1: number;
  rrCount1: number;
}

const IdDocDetails: React.FC<Props> = ({getAllDocs,totalCount1, raCount1, rrCount1}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [iddocData, setIddocData] = useState([]);
  const [remark, setRemark] = useState("");
  const [docId, setDocId] = useState(1);
  const [sentMail,setSentMail]=useState(false);
  const history = useHistory();
  const { role, userId } = getUserData();
  var topRole: string = "";
  if (role === "Recruiter") topRole = "HR";
  else if (role === "HR") topRole = "AM";
  var candUserId = window.location.pathname.split("/")[3];

  useEffect(() => {
    getCandidateIdDocDetails();
    getAllDocs();
  },[]);

  async function getCandidateIdDocDetails() {
    const { data } = await BasicIdService.getBasicIdByUserId(candUserId);
    setIddocData(data);
  }

  async function updateDocStatusAfterApproval(documentId: number) {
    let statusInfo = setDocStatus(role, "approved", "");
    const updatedDoc = await DocumentService.updateDocStatus(
      documentId,
      statusInfo
    );
    //console.log(updatedDoc)
    getCandidateIdDocDetails();
    getAllDocs();
  }

  async function updateDocStatusAfterRejection() {
    let statusInfo = setDocStatus(role, "rejected", remark);
    await DocumentService.updateDocStatus(docId, statusInfo);
    getCandidateIdDocDetails();
    setIsModalVisible(false);
    getAllDocs();
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
      else if (tableRow.docStatus === "RR" || tableRow.docStatus === "HRR")
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
      title: "Document Name",
      dataIndex: "documentName",
      key: "name",
    },
    {
      title: "Document Desciption",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Preview",
      key: "preview",
      render: (tableRow: any) => (
        <>
          <Space align="center" size="large">
            {tableRow.fileDescription === "image/jpeg" ? (
              <FileImageOutlined
                style={{ color: "green", fontSize: "25px" }}
                onClick={() => downloadFile(tableRow.fileName, candUserId)}
              />
            ) : tableRow.fileDescription === "image/png" ? (
              <FileImageOutlined
                style={{ color: "green", fontSize: "25px" }}
                onClick={() => downloadFile(tableRow.fileName, candUserId)}
              />
            ) : tableRow.fileDescription === "application/pdf" ? (
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

  function getCorrectButtons() {
    // console.log("again info in getCorrectbutton", totalCount1, rrCount1, raCount1);
    if( raCount1 === totalCount1){
      return (
        <Space align="start">
        <Popconfirm
          placement="top"
          disabled={sentMail}
          title={`Are you sure you want to send ${topRole}`}
          onConfirm={async() => {
            setSentMail(true);
            message.info(`Sent to ${topRole}`);
            await actionsAfterDocApproval(candUserId, userId, role);
            history.push(`/${role.toLowerCase()}/manage-candidates`)
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" disabled={sentMail}>
            Send to {topRole}
          </Button>
        </Popconfirm>
      </Space>
      );
    } else if((rrCount1+raCount1) === totalCount1) {
      return (
        <Space align="start">
        <Popconfirm
          disabled={sentMail}
          placement="top"
          title={"Are you sure you want to send back to candidate?"}
          onConfirm={async() => {
            setSentMail(true);
            message.info("Sent back to candidate");
            await actionsAfterDocRejection(candUserId, userId, role);
            history.push(`/${role.toLowerCase()}/manage-candidates`)
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger disabled={sentMail}>
            Send Back To Candidate
          </Button>
        </Popconfirm>
      </Space>
      );
    } else {
      return (
        <Space align="start">
          <Tooltip placement="bottom" title="Review all documents before sending">
          <Button type="primary" danger disabled={true}>
            Send Back To Candidate
          </Button>
          </Tooltip>
          <Tooltip placement="bottom" title="Review all documents before sending">
          <Button type="primary" disabled={true}>
            Send to {topRole}
          </Button>
          </Tooltip>
      </Space>
      );
    }
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={iddocData}
        pagination={false}
        scroll={{ x: 1000 }}
      />
      {getCorrectButtons()}
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

export default IdDocDetails;

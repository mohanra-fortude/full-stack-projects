import { AuditOutlined } from "@ant-design/icons";
import { Modal, Button, Tooltip } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/LeaderModel.css";
import { constants } from "../constants";
import styles from "../styles/style";

type Props = {
  candidateId: string;
};
export const LeaderMoadal: React.FC<Props> = ({ candidateId }) => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const url = `${constants.BASE_URL}/workflow/workflow-by-userId/${candidateId}`;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [desc, setdescription] = useState([]);

  const datainarray: any[] = [];
  const convertobjtoarray = () => {
    datainarray.push(desc);
  };
  convertobjtoarray();
  useEffect(() => {
    descGetData();
  }, []);

  const descGetData = async () => {
    const response = await axios.get(url);
    setdescription(response.data);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Tooltip placement="bottom" title="Candidate Audit Log">
        <AuditOutlined
          style={{ color: "#3498DB ", fontSize: "25px", marginLeft: ".15rem" }}
          onClick={showModal}
        />
      </Tooltip>
      <Modal
        title="Candidate Audit Log"
        confirmLoading={confirmLoading}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={650}
        footer={[
          <Button
            key="back"
            onClick={handleOk}
            type="primary"
            style={styles.borderRadius}
          >
            OK
          </Button>,
        ]}
      >
        <table id="auditlog">
          <thead>
            <tr>
              <td>
                <b>S/No</b>
              </td>
              <td align="center">
                <b>Description</b>
              </td>
              <td align="center">
                <b>Date</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {desc.map((de: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{de.description}</td>
                <td>{de.createtime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </>
  );
};

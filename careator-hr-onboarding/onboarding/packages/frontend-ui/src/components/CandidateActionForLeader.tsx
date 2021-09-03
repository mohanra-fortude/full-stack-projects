import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { LeaderMoadal } from "./LeaderModal";
import { FileSearchOutlined } from "@ant-design/icons";
import styles from "../styles/RecuriterManageCandidatesStyle";

const CandidateActionForLeader = {
  title: "Action",
  dataIndex: "Action",
  key: "id",
  render: (id: any, record: any) => (
    <>
      {record.statusCode === "ORI" ? (
        <>
          <Tooltip placement="bottom" title="Approve/Reject Offer Request">
            <Link
              to={{
                pathname: "/leader/offer-request-initiated",
                state: { record: record, role: "leader" },
              }}
            >
              <FileSearchOutlined style={styles.fileSearchOutlined} />
            </Link>
          </Tooltip>
          <Tooltip placement="bottom" title="Send Offer Letter">
            <LeaderMoadal candidateId={record.userId} />
          </Tooltip>
        </>
      ) : record.statusCode === "CRO" ? (
        <Tooltip placement="bottom" title="Action for rejected offer">
          <LeaderMoadal candidateId={record.userId} />
          {/* <DislikeOutlined style={styles.DislikeOutlined} /> */}
        </Tooltip>
      ) : record.statusCode === "ORA" ? (
        <Tooltip placement="bottom" title="Action for approved offer">
          <LeaderMoadal candidateId={record.userId} />
          {/* <CheckOutlined style={styles.CheckOutlined} /> */}
        </Tooltip>
      ) : record.statusCode === "CAO" ? (
        <Tooltip placement="bottom" title="Action for approved offer">
          <LeaderMoadal candidateId={record.userId} />
          {/* <LikeOutlined style={styles.CheckOutlined} /> */}
        </Tooltip>
      ) : record.statusCode === "OR" ? (
        <Tooltip placement="bottom" title="Action for approved offer">
          <LeaderMoadal candidateId={record.userId} />
          {/* <FileProtectOutlined style={styles.CheckOutlined} /> */}
        </Tooltip>
      ) : record.statusCode === "HRD" ? (
        <Tooltip placement="bottom" title="Action for approved offer">
          <LeaderMoadal candidateId={record.userId} />
          {/* <FileDoneOutlined style={styles.CheckOutlined} /> */}
        </Tooltip>
      ) : record.statusCode === "ORR" ? (
        <Tooltip placement="bottom" title="Action for rejected offer">
          <LeaderMoadal candidateId={record.userId} />
          {/* <DislikeOutlined style={styles.DislikeOutlined} /> */}
        </Tooltip>
      ) : record.statusCode === "CC" ? (
        <Tooltip placement="bottom" title="Action for candidate created">
          <LeaderMoadal candidateId={record.userId} />
          {/* <DislikeOutlined style={styles.DislikeOutlined} /> */}
        </Tooltip>
      ) : record.statusCode === "RRD" ? (
        <Tooltip placement="bottom" title="Action for rejected offer">
          <LeaderMoadal candidateId={record.userId} />
          {/* <FileSyncOutlined style={styles.fileSearchOutlined} /> */}
        </Tooltip>
      ) : record.statusCode === "DU" ? (
        <Tooltip placement="bottom" title="Action for rejected offer">
          <LeaderMoadal candidateId={record.userId} />
          {/* <CloudUploadOutlined style={styles.fileSearchOutlined} /> */}
        </Tooltip>
      ) : null}
    </>
  ),
};

export default CandidateActionForLeader;

import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import {
  FileSearchOutlined,
  FrownOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import styles from "../styles/RecuriterManageCandidatesStyle";

const CandidateActionForHr = {
  title: "Action",
  dataIndex: "Action",
  key: "id",
  render: (id: any, record: any) => (
    <>
      {record.statusCode === "RRD" ? (
        <Tooltip placement="bottom" title="Review Documents ">
          <Link to={`/hr/candidate-details/${record.userId}`}>
            <FileSearchOutlined style={styles.fileSearchOutlined} />
          </Link>
        </Tooltip>
      ) : record.statusCode === "ORA" ? (
        <Tooltip placement="bottom" title="Release offer">
          <Link to={`/offer/${record.userId}`}>
            <SmileOutlined style={styles.CheckOutlined} />
          </Link>
        </Tooltip>
      ) : record.statusCode === "RRD" ? (
        <></>
      ) : null}
    </>
  ),
};

export default CandidateActionForHr;

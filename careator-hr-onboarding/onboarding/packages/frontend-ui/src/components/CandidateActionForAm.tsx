import { Link } from "react-router-dom";
import { Tooltip, Space } from "antd";
import {
  FileSearchOutlined,
  FrownOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import styles from "../styles/RecuriterManageCandidatesStyle";

const CandidateActionForAm = {
  title: "Action",
  dataIndex: "Action",
  key: "action",
  render: (id: any, record: any) =>
    record.statusCode === "CRO" ? (
      <Tooltip placement="bottom" title="Renegotiate offer">
        <Link
          to={{
            pathname: "/am/renegotiate",
            state: { record: record },
          }}
        >
          <FrownOutlined style={styles.DislikeOutlined} />
        </Link>
      </Tooltip>
    ) : record.statusCode === "CAO" ? (
      <Tooltip placement="bottom" title="Renegotiate offer">
        <Link
          to={{
            pathname: "/am/renegotiate",
            state: { record: record },
          }}
        >
          <SmileOutlined style={styles.CheckOutlined} />
        </Link>
      </Tooltip>
    ) : record.statusCode === "HRD" ? (
      <>
        <Space align="center" size="large">
          <Tooltip placement="bottom" title="Initiate Offer Request">
            <Link
              to={{
                pathname: "/account-manager/offer-request-initiated",
                state: { record: record },
              }}
            >
              <FileSearchOutlined style={styles.fileSearchOutlined} />
            </Link>
          </Tooltip>
        </Space>
      </>
    ) : null,
};

export default CandidateActionForAm;

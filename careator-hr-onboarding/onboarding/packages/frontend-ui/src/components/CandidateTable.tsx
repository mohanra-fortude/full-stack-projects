import { Space, Switch, Table, Tag, Tooltip } from "antd";
import React from "react";
import { EditOutlined, FileSearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CandidateServices from "../services/CandidateService";
import styles from "../styles/RecuriterManageCandidatesStyle";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import GetActions from "../store/actions/GetAction";

type Props = {
  candidateData: any;
  statusList: string[];
  render: any;
};

const CandidateTable: React.FC<Props> = ({
  candidateData,
  statusList,
  render,
}) => {
  const list: any = statusList;

  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();
  //const getapi = bindActionCreators(GetActions.doGet, dispatch);
  const getapi = bindActionCreators(GetActions.doGet, dispatch);
  const getapi1 = bindActionCreators(GetActions.dontGet, dispatch);

  const onChangeSwitch = (checked: any, record: any) => {
    CandidateServices.deleteCandidate(checked, record);
    getapi();
    setTimeout(() => {
      getapi1();
    }, 500);
  };

  const columns = [
    {
      title: "S/No",
      dataIndex: "dataIndex",
      key: "id",
      render: (value: any, item: any, index: number) =>
        (page - 1) * 10 + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "id",
    },
    {
      title: "Mobile No",
      dataIndex: "mobile",
      key: "id",
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "id",
      sorter: (a: any, b: any) => a.clientName.localeCompare(b.clientName),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "id",

      filters: list,
      onFilter: (value: any, record: any) => record.status.indexOf(value) === 0,

      render: (status: any) => (
        <>
          {status === "Documents Uploaded" ? (
            <Tag color={"geekblue"} key={status}>
              {status}
            </Tag>
          ) : status === "Offer Request Rejected" ? (
            <Tag color={"red"} key={status}>
              {status}
            </Tag>
          ) : status === "Candidate Rejected Offer" ? (
            <Tag color={"red"} key={status}>
              {status}
            </Tag>
          ) : (
            <Tag color={"green"} key={status}>
              {status}
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "id",
      render: (id: any, record: any) => (
        <>
          <Space align="center" size="large">
            <Switch
              checkedChildren="Active"
              unCheckedChildren="InActive"
              onChange={(checked) => onChangeSwitch(checked, record.userId)}
              checked={record.isActive === 1 ? true : false}
            />

            {record.status == "Candidate Created" ? (
              <Link to={`/Recruiter/updatecandidatemain/${record.userId}`}>
                <EditOutlined style={styles.editoutlined} />
              </Link>
            ) : null}
          </Space>
        </>
      ),
    },
    {
      title: "",
      key: "file-view",
      render: (tableRow: any) => (
        <>
          <Space align="center" size="large">
            {tableRow.statusCode === "CC" ? (
              <></>
            ) : tableRow.statusCode === "DU" ? (
              <Tooltip placement="bottom" title="Review Documents ">
                <Link to={`/recruiter/candidate-details/${tableRow.userId}`}>
                  <FileSearchOutlined
                    style={{
                      fontSize: "25px",
                      color: "green",
                      cursor: "pointer",
                    }}
                  />
                </Link>
              </Tooltip>
            ) : null}
          </Space>
        </>
      ),
    },
  ];
  return (
    <>
      <Table
        dataSource={candidateData}
        columns={columns}
        pagination={{
          onChange(current) {
            setPage(current);
          },
        }}
        scroll={{ x: 1000 }}
        rowKey="id"
      />
    </>
  );
};
export default CandidateTable;

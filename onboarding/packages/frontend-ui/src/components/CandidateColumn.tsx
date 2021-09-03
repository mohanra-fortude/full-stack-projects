import { Table, Tag } from "antd";
import React from "react";
import {
  CheckOutlined,
  DislikeOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import CandidateServices from "../services/CandidateService";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import GetActions from "../store/actions/GetAction";

type Props = {
  candidateData: any;
  statusList: string[];
  render: any;
  disablemodel: () => void;
};

const CandidateColumn: React.FC<Props> = ({
  candidateData,
  statusList,
  render,
  disablemodel,
}) => {
  const list: any = statusList;

  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();
  //const getapi = bindActionCreators(GetActions.doGet, dispatch);
  const getapi = bindActionCreators(GetActions.doGet, dispatch);
  const getapi1 = bindActionCreators(GetActions.dontGet, dispatch);
  // const Offer = <Offerletter />;
  const onChangeSwitch = (checked: any, record: any) => {
    CandidateServices.deleteCandidate(checked, record);
    getapi();
    setTimeout(() => {
      getapi1();
    }, 500);
  };
console.log(onChangeSwitch)
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
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "id",

      filters: list,
      onFilter: (value: any, record: any) => record.status.indexOf(value) === 0,

      render: (status: any) => (
        <>
          {status.length > 7 ? (
            <Tag color={"green"} key={status}>
              {status}
            </Tag>
          ) : (
            <Tag color={"geekblue"} key={status}>
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
          {record.status == "Recruiter Review Done" ? (
            <FileSearchOutlined style={{ color: "green" }} />
          ) : record.status == "Candidate Rejected Offer" ? (
            <DislikeOutlined style={{ color: "red" }} />
          ) : record.status == "Offer Request Approved" ? (
            <CheckOutlined
              onClick={() => disablemodel()}
              style={{ color: "green" }}
            />
          ) : null}
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
      />
    </>
  );
};
export default CandidateColumn;
